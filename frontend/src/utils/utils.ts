import { ethers } from "ethers";

export const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
