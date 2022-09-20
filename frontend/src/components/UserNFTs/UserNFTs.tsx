import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccountNumber } from "../../modules/selectors/user.selector";
import { ethProvider } from "../../utils/utils";
import { NFTCard } from "./NFTCard/NFTCard";
import styles from "./UserNFTs.module.scss";

export const UserNFTs: FC = () => {
  const walletAddress = useSelector(userAccountNumber);
  const [nfts, setNfts] = useState([]);

  const getNFTs = async (walletAddress) => {
    if (!walletAddress) return;

    const response = await fetch(
      `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`
    );

    const data = await response.json();

    setNfts(data.items);
  };

  const getNFTContract = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        return;
      }

      const accounts = await ethProvider.send("eth_requestAccounts", []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNFTs(walletAddress);
  }, [walletAddress]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsGrid}>
        {nfts.map((nft) => {
          return <NFTCard nft={nft} key={nft.id} />;
        })}
      </div>
    </div>
  );
};
