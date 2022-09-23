import { useContext, useEffect, useState } from "react";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { StopRentContext } from "../context/stopRent.context";
import styles from "./ConfirmStep.module.scss";

export const ConfirmStep = () => {
  const [firstCheck, setFirstCheck] = useState(false);
  const { setStep, nft } = useContext(StopRentContext);

  const checkboxHandler = () => {
    setFirstCheck(!firstCheck);
  };
  // const nftName = nft.meta?.name;

  const { name: nftName } = nft;

  const confirmHandler = async () => {
    const contract = await ERC721Rent__factory.connect(
      "0xa5a47bF5273dD40679C213C8A8939c5133A85635",
      ethProvider.getSigner()
    );

    // stop rent
    const txFinalOfRent = await contract.finalizeRent(1); //arg: rentTokenId
    await txFinalOfRent.wait();
    console.log("txFinalOfRent", txFinalOfRent);

    // resolivng disputes after rent
    const txresolvedisput = await contract.resolveDispute(1); //arg rentTokenId
    const result = await txresolvedisput.wait();
    console.log("txresolvedisput", result);

    if (!txresolvedisput) {
      setStep("success");
    }
  };

  const moneyValue = 1;

  return (
    <div className={styles.step}>
      <div className={styles.title}>Stop Rent</div>
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

      <div className={styles.checkboxes}>
        <Checkbox
          value={firstCheck}
          label="You're about to stop you rental"
          onChange={checkboxHandler}
          id="agreement"
          additionalText="Reantal agreement will be stopped"
        />
      </div>

      <button
        className="button buttonFullWidth buttonCta"
        onClick={confirmHandler}
      >
        Confirm
      </button>
      <div className={styles.additionalText}>
        Small additional text about fees or stuff like this
      </div>
    </div>
  );
};
