// routes/payments.routes.js
const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const authMiddleware = require("../middleware/authMiddleware");

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

    const options = {
      amount: PLANS[plan].amountInPaise, // paise
      currency: "INR",
      receipt: `rcpt_${userId}_${Date.now()}`,
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

module.exports = router;
