import payFundWallet from "./pay-fund-wallet.js";
import payWithCard from "./pay-with-card.js";
import payWithWallet from "./pay-with-wallet.js";
import getWalletBalance from "./get-wallet-balance.js";

export const paymentPaths = {
  "/payments/fund_wallet/pay": {
    ...payFundWallet,
  },
  "/payments/with_card/pay": {
    ...payWithCard,
  },
  "/payments/with_wallet/pay": {
    ...payWithWallet,
  },
  "/payments/wallet/balance": {
    ...getWalletBalance,
  },
};
