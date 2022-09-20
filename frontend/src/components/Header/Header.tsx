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

export const Header: FC = () => {
  const accountNumber = useSelector(userAccountNumber);
  useWalletIsConnected(accountNumber);

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
      <button
        className="button buttonFullWidth buttonCta"
        onClick={buttonHandler}
      >
        Continue
      </button>
    </div>
  );
};
