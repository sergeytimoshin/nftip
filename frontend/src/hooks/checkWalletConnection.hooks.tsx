import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { setUserAccountNumber } from "../modules/user.slice";
import { ethProvider } from "../utils/utils";

export const useWalletIsConnected = (accountNumber) => {
  const [loading, setLoading] = useState("false");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBookList() {
      try {
        setLoading("true");

        const { ethereum } = window;

        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log(
            "We have the ethereum object",
            ethers.providers.Web3Provider
          );
        }

        const accounts = await ethProvider.send("eth_accounts", []);

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          dispatch(setUserAccountNumber(account));
        } else {
          console.log("No authorized account found");
        }
      } catch (error) {
        setLoading("null");
      }
    }

    fetchBookList();
  }, [accountNumber]);

  return [loading];
};
