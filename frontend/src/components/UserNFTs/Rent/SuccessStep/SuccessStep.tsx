import { useContext } from "react";
import styles from "./SuccessStep.module.scss";
import checkGreen from "../../../../assets/icons/checkGreen.svg";
import { RentContext } from "../context/rent.context";

export const SuccessStep = () => {
  const { nft } = useContext(RentContext);

  const { name: nftName } = nft;

  return (
    <div className={styles.step}>
      <div className={styles.success}>
        <img src={checkGreen} alt="" />
      </div>
      <div className={styles.title}>Congrats!</div>
      <div className={styles.subTitle}>You rented {nftName} for yourself</div>
      <button
        className="button buttonFullWidth buttonCta"
        // onClick={}
      >
        View On Marketplace
      </button>
    </div>
  );
};
