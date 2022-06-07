import sendOtp from "./send-otp.js";
import verifyOtp from "./verify-otp.js";
import setPassword from "./set-password.js";
import addPersonalInfo from "./add-personal-info.js";
// import verifyEmail from "./verify-email.js";
import addBikeDetails from "./add-bike-details.js";
import addDeliveryLocation from "./add-delivery-location.js";
import login from "./login.js";
import logout from "./logout.js";
import getRider from "./get-rider.js";
import getPendingOrders from "./get-pending-orders.js";
import getDeliveredOrders from "./get-delivered-orders.js";
import getNotifications from "./get-notifications.js";

export const riderPaths = {
  "/riders/otp/phone": {
    ...sendOtp,
  },
  "/riders/otp/verify/phone": {
    ...verifyOtp,
  },
  // "/riders/otp/verify/email": {
  //   ...verifyEmail,
  // },
  "/riders/set_password": {
    ...setPassword,
  },
  "/riders/add_personal_info": {
    ...addPersonalInfo,
  },
  "/riders/add_bike_details": {
    ...addBikeDetails,
  },
  "/riders/add_current_location": {
    ...addDeliveryLocation,
  },
  "/riders/login": {
    ...login,
  },
  "/riders/logout": {
    ...logout,
  },
  "/riders/get_rider": {
    ...getRider,
  },
  "/riders/get_pending_orders": {
    ...getPendingOrders,
  },
  "/riders/get_delivered_orders": {
    ...getDeliveredOrders,
  },
  "/riders/get_notifications": {
    ...getNotifications,
  },
};
