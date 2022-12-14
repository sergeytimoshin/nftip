/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  DisputeResolver,
  DisputeResolverInterface,
} from "../../contracts/DisputeResolver";

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

const _bytecode =
  "0x608060405234801561001057600080fd5b506101ae806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063dd9db42714610030575b600080fd5b61004a600480360381019061004591906100f8565b61004c565b005b3373ffffffffffffffffffffffffffffffffffffffff166334b25ee28260016040518363ffffffff1660e01b815260040161008892919061014f565b600060405180830381600087803b1580156100a257600080fd5b505af11580156100b6573d6000803e3d6000fd5b5050505050565b600080fd5b6000819050919050565b6100d5816100c2565b81146100e057600080fd5b50565b6000813590506100f2816100cc565b92915050565b60006020828403121561010e5761010d6100bd565b5b600061011c848285016100e3565b91505092915050565b61012e816100c2565b82525050565b60008115159050919050565b61014981610134565b82525050565b60006040820190506101646000830185610125565b6101716020830184610140565b939250505056fea2646970667358221220a177f8392fe89990d865472cb6c4ab6d9412d901cbe9fdfb0fe9c3b17a160fd664736f6c63430008090033";

type DisputeResolverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DisputeResolverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DisputeResolver__factory extends ContractFactory {
  constructor(...args: DisputeResolverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DisputeResolver> {
    return super.deploy(overrides || {}) as Promise<DisputeResolver>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DisputeResolver {
    return super.attach(address) as DisputeResolver;
  }
  override connect(signer: Signer): DisputeResolver__factory {
    return super.connect(signer) as DisputeResolver__factory;
  }

  static readonly bytecode = _bytecode;
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
