import payFundWallet from "./pay-fund-wallet.js";
import payWithCard from "./pay-with-card.js";
import payWithWallet from "./pay-with-wallet.js";
import getWalletBalance from "./get-wallet-balance.js";

export const paymentPaths = {
  "/api/v1/payments/fund_wallet/pay": {
    ...payFundWallet,
  },
  "/api/v1/payments/with_card/pay": {
    ...payWithCard,
  },
  "/api/v1/payments/with_wallet/pay": {
    ...payWithWallet,
  },
  "/api/v1/payments/wallet/balance": {
    ...getWalletBalance,
  },
};
