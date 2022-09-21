import { useState } from "react";
import { SubmitForRent } from "../SubmitForRent/SubmitForRent";
import styles from "./NFTCard.module.scss";

export const NFTCard = ({ nft }) => {
  const nftImageUrl = nft.meta?.content[0].url;
  const nftName = nft.meta?.name;
  const [rentable, setRentable] = useState(true);

  console.log(nft);

  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <img className={styles.image} src={nftImageUrl} alt={nftName} />
        <div className={styles.tooltip}>Renting</div>
      </div>

      <div className={styles.info}>
        {rentable ? (
          <SubmitForRent nft={nft} />
        ) : (
          <>
            <div className={styles.row}>
              <div className={styles.number}>#123</div>
              <div className={styles.eth}>0.01 ETH / Month</div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>{nftName}</div>
              <div className={styles.converted}>220$ / Month</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
