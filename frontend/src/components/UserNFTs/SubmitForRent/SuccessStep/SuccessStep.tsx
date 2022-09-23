import { useContext } from "react";
import { SubmitForRentContext } from "../context/submitForRent.context";
import styles from "./SuccessStep.module.scss";
import checkGreen from "../../../../assets/icons/checkGreen.svg";

export const SuccessStep = () => {
  const { nft } = useContext(SubmitForRentContext);

  const { name: nftName } = nft;

  return (
    <div className={styles.step}>
      <div className={styles.success}>
        <img src={checkGreen} alt="" />
      </div>
      <div className={styles.title}>Congrats!</div>
      <div className={styles.subTitle}>
        You're item {nftName} was put for rent
      </div>
      <button
        className="button buttonFullWidth buttonCta"
        // onClick={}
      >
        View On Marketplace
      </button>
    </div>
  );
};
