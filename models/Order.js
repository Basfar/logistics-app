import mongoose from "mongoose";
import Package from "./Package.js";
import LocationCol from "./Location.js";

const orderSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    description: { type: String },
    distance: { type: Number },
    price: { type: Number },
    eta_pickup: { type: Number },
    eta_delivery: { type: Number },
    picked_up: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "riders",
    },
    packages: { type: [String] },
    order_status: {
      type: String,
      enum: ["completed", "pending", "canceled"],
    },
    paid: { type: Boolean, required: true, default: false },
    pickup_locations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "location",
    },
    delivery_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
  },
  { collection: "orders", timestamps: true }
);

export default mongoose.model("Order", orderSchema);
