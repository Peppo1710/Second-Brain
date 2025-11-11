const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, index: true, unique: true }, // Razorpay payment_id
    orderId:   { type: String, required: true },                             // Razorpay order_id
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },     // optional
    amount:    { type: Number, required: true },                              // paise
    currency:  { type: String, default: "INR" },
    status:    { type: String, enum: ["created","authorized","captured","failed","refunded"], required: true },
    method:    { type: String },                                             // upi/card/netbanking/…
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model("Payment", PaymentSchema);
