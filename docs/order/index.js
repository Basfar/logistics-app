import createOrder from "./create-order.js";
import getPackages from "./get-packages.js";
import getPackage from "./get-package.js";
import getOrder from "./get-order.js";
import getLocation from "./get-location.js";
import acceptOrder from "./accept-order.js";
import declineOrder from "./decline-order.js";
import changeRider from "./change-rider.js";
import pickedUpOrder from "./picked-up-order.js";
import deliveredOrder from "./delivered-order.js";

export const orderPaths = {
  "/api/v1/orders/create_order": {
    ...createOrder,
  },
  "/api/v1/orders/get_packages": {
    ...getPackages,
  },
  "/api/v1/orders/get_package": {
    ...getPackage,
  },
  "/api/v1/orders/get_order": {
    ...getOrder,
  },
  "/api/v1/orders/get_location": {
    ...getLocation,
  },
  "/api/v1/orders/accept_order": {
    ...acceptOrder,
  },
  "/api/v1/orders/decline_order": {
    ...declineOrder,
  },
  "/api/v1/orders/change_rider": {
    ...changeRider,
  },
  "/api/v1/orders/picked_up_order": {
    ...pickedUpOrder,
  },
  "/api/v1/orders/delivered_order": {
    ...deliveredOrder,
  },
};
