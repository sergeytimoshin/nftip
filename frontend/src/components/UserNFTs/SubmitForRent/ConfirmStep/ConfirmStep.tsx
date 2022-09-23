import { useContext, useEffect, useState } from "react";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";
import { SubmitForRentContext } from "../context/submitForRent.context";
import styles from "./ConfirmStep.module.scss";

export const ConfirmStep = () => {
  const { setStep, moneyValue, nft } = useContext(SubmitForRentContext);

  // const nftName = nft.meta?.name;

  const { name: nftName } = nft;

  const confirmHandler = async () => {
    // const contract = await ERC721Rent__factory.connect(
    //   "0xa5a47bF5273dD40679C213C8A8939c5133A85635",
    //   ethProvider.getSigner()
    // );

    // // allow rent nft
    // const rentingTx = await contract.allowRent(
    //   "0xC7E1ae0dA2fD67a4192560C709A8Ed33557e435a", //nft number
    //   4, //id
    //   true,
    //   Number(moneyValue), //price
    //   1 //collateral
    // );

    // const rentingTxResult = await rentingTx.wait();

    // console.log(rentingTxResult);

    // if (!rentingTxResult) {
    //   setStep("success");
    // }

    setStep("success");
  };

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
