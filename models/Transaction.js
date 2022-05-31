import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    transactionId: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: { type: String },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    orderId: {
      type: String,
      ref: "orders",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },
    paymentStatus: {
      type: String,
      enum: ["successful", "pending", "failed"],
      default: "pending",
    },
    paymentGateway: {
      type: String,
      required: [true, "Payment gateway is required"],
      enum: ["flutterwave"],
    },
  },
  { collection: "transactions", timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
