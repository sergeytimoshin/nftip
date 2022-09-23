import { ethProvider } from "../../../../utils/utils";
import { AccountNumber } from "../../../Common/AccountNumber/AccountNumber";
import styles from "./WalletInfo.module.scss";

export const WalletInfo = () => {
  const handleWalletDisconnect = () => {
    ethProvider.send("eth_requestAccounts", [{ eth_accounts: {} }]);
  };

  return (
    <div className={styles.account}>
      <div className={styles.accountNumber}>
        <div className={styles.title}>Connected with MetaMask</div>
        <AccountNumber truncateLength={7} />
      </div>
      <div className={styles.controls}>
        <button
          className="button buttonTransparent"
          onClick={handleWalletDisconnect}
        >
          Disonnect Wallet
        </button>
        <a href="" className={styles.link}>
          View on Explorer
        </a>
      </div>
    </div>
  );
};
