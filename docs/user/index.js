import sendOtpUser from "./send-otp.js";
import verifyOtpUser from "./verify-otp.js";
import setPasswordUser from "./set-password.js";
import addPersonalInfoUser from "./add-personal-info.js";
// import verifyEmailUser from "./verify-email.js";
import addDeliveryLocationUser from "./add-delivery-location.js";
import loginUser from "./login.js";
import logoutUser from "./logout.js";
import getRiders from "./get-riders.js";
import getUser from "./get-user.js";
import getPendingOrdersUser from "./get-pending-orders.js";
import getDeliveredOrdersUser from "./get-delivered-orders.js";
import getNotificationsUser from "./get-notifications.js";

export const userPaths = {
  "/users/otp/phone": {
    ...sendOtpUser,
  },
  "/users/otp/verify/phone": {
    ...verifyOtpUser,
  },
  // "/users/otp/verify/email": {
  //   ...verifyEmailUser,
  // },
  "/users/set_password": {
    ...setPasswordUser,
  },
  "/users/add_personal_info": {
    ...addPersonalInfoUser,
  },
  "/users/add_delivery_location": {
    ...addDeliveryLocationUser,
  },
  "/users/login": {
    ...loginUser,
  },
  "/users/logout": {
    ...logoutUser,
  },
  "/users/get_user": {
    ...getUser,
  },
  "/users/get_riders": {
    ...getRiders,
  },
  "/users/get_pending_orders": {
    ...getPendingOrdersUser,
  },
  "/users/get_delivered_orders": {
    ...getDeliveredOrdersUser,
  },
  "/users/get_notifications": {
    ...getNotificationsUser,
  },
};
