import express from "express";
import riderCtrl from "../controllers/riderCtrl.js";
import otpCtrl from "../controllers/otpCtrl.js";
import { authToken } from "./auth.js";
import { authRiderOTPVerified, authRiderToken } from "./authRider.js";
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";
import { exec } from "child_process";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    exec("mkdir uploads");
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const riderRouter = express.Router();

riderRouter.route("/api/v1/riders/otp/phone").post(otpCtrl.otpPhone);
// riderRouter.route("/api/v1/riders/otp/email").post(otpCtrl.otpEmail);
riderRouter
  .route("/api/v1/riders/otp/verify/phone")
  .post(otpCtrl.verifyOtpPhone);
// riderRouter
//   .route("/api/v1/riders/otp/verify/email")
//   .post(otpCtrl.verifyOtpEmail);

riderRouter
  .route("/api/v1/riders/set_password")
  .post(authRiderToken, riderCtrl.setPassword);

riderRouter
  .route("/api/v1/riders/add_personal_info")
  .post(authRiderToken, riderCtrl.addPersonalInfo);
riderRouter
  .route("/api/v1/riders/add_bike_details")
  .post(authRiderToken, riderCtrl.addBikeDetails);

riderRouter
  .route("/api/v1/riders/add_current_location")
  .post(authRiderToken, riderCtrl.addDeliveryLocation);

riderRouter
  .route("/api/v1/riders/set_status")
  .post(authRiderToken, riderCtrl.setStatus);
riderRouter.route("/api/v1/riders/login").post(riderCtrl.login);
riderRouter.route("/api/v1/riders/logout").post(riderCtrl.logout);

riderRouter
  .route("/api/v1/riders/get_rider")
  .get(authRiderToken, riderCtrl.getRider);

riderRouter
  .route("/api/v1/riders/upload_image")
  .post(upload.single("profilePicture"), riderCtrl.imageUpload);

riderRouter.route("/api/v1/riders/get_image").get(riderCtrl.getImageUrl);

riderRouter
  .route("/api/v1/users/get_riders")
  .get(authToken, riderCtrl.getRiders);

riderRouter
  .route("/api/v1/riders/get_pending_orders")
  .get(authRiderToken, riderCtrl.getPendingOrders);

riderRouter
  .route("/api/v1/riders/get_delivered_orders")
  .get(authRiderToken, riderCtrl.getDeliveredOrders);

riderRouter
  .route("/api/v1/riders/get_notifications")
  .get(authRiderToken, riderCtrl.getNotifications);

export default riderRouter;
