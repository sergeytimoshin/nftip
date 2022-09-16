import styles from "./UserMenu.module.scss";
import metaMaskIcon from "../../../assets/icons/fox.svg";
import { AccountNumber } from "../../Common/AccountNumber/AccountNumber";
import { WalletInfo } from "./WalletInfo/WalletInfo";
import { useState } from "react";

export const UserMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenuHandler = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className={styles.userAccount}>
      <div onClick={toggleMenuHandler} className={styles.accountNumber}>
        <img
          className={styles.walletIcon}
          src={metaMaskIcon}
          alt="MetaMask Icon"
        />
        <AccountNumber />
      </div>

      {showUserMenu && <WalletInfo />}
    </div>
  );
};
