import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    location_id: { type: String, required: true },
    name: { type: String },
    type: { type: String, enum: ["pickup", "delivery"] },
    longitude: { type: mongoose.Schema.Types.Decimal128 },
    latitude: { type: mongoose.Schema.Types.Decimal128 },
  },
  { collection: "location" }
);

export default mongoose.model("Location", locationSchema);
