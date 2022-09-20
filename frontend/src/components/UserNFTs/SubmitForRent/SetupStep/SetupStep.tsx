import { useState } from "react";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { MoneyInput } from "../../../Common/MoneyInput/MoneyInput";
import styles from "./SetupStep.module.scss";

export const SetupStep = ({ nft }) => {
  const [moneyValue, setMoneyValue] = useState("");
  const [firstCheck, setFirstCheck] = useState(false);

  const nftImageUrl = nft.meta?.content[0].url;
  const nftName = nft.meta?.name;

  const moneyInputHandler = (e) => {
    setMoneyValue(e.target.value);
  };

  const checkboxHandler = () => {
    setFirstCheck(!firstCheck);
  };
  return (
    <div className={styles.rentStep}>
      <div className={styles.nftImage}>
        <img src={nftImageUrl} alt={nftName} />
      </div>
      <div className={styles.title}>You're putting {nftName} for rent for:</div>
      <div className={styles.moneyInput}>
        <MoneyInput
          placeholder="0.00"
          value={moneyValue}
          onChange={moneyInputHandler}
        />
        <div className={styles.moneyInputAdditionalInfo}>
          Additional text under the input
        </div>
      </div>
      <div className={styles.checkboxes}>
        <Checkbox
          value={firstCheck}
          label="I agree with it"
          onChange={checkboxHandler}
          id="agreement"
          additionalText="long and sad additional text for stuff like terms, conditions, etc"
        />
      </div>
      <button className="button buttonFullWidth buttonCta">Continue</button>
    </div>
  );
};
