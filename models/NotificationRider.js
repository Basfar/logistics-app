import mongoose from "mongoose";

const notificationRiderSchema = mongoose.Schema(
  {
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "riders",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order_type: {
      type: String,
    },
    order_id: {
      type: String,
      ref: "orders",
    },
  },
  { collection: "notifications_rider", timestamps: true }
);

export default mongoose.model("NotificationRider", notificationRiderSchema);
