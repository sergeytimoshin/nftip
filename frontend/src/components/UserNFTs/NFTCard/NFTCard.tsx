import { FC, useState } from "react";
import { Rent } from "../Rent/Rent";
import { SubmitForRent } from "../SubmitForRent/SubmitForRent";
import styles from "./NFTCard.module.scss";
import cn from "classnames";
import { generatePath, useNavigate } from "react-router-dom";
import { id } from "ethers/lib/utils";

interface Props {
  nft: any;
  status: string;
}

export const NFTCard: FC<Props> = ({ nft, status }) => {
  // const nftImageUrl = nft.imgUrl;
  const nftName = nft.name;
  const nftNumber = nft.number;
  const nftPrice = nft.monthlyPrice;
  const state = nft.state;
  const nftAddress = nft.address;

  const { uri: nftImageUrl, id } = nft;

  const navigate = useNavigate();
  const navigationHandler = () => {
    navigate(generatePath("/:id", { id: id._hex }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <a onClick={() => navigationHandler()}>
          <img className={styles.image} src={nftImageUrl} alt={nftName} />
        </a>
        {state == "rented" && <div className={styles.tooltip}>Renting</div>}
        {state == "yours" && (
          <div className={cn(styles.tooltip, styles.tooltip_available)}>
            Available
          </div>
        )}
      </div>

      <div className={styles.info}>
        {state == "rented" && (
          <>
            <div className={styles.row}>
              <div className={styles.number}>{nftNumber}</div>
              <div className={styles.eth}>{nftPrice} ETH / Month</div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>{nftName}</div>
              <div className={styles.converted}>
                {+nftPrice * 1500}$ / Month
              </div>
            </div>
          </>
        )}
        {status == "rentable" && <SubmitForRent nft={nft} />}
        {state == "rentable" && <Rent nft={nft} />}
      </div>
    </div>
  );
};
