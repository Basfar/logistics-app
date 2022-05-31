import orderCtrl from "../controllers/orderCtrl.js";
import { authToken, authOTPVerified } from "./auth.js";
import express from "express";
import { authRiderToken } from "./authRider.js";

const orderRouter = express.Router();

orderRouter
  .route("/api/v1/orders/create_order")
  .post(authToken, orderCtrl.createOrder);

orderRouter.route("/api/v1/orders/get_packages").get(orderCtrl.getPackages);

orderRouter.route("/api/v1/orders/get_package").get(orderCtrl.getPackage);

orderRouter.route("/api/v1/orders/get_order").get(orderCtrl.getOrder);

orderRouter.route("/api/v1/orders/get_location").get(orderCtrl.getLocation);

orderRouter
  .route("/api/v1/orders/accept_order")
  .post(authRiderToken, orderCtrl.acceptOrder);

orderRouter
  .route("/api/v1/orders/decline_order")
  .post(authRiderToken, orderCtrl.declineOrder);

orderRouter
  .route("/api/v1/orders/change_rider")
  .post(authToken, orderCtrl.changeRider);

orderRouter
  .route("/api/v1/orders/picked_up_order")
  .post(authRiderToken, orderCtrl.pickedUp);

orderRouter
  .route("/api/v1/orders/delivered_order")
  .post(authRiderToken, orderCtrl.deliveredOrder);

export default orderRouter;
