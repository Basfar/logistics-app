import express from "express";
import CryptoJS from "crypto-js";
import orderCtrl from "../controllers/orderCtrl.js";
import riderCtrl from "../controllers/riderCtrl.js";
import Company from "../models/Company.js";
import { adminLogin, adminLogout, authAdminToken } from "./authAdmin.js";

const adminRouter = express.Router();

adminRouter.route("/api/v1/admin/login").post(adminLogin);
adminRouter.route("/api/v1/admin/logout").post(adminLogout);

adminRouter.route("/api/v1/admin/add_company").post(async (req, res) => {
  const { company_id, name, email, password } = req.body;
  await Company.create({
    company_id,
    name,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PASSPHRASE
    ).toString(),
  });
  res.status(201).json({ message: "Admin created" });
});

adminRouter
  .route("/api/v1/admin/get_riders")
  .get(authAdminToken, riderCtrl.getRidersCompany);
adminRouter
  .route("/api/v1/admin/add_rider")
  .post(authAdminToken, riderCtrl.addRider);
adminRouter
  .route("/api/v1/admin/remove_rider")
  .post(authAdminToken, riderCtrl.removeRider);

export default adminRouter;
