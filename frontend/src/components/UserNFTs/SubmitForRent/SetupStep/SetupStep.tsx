import { useState } from "react";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { MoneyInput } from "../../../Common/MoneyInput/MoneyInput";
import styles from "./SetupStep.module.scss";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";

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

  const buttonHandler = async () => {
    const contract = await ERC721Rent__factory.connect(
      "0x8236b943f7204Cc86aD56E216dEdcafE1e7C6B03",
      ethProvider
    );

    const transaction = await contract.allowRent(
      "0xC7E1ae0dA2fD67a4192560C709A8Ed33557e435a",
      2,
      true,
      1,
      1
    );

    console.log(transaction);
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
      <button
        className="button buttonFullWidth buttonCta"
        onClick={buttonHandler}
      >
        Continue
      </button>
    </div>
  );
};
