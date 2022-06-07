import mongoose from "mongoose";
import PhoneNumber from "./PhoneNumber.js";
import LocationCol from "./Location.js";
import Order from "./Order.js";

const riderSchema = mongoose.Schema(
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
    company_id: { type: String, ref: "company" },
    password: { type: String },
    otp_verified: { type: Boolean, default: false, allowNull: true },
    email_verified: { type: Boolean, default: false, allowNull: true },
    vehicle_type: { type: String },
    plate_number: { type: String },
    current_location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
    orders: { type: [mongoose.Schema.Types.ObjectId], ref: "orders" },
    earnings: { type: [Number] },
    active: { type: Boolean },
  },
  { collection: "riders", timestamps: true }
);

export default mongoose.model("Rider", riderSchema);
