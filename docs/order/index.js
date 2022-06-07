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
  "/orders/create_order": {
    ...createOrder,
  },
  "/orders/get_packages": {
    ...getPackages,
  },
  "/orders/get_package": {
    ...getPackage,
  },
  "/orders/get_order": {
    ...getOrder,
  },
  "/orders/get_location": {
    ...getLocation,
  },
  "/orders/accept_order": {
    ...acceptOrder,
  },
  "/orders/decline_order": {
    ...declineOrder,
  },
  "/orders/change_rider": {
    ...changeRider,
  },
  "/orders/picked_up_order": {
    ...pickedUpOrder,
  },
  "/orders/delivered_order": {
    ...deliveredOrder,
  },
};
