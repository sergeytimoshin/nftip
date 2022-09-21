import { useContext, useState } from "react";
import { RentContext } from "../context/rent.context";
import styles from "./SetupStep.module.scss";

export const SetupStep = () => {
  const { setStep, nft } = useContext(RentContext);
  const nftName = nft.meta?.name;

  const buttonHandler = async () => {
    setStep("confirm");
  };

  const moneyValue = 1;

  return (
    <div className={styles.step}>
      <div className={styles.title}>Confirm Submition</div>
      <div className={styles.rentInfo}>
        <div className={styles.col}>
          <div className={styles.name}>{nftName}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.eth}>{moneyValue} ETH/Month</div>
          <div className={styles.converted}>
            {" "}
            ~{+moneyValue * 1500}$ / Month
          </div>
        </div>
      </div>
      <div className={styles.price}></div>

      <button
        className="button buttonFullWidth buttonCta"
        onClick={buttonHandler}
      >
        Continue
      </button>
      <div className={styles.additionalText}>
        Small additional text about fees or stuff like this
      </div>
    </div>
  );
};
