import paymentCtrl from "../controllers/paymentCtrl.js";
import { authToken, authOTPVerified } from "./auth.js";

import express from "express";

const paymentRouter = express.Router();

paymentRouter
  .route("/api/v1/payments/fund_wallet/pay")
  .post(authToken, paymentCtrl.payFundWallet);

paymentRouter
  .route("/api/v1/payments/with_card/pay")
  .post(authToken, paymentCtrl.payWithCard);

paymentRouter
  .route("/api/v1/payments/with_wallet/pay")
  .post(authToken, paymentCtrl.payWithWallet);

paymentRouter
  .route("/api/v1/payments/with_wallet/confirm")
  .post(paymentCtrl.confirmPaymentWithWallet);

paymentRouter
  .route("/api/v1/payments/fund_wallet/confirm")
  .get(authToken, paymentCtrl.confirmFundWalletPayment);

paymentRouter
  .route("/api/v1/payments/with_card/confirm")
  .get(authToken, paymentCtrl.confirmPaymentWithCard);

paymentRouter
  .route("/api/v1/payments/wallet/balance")
  .get(authToken, paymentCtrl.getWalletBalance);

export default paymentRouter;
