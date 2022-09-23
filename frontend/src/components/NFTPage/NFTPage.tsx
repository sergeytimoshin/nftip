import { useLocation } from "react-router-dom";
import { mockedNFTs } from "../NFTS_MOCK";
import { Rent } from "../UserNFTs/Rent/Rent";
import { StopRent } from "../UserNFTs/StopRent/StopRent";
import { SubmitForRent } from "../UserNFTs/SubmitForRent/SubmitForRent";
import styles from "./NFTPage.module.scss";

export const NFTPage = () => {
  const location = useLocation();

  let nft = mockedNFTs.find((item) => {
    return item.address === location.pathname.substring(1);
  });

  const { name, imgUrl, number, monthlyPrice, state } = nft;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.status}>
          <div className={styles.statusNumber}>#{number}</div>
          <div className={styles.statusTooltip}>{state}</div>
        </div>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>{monthlyPrice} ETH/Month</div>
        <div className={styles.convertedPrice}>
          {+monthlyPrice * 1500}$ / Month
        </div>
        {state == "yours" && <SubmitForRent nft={nft} />}
        {state == "rentable" && <Rent nft={nft} />}
        {state == "rented" && <StopRent nft={nft} />}
      </div>
    </div>
  );
};
