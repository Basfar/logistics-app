import mongoose from "mongoose";
import PhoneNumber from "./PhoneNumber.js";
import LocationCol from "./Location.js";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone_number: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "phonenumber",
    },
    password: { type: String },
    otp_verified: { type: Boolean, default: false, allowNull: true },
    current_location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
