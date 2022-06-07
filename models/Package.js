import mongoose from "mongoose";
import LocationCol from "./Location.js";

const packageSchema = mongoose.Schema(
  {
    package_id: {
      type: String,
      required: true,
    },
    description: { type: String },
    package_name: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    quantity: { type: Number, required: true },
    pickup_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: true,
    },
  },
  { collection: "packages", timestamps: true }
);

export default mongoose.model("Package", packageSchema);
