import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccountNumber } from "../../modules/selectors/user.selector";
import {
  ERC721Rent__factory,
  TestERC721__factory,
} from "../../typechain-types";
import { ethProvider } from "../../utils/utils";
import { mockedNFTs } from "../NFTS_MOCK";
import { NFTCard } from "./NFTCard/NFTCard";
import styles from "./UserNFTs.module.scss";

export const UserNFTs: FC = () => {
  const walletAddress = useSelector(userAccountNumber);
  const [nfts, setNfts] = useState([]);
  const [rentedNfts, setRentedNfts] = useState([]);

  const getNFTs = async (walletAddress) => {
    if (!walletAddress) return;

    const contract = await TestERC721__factory.connect(
      "0xA109c70f4094724932C45A00c7601eF008Eea0Da", // network address
      ethProvider
    );

    const contract2 = await ERC721Rent__factory.connect(
      "0x8Bd9665d182Daaad45eB321913E42c74CC4b7bdC",
      ethProvider
    );

    const transaction = await contract.listTokens();
    const transaction2 = await contract2.listRentConditions();

    const data = await transaction;
    const data2 = await transaction2;

    const ownedAndRentable = data.filter((elem) => {
      const tokenIsOwned = contract.ownerOf(elem.id._hex).then();
      return tokenIsOwned;
    });

    const notOwnedAndAllowed = data2.filter(async (elem) => {
      const tokenOwner = await contract
        .ownerOf(elem.currentRentingToken._hex)
        .then((response) => response)
        .then((ownerAddress) => {
          return ownerAddress;
        });

      return tokenOwner === walletAddress;
    });

    setNfts(ownedAndRentable);
    setRentedNfts(notOwnedAndAllowed);
  };

  useEffect(() => {
    getNFTs(walletAddress);
  }, [walletAddress]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsGrid}>
        {rentedNfts.map((nft) => {
          return <NFTCard nft={nft} key={nft.id} status="rented" />;
        })}
        {nfts.map((nft) => {
          return <NFTCard nft={nft} key={nft.id} status="rentable" />;
        })}
      </div>
    </div>
  );
};
