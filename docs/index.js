import basicInfo from "./basicInfo.js";
import servers from "./servers.js";
import tags from "./tags.js";
import components from "./components.js";
import { userPaths } from "./user/index.js";
import { riderPaths } from "./rider/index.js";
import { orderPaths } from "./order/index.js";
import { paymentPaths } from "./payment/index.js";
import { adminPaths } from "./admin/index.js";

// console.log(userPaths)
// console.log(riderPaths)

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...userPaths,
    ...riderPaths,
    ...orderPaths,
    ...paymentPaths,
    ...adminPaths,
  },
  // ...rider,
  // ...user,
};
