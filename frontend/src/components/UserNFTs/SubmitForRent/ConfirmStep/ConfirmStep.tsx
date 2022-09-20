import { useContext, useState } from "react";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { MoneyInput } from "../../../Common/MoneyInput/MoneyInput";
import { SubmitForRentContext } from "../context/submitForRent.context";
import styles from "./ConfirmStep.module.scss";

export const ConfirmStep = () => {
  const { setStep, nft } = useContext(SubmitForRentContext);
  const nftName = nft.meta?.name;

  return (
    <div className={styles.step}>
      <div className={styles.title}>Confirm Submition</div>
      <div className={styles.rentInfo}>
        <div className={styles.row}>
          <div className={styles.name}>{nftName}</div>
          <div className={styles.eth}>1 ETH / Month</div>
        </div>
        <div className={styles.row}>
          <div className={styles.number}>#123</div>
          <div className={styles.converted}> ~1220$ / Month</div>
        </div>
      </div>
      <div className={styles.price}></div>

      <button className="button buttonFullWidth buttonCta">Confirm</button>
      <div className={styles.additionalText}></div>
    </div>
  );
};
