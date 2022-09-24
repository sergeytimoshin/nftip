import { useContext, useState } from "react";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { MoneyInput } from "../../../Common/MoneyInput/MoneyInput";
import styles from "./SetupStep.module.scss";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";
import { SubmitForRentContext } from "../context/submitForRent.context";
import { useSelector } from "react-redux";
import { userAccountNumber } from "../../../../modules/selectors/user.selector";

export const SetupStep = () => {
  const { moneyValue, setMoneyValue, setStep, nft } =
    useContext(SubmitForRentContext);

  const walletNumber = useSelector(userAccountNumber);

  const [firstCheck, setFirstCheck] = useState(false);

  // const nftImageUrl = nft.meta?.content[0].url;
  // const nftName = nft.meta?.name;

  const { name: nftName, uri: nftImageUrl, id } = nft;

  const moneyInputHandler = (e) => {
    setMoneyValue(e.target.value);
  };

  const checkboxHandler = () => {
    setFirstCheck(!firstCheck);
  };

  const buttonHandler = async () => {
    setStep("confirm");
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
