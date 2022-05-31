import mongoose from "mongoose";
import LocationCol from "./Location.js";
import Order from "./Order.js";
import Rider from "./Rider.js";

const companySchema = mongoose.Schema(
  {
    company_id: { type: String },
    name: { type: String },
    current_location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
    password: { type: String },
    email: {
      type: String,
      unique: true,
    },
    riders: { type: [mongoose.Schema.Types.ObjectId], ref: "riders" },
    active_riders: { type: [mongoose.Schema.Types.ObjectId], ref: "riders" },
    orders: { type: [mongoose.Schema.Types.ObjectId], ref: "orders" },
    earnings: { type: [Number] },
  },
  { collection: "company" }
);

export default mongoose.model("Company", companySchema);
