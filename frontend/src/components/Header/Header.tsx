import { FC } from "react";
import { useSelector } from "react-redux";
import { useWalletIsConnected } from "../../hooks/checkWalletConnection.hooks";
import { userAccountNumber } from "../../modules/selectors/user.selector";
import { ConnectWallet } from "./ConnectWallet/ConnectWallet";
import { UserMenu } from "./UserMenu/UserMenu";
import styles from "./Header.module.scss";
import AppLogo from "../../assets/images/logo.svg";

export const Header: FC = () => {
  const accountNumber = useSelector(userAccountNumber);
  useWalletIsConnected(accountNumber);

  return (
    <div className={styles.header}>
      <img src={AppLogo} alt="App Logo" />
      {accountNumber ? <UserMenu /> : <ConnectWallet />}
    </div>
  );
};
