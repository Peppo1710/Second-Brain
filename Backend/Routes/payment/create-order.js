// routes/payments.routes.js
const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const authMiddleware = require("../../middleware/userMiddleware");
const {User,VerificationToken} = require('../../models/userDbSchema')
const Payment = require('../../models/paymentSchema')
const crypto = require("crypto");
const { log } = require("console");
const rawParser = express.raw

dotenv.config();

const router = express.Router();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay env vars: RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// simple plan catalog (amount must be in paise)
const PLANS = {
  pro: { amountInPaise: 49900, label: "Pro Plan" }, // ₹499
};

// POST /api/payments/create-order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { plan = "pro" } = req.body || {};
    const userId = req.user?.id; // comes from verified JWT

    if (!PLANS[plan]) return res.status(400).json({ error: "Invalid plan" });
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });
    const user = await User.findById(userId)

    if (user.plan === "pro") {
  return res.status(409).json({ error: "Already Pro. No new payment required." });
}

    const options = {
      amount: PLANS[plan].amountInPaise, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { userId, plan },
    };
    

    const order = await razorpay.orders.create(options);

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // safe to expose to client
      label: PLANS[plan].label,
    });
  } catch (e) {
    console.error("create-order error:", e);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { orderId, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!orderId || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ---- Step 1: Verify signature (HMAC SHA256 of orderId|paymentId with KEY_SECRET)
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${orderId}|${razorpay_payment_id}`);
    const expected = hmac.digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: "Signature mismatch" });
    }

    // ---- Step 2 (recommended): Fetch payment from Razorpay and validate details
    //     This blocks “₹1 for Pro” or weird states.
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Validate status, amount, currency — adjust if you support multiple plans/currencies
    if (payment.status !== "captured") {
      return res.status(400).json({ error: `Payment not captured (status: ${payment.status})` });
    }
    if (payment.amount !== PLANS.pro.amountInPaise || payment.currency !== "INR") {
      return res.status(400).json({ error: "Amount or currency mismatch" });
    }

    // ---- Step 3: Idempotent write to Payments (upsert by paymentId)
    const upsertResult = await Payment.updateOne(
      { paymentId: razorpay_payment_id },            // idempotency key
      {
        $setOnInsert: {
          paymentId: razorpay_payment_id,
          orderId,
          userId,
          amount: payment.amount,
          currency: payment.currency,
        },
        $set: {
          status: payment.status,                    // captured / refunded / …
          method: payment.method,                    // upi / card / netbanking
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    // First time we saw this payment?
    const firstTime = !!upsertResult.upsertedId; // or upsertedCount === 1 depending on Mongoose version

    // ---- Step 4: Grant Pro only once (idempotent)
    if (firstTime) {
      await User.updateOne(
        { _id: userId, plan: { $ne: "pro" } },       // guard against races
        { $set: { plan: "pro", proSince: new Date() } }
      );
      // Optional: send welcome email once, etc.
    }

    return res.json({ ok: true, firstTime, message: firstTime ? "Pro activated" : "Already processed" });
  } catch (e) {
    console.error("verify error:", {
      message: e?.message,
      statusCode: e?.statusCode,
      error: e?.error,
    });
    const msg = e?.error?.description || e?.message || "Verification failed";
    return res.status(500).json({ error: msg });
  }
});

router.post(
  "/webhook",
  rawParser({ type: "application/json" }),
  async (req, res) => {
    try {
      const webhookSecret = process.env.WEBHOOK_SECRET;
      const rzpSignature = req.headers["x-razorpay-signature"];

      if (!webhookSecret) {
        console.error("WEBHOOK_SECRET missing in env");
        // 5xx tells Razorpay to retry; keep this rare
        return res.status(500).send("config error");
      }

      // 1) Verify signature on RAW body
      const expected = crypto.createHmac("sha256", webhookSecret)
        .update(req.body) // raw Buffer, not parsed JSON
        .digest("hex");

      if (expected !== rzpSignature) {
        console.warn("Webhook signature mismatch");
        return res.status(400).send("bad signature");
      }

      // 2) Parse event only after signature passes
      const event = JSON.parse(req.body.toString("utf8"));
      const type = event?.event;

      // Handle events of interest
      if (type === "payment.captured") {
        const p = event.payload.payment.entity; // Razorpay payment object
        // Fields we care about
        const paymentId = p.id;
        const orderId = p.order_id;
        const amount = p.amount;       // paise
        const currency = p.currency;   // "INR"
        const status = p.status;       // "captured"
        const method = p.method;       // upi/card/netbanking/...
        const userId = p.notes?.userId; // we set this in order notes
        const plan = p.notes?.plan || "pro";

        // (Optional) sanity validations
        if (!userId) {
          console.error("payment.captured without notes.userId");
          // Still store payment, but cannot upgrade user safely
        }
        if (PLANS[plan]) {
          if (amount !== PLANS[plan].amountInPaise || currency !== "INR") {
            console.warn("Amount/currency mismatch on webhook", {
              paymentId, amount, currency, plan,
            });
            // Decide your policy: store but do not upgrade, or flag for review
          }
        }

        // 3) Idempotent upsert by paymentId (prevents duplicates/retries)
        const upsert = await Payment.updateOne(
          { paymentId }, // idempotency key
          {
            $setOnInsert: {
              paymentId,
              orderId,
              userId,
              amount,
              currency,
            },
            $set: {
              status,      // "captured"
              method,      // upi/card/...
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );

        const firstTime =
          !!upsert.upsertedId ||
          upsert.upsertedCount === 1; // compatible with different mongoose versions

        // 4) Flip plan only once (idempotent + race-safe)
        if (firstTime && userId) {
          await User.updateOne(
            { _id: userId, plan: { $ne: "pro" } },
            { $set: { plan: "pro", proSince: new Date() } }
          );
          // optional: send welcome email once
        }

        // Always 200 on handled events so Razorpay stops retrying
        return res.status(200).send("ok");
      }

      if (type === "payment.failed") {
        const p = event.payload.payment.entity;
        await Payment.updateOne(
          { paymentId: p.id },
          {
            $setOnInsert: {
              paymentId: p.id,
              orderId: p.order_id,
              userId: p.notes?.userId,
              amount: p.amount,
              currency: p.currency,
            },
            $set: {
              status: p.status,   // "failed"
              method: p.method,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
        return res.status(200).send("ok");
      }

      if (type === "refund.processed") {
        const r = event.payload.refund.entity;
        // r.payment_id → original payment
        await Payment.updateOne(
          { paymentId: r.payment_id },
          { $set: { status: "refunded", updatedAt: new Date() } }
        );
        // Optional: downgrade or mark entitlement as refunded per your policy
        return res.status(200).send("ok");
      }

      // Unhandled events: acknowledge to avoid retries
      return res.status(200).send("ignored");
    } catch (err) {
      console.error("webhook error:", err);
      // Return 5xx so Razorpay retries if we truly failed to process
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
