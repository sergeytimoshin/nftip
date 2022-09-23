import { FC } from "react";
import { useSelector } from "react-redux";
import { useWalletIsConnected } from "../../hooks/checkWalletConnection.hooks";
import { userAccountNumber } from "../../modules/selectors/user.selector";
import { ConnectWallet } from "./ConnectWallet/ConnectWallet";
import { UserMenu } from "./UserMenu/UserMenu";
import styles from "./Header.module.scss";
import AppLogo from "../../assets/images/logo.svg";
import { SubmitForRent } from "../UserNFTs/SubmitForRent/SubmitForRent";
import { ERC721Rent__factory } from "../../typechain-types";
import { ethProvider } from "../../utils/utils";
import { Event } from "ethers";
import { Rent } from "../UserNFTs/Rent/Rent";
import { StopRent } from "../UserNFTs/StopRent/StopRent";

export const Header: FC = () => {
  const accountNumber = useSelector(userAccountNumber);
  useWalletIsConnected(accountNumber);

  // const nftMock = {
  //   id: "POLYGON:0x2953399124f0cbb46d2cbacd8a89cf0599974963:81717149829793910253025094003263137422701326667011376906265976729433395954164",
  //   blockchain: "POLYGON",
  //   collection: "POLYGON:0x2953399124f0cbb46d2cbacd8a89cf0599974963",
  //   contract: "POLYGON:0x2953399124f0cbb46d2cbacd8a89cf0599974963",
  //   tokenId:
  //     "81717149829793910253025094003263137422701326667011376906265976729433395954164",
  //   creators: [
  //     {
  //       account: "ETHEREUM:0xb4aa448ba7363dead79171244abf8328f2ae2a9c",
  //       value: 10000,
  //     },
  //   ],
  //   lazySupply: "0",
  //   pending: [],
  //   mintedAt: "2022-04-30T09:49:15.184Z",
  //   lastUpdatedAt: "2022-04-30T09:49:15.184Z",
  //   supply: "63",
  //   meta: {
  //     name: "Sad Binance Pepe",
  //     description:
  //       "We're all got that feeling. We're all have that sad days .Hi mister CZ!",
  //     tags: [],
  //     genres: [],
  //     attributes: [
  //       {
  //         key: "Character",
  //         value: "Pepe",
  //       },
  //       {
  //         key: "Feeling",
  //         value: "Sadness",
  //       },
  //     ],
  //     content: [
  //       {
  //         "@type": "IMAGE",
  //         url: "https://lh3.googleusercontent.com/BvDHeyXc0i987WIHDL9fc1ZYi-5RWGugNwdX0knavkpeFsHFlrycZVBuBq-jmuGyozN_EvttpMehc3BBk9y9cqEOxkoXCsKA5e_r9WU",
  //         representation: "ORIGINAL",
  //         mimeType: "image/png",
  //         size: 19595,
  //         width: 500,
  //         height: 450,
  //       },
  //     ],
  //     restrictions: [],
  //   },
  //   deleted: false,
  //   originOrders: [],
  //   ammOrders: {
  //     ids: [],
  //   },
  //   auctions: [],
  //   totalStock: "0",
  //   sellers: 0,
  // };

  const buttonHandler = async () => {
    const contract = await ERC721Rent__factory.connect(
      "0xa5a47bF5273dD40679C213C8A8939c5133A85635",
      ethProvider.getSigner()
    );

    // allow rent nft
    // const transaction = await contract.allowRent(
    //   "0xC7E1ae0dA2fD67a4192560C709A8Ed33557e435a", //nft number
    //   4, //id
    //   true,
    //   1, //price
    //   1 //collateral
    // );

    // await transaction.wait();

    // // approve rent nft
    // const trans2 = await contract.rent(
    //   "0xC7E1ae0dA2fD67a4192560C709A8Ed33557e435a",
    //   4, //tokenId
    //   1, //time for rent
    //   { value: 2 } /*totalPrice = time*(price+collateral)*/
    // );

    // // result of nft renting
    // const txRecite = await trans2.wait();
    // console.log("txRecite", txRecite);
    // const event = (txRecite.events as Event[]).find(
    //   (event) => event.event === "Transfer"
    // );
    // const args = event.args;
    // const rentTokenId = args[2]; //
    // console.log("rentTokenId", rentTokenId);

    //watch rent info
    const tokenData = await contract.getTokenData(1); // arg: rentTokenId
    console.log("tokenData", tokenData);

    // end rent method
    // const txFinalOfRent = await contract.finalizeRent(1); //arg: rentTokenId
    // await txFinalOfRent.wait();
    // console.log("txFinalOfRent", txFinalOfRent);

    // resolivng disputes after rent
    const txresolvedisput = await contract.resolveDispute(1); //arg rentTokenId
    const result = await txresolvedisput.wait();
    console.log("txresolvedisput", result);
  };

  return (
    <div className={styles.header}>
      <img src={AppLogo} alt="App Logo" />
      {accountNumber ? <UserMenu /> : <ConnectWallet />}
      {/* <button
        className="button buttonFullWidth buttonCta"
        onClick={buttonHandler}
      >
        Continue
      </button> */}
      {/* <SubmitForRent nft={nftMock} />
      <Rent nft={nftMock} />
      <StopRent nft={nftMock} /> */}
    </div>
  );
};
