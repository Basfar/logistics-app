import sendOtpUser from "./send-otp.js";
import verifyOtpUser from "./verify-otp.js";
import setPasswordUser from "./set-password.js";
import addPersonalInfoUser from "./add-personal-info.js";
import verifyEmailUser from "./verify-email.js";
import addDeliveryLocationUser from "./add-delivery-location.js";
import loginUser from "./login.js";
import logoutUser from "./logout.js";
import getRiders from "./get-riders.js";
import getUser from "./get-user.js";
import getPendingOrdersUser from "./get-pending-orders.js";
import getDeliveredOrdersUser from "./get-delivered-orders.js";
import getNotificationsUser from "./get-notifications.js";

export const userPaths = {
  "/api/v1/users/otp/phone": {
    ...sendOtpUser,
  },
  "/api/v1/users/otp/verify/phone": {
    ...verifyOtpUser,
  },
  "/api/v1/users/otp/verify/email": {
    ...verifyEmailUser,
  },
  "/api/v1/users/set_password": {
    ...setPasswordUser,
  },
  "/api/v1/users/add_personal_info": {
    ...addPersonalInfoUser,
  },
  "/api/v1/users/add_delivery_location": {
    ...addDeliveryLocationUser,
  },
  "/api/v1/users/login": {
    ...loginUser,
  },
  "/api/v1/users/logout": {
    ...logoutUser,
  },
  "/api/v1/users/get_user": {
    ...getUser,
  },
  "/api/v1/users/get_riders": {
    ...getRiders,
  },
  "/api/v1/users/get_pending_orders": {
    ...getPendingOrdersUser,
  },
  "/api/v1/users/get_delivered_orders": {
    ...getDeliveredOrdersUser,
  },
  "/api/v1/users/get_notifications": {
    ...getNotificationsUser,
  },
};
