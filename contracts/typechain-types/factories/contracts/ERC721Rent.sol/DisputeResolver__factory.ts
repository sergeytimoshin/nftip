/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DisputeResolver,
  DisputeResolverInterface,
} from "../../../contracts/ERC721Rent.sol/DisputeResolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "callDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class DisputeResolver__factory {
  static readonly abi = _abi;
  static createInterface(): DisputeResolverInterface {
    return new utils.Interface(_abi) as DisputeResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DisputeResolver {
    return new Contract(address, _abi, signerOrProvider) as DisputeResolver;
  }
}
