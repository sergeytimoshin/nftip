import { useContext, useEffect, useState } from "react";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";
import { SubmitForRentContext } from "../context/submitForRent.context";
import styles from "./ConfirmStep.module.scss";

export const ConfirmStep = () => {
  const { setStep, moneyValue, nft } = useContext(SubmitForRentContext);
  const { name: nftName, id } = nft;

  const confirmHandler = async () => {
    const contract = await ERC721Rent__factory.connect(
      "0x8Bd9665d182Daaad45eB321913E42c74CC4b7bdC", // network address
      ethProvider.getSigner()
    );

    const transaction = await contract.allowRent(
      "0xA109c70f4094724932C45A00c7601eF008Eea0Da",
      id._hex,
      true,
      Number(moneyValue),
      1
    );

    const result = await transaction.wait();

    //add loading spinner

    if (result) {
      setStep("success");
    }
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
