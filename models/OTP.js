import mongoose from "mongoose";

export default function () {
  return mongoose.model(
    "OTP",
    mongoose.Schema(
      {
        otp: String,
        expiration_time: Date,
        verified: {
          type: Boolean,
          default: false,
          allowNull: true,
        },
      },
      {
        collection: "OTP",
        timestamps: true,
      }
    )
  );
};
