import loginAdmin from "./login.js";
import logoutAdmin from "./logout.js";
import addRider from "./add-rider.js";
import addCompany from "./add-company.js";
import getRidersAdmin from "./get-riders.js";
import removeRider from "./remove-rider.js";

export const adminPaths = {
  "/admin/login": {
    ...loginAdmin,
  },
  "/admin/logout": {
    ...logoutAdmin,
  },
  "/admin/get_riders": {
    ...getRidersAdmin,
  },
  "/admin/add_rider": {
    ...addRider,
  },
  "/admin/add_company": {
    ...addCompany,
  },
  "/admin/remove_rider": {
    ...removeRider,
  },
};
