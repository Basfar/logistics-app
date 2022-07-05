import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import otpCtrl from "../controllers/otpCtrl.js";
import { authToken, authOTPVerified } from "./auth.js";
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

const userRouter = express.Router();

userRouter.route("/api/v1/users/otp/phone").post(otpCtrl.otpPhone);
// userRouter.route("/api/v1/users/otp/email").post(otpCtrl.otpEmail);
userRouter.route("/api/v1/users/otp/verify/phone").post(otpCtrl.verifyOtpPhone);
// userRouter.route("/api/v1/users/otp/verify/email").post(otpCtrl.verifyOtpEmail);
userRouter
  .route("/api/v1/users/set_password")
  .post(authToken, userCtrl.setPassword);
userRouter
  .route("/api/v1/users/add_personal_info")
  .post(authToken, userCtrl.addPersonalInfo);
userRouter
  .route("/api/v1/users/add_delivery_location")
  .post(authToken, userCtrl.addDeliveryLocation);
userRouter.route("/api/v1/users/login").post(userCtrl.login);
userRouter.route("/api/v1/users/logout").post(userCtrl.logout);

userRouter.route("/api/v1/users/get_user").get(authToken, userCtrl.getUser);

userRouter
  .route("/api/v1/users/upload_image")
  .post(upload.single("profilePicture"), userCtrl.imageUpload);

userRouter.route("/api/v1/users/get_image").get(userCtrl.getImageUrl);

userRouter
  .route("/api/v1/users/get_pending_orders")
  .get(authToken, userCtrl.getPendingOrders);

userRouter
  .route("/api/v1/users/get_delivered_orders")
  .get(authToken, userCtrl.getDeliveredOrders);

userRouter
  .route("/api/v1/users/get_notifications")
  .get(authToken, userCtrl.getNotifications);

export default userRouter;
