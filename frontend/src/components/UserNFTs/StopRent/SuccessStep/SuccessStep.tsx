import { useContext } from "react";
import styles from "./SuccessStep.module.scss";
import checkGreen from "../../../../assets/icons/checkGreen.svg";
import { StopRentContext } from "../context/stopRent.context";

export const SuccessStep = () => {
  const { nft } = useContext(StopRentContext);

  const { name: nftName } = nft;

  return (
    <div className={styles.step}>
      <div className={styles.success}>
        <img src={checkGreen} alt="" />
      </div>
      <div className={styles.title}>Congrats!</div>
      <div className={styles.subTitle}>
        You're item {nftName} is't rented anymore
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
