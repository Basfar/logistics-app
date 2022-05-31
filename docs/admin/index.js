import loginAdmin from "./login.js";
import logoutAdmin from "./logout.js";
import addPackage from "./add-package.js";
import incPackageQuantity from "./inc-package-quantity.js";
import getRidersAdmin from "./get-riders.js";
import removeRider from "./remove-rider.js";

export const adminPaths = {
  "/api/v1/admin/login": {
    ...loginAdmin,
  },
  "/api/v1/admin/logout": {
    ...logoutAdmin,
  },
  "/api/v1/admin/add_package": {
    ...addPackage,
  },
  "/api/v1/admin/inc_package_quantity": {
    ...incPackageQuantity,
  },
  "/api/v1/admin/get_riders": {
    ...getRidersAdmin,
  },
  "/api/v1/admin/remove_rider": {
    ...removeRider,
  },
};
