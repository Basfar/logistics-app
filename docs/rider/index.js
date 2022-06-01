import sendOtp from "./send-otp.js";
import verifyOtp from "./verify-otp.js";
import setPassword from "./set-password.js";
import addPersonalInfo from "./add-personal-info.js";
import verifyEmail from "./verify-email.js";
import addBikeDetails from "./add-bike-details.js";
import addDeliveryLocation from "./add-delivery-location.js";
import login from "./login.js";
import logout from "./logout.js";
import getRider from "./get-rider.js";
import getPendingOrders from "./get-pending-orders.js";
import getDeliveredOrders from "./get-delivered-orders.js";
import getNotifications from "./get-notifications.js";

export const riderPaths = {
  "/api/v1/riders/otp/phone": {
    ...sendOtp,
  },
  "/api/v1/riders/otp/verify/phone": {
    ...verifyOtp,
  },
  "/api/v1/riders/otp/verify/email": {
    ...verifyEmail,
  },
  "/api/v1/riders/set_password": {
    ...setPassword,
  },
  "/api/v1/riders/add_personal_info": {
    ...addPersonalInfo,
  },
  "/api/v1/riders/add_bike_details": {
    ...addBikeDetails,
  },
  "/api/v1/riders/add_current_location": {
    ...addDeliveryLocation,
  },
  "/api/v1/riders/login": {
    ...login,
  },
  "/api/v1/riders/logout": {
    ...logout,
  },
  "/api/v1/riders/get_rider": {
    ...getRider,
  },
  "/api/v1/riders/get_pending_orders": {
    ...getPendingOrders,
  },
  "/api/v1/riders/get_delivered_orders": {
    ...getDeliveredOrders,
  },
  "/api/v1/riders/get_notifications": {
    ...getNotifications,
  },
};
