import mongoose from "mongoose";

const phoneSchema = mongoose.Schema(
  {
    country_code: { type: Number, required: true },
    number: { type: Number, required: true, unique: true },
  },
  { collection: "phonenumber" }
);

export default mongoose.model("PhoneNumber", phoneSchema);
