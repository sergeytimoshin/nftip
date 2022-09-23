import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserAccountNumber } from "../../../modules/user.slice";
import { Modal } from "../../Common/Modal/Modal";
import styles from "./ConnectWallet.module.scss";
import metaMaskIcon from "../../../assets/icons/fox.svg";

import cn from "classnames";
import { ethProvider } from "../../../utils/utils";

export const ConnectWallet: FC = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const openConnectWalletModal = () => {
    setOpenModal(true);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethProvider.send("eth_requestAccounts", []);

      dispatch(setUserAccountNumber(accounts[0]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="button buttonTransparent"
        onClick={() => openConnectWalletModal()}
      >
        Connect Wallet
      </button>

      <Modal visible={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modalHeader}>Connect wallet</div>
        <button
          onClick={connectWallet}
          className={cn("button buttonTransparent", styles.walletButton)}
        >
          <img src={metaMaskIcon} alt="MetaMask Icon" />
          Metamask
        </button>
      </Modal>
    </>
  );
};
