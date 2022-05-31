import mongoose from "mongoose";

const walletSchema = mongoose.Schema(
  {
    balance: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { collection: "wallets", timestamps: true }
);

export default mongoose.model("wallet", walletSchema);
