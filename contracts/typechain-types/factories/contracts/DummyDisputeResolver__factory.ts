/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  DummyDisputeResolver,
  DummyDisputeResolverInterface,
} from "../../contracts/DummyDisputeResolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "bool",
        name: "returnValue",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "checkDispute",
    outputs: [
      {
        internalType: "bool",
        name: "rentIsValid",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516104213803806104218339818101604052810190610032919061008e565b806000806101000a81548160ff021916908315150217905550506100bb565b600080fd5b60008115159050919050565b61006b81610056565b811461007657600080fd5b50565b60008151905061008881610062565b92915050565b6000602082840312156100a4576100a3610051565b5b60006100b284828501610079565b91505092915050565b610357806100ca6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a5a21a2e1461003b578063dd9db4271461006b575b600080fd5b610055600480360381019061005091906101d5565b610087565b604051610062919061021d565b60405180910390f35b610085600480360381019061008091906101d5565b610105565b005b6000600115156001600084815260200190815260200160002060009054906101000a900460ff161515146100f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100e790610295565b60405180910390fd5b60008054906101000a900460ff169050919050565b600015156001600083815260200190815260200160002060009054906101000a900460ff1615151461016c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016390610301565b60405180910390fd5b600180600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600080fd5b6000819050919050565b6101b28161019f565b81146101bd57600080fd5b50565b6000813590506101cf816101a9565b92915050565b6000602082840312156101eb576101ea61019a565b5b60006101f9848285016101c0565b91505092915050565b60008115159050919050565b61021781610202565b82525050565b6000602082019050610232600083018461020e565b92915050565b600082825260208201905092915050565b7f6e6f207375636820646973707574650000000000000000000000000000000000600082015250565b600061027f600f83610238565b915061028a82610249565b602082019050919050565b600060208201905081810360008301526102ae81610272565b9050919050565b7f6469737075746520657869737473000000000000000000000000000000000000600082015250565b60006102eb600e83610238565b91506102f6826102b5565b602082019050919050565b6000602082019050818103600083015261031a816102de565b905091905056fea2646970667358221220ce1d510a7484767ea8179bfc096281223412ad2a39ce38cd25ab22ad1d2c84a564736f6c63430008090033";

type DummyDisputeResolverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyDisputeResolverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyDisputeResolver__factory extends ContractFactory {
  constructor(...args: DummyDisputeResolverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    returnValue: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DummyDisputeResolver> {
    return super.deploy(
      returnValue,
      overrides || {}
    ) as Promise<DummyDisputeResolver>;
  }
  override getDeployTransaction(
    returnValue: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(returnValue, overrides || {});
  }
  override attach(address: string): DummyDisputeResolver {
    return super.attach(address) as DummyDisputeResolver;
  }
  override connect(signer: Signer): DummyDisputeResolver__factory {
    return super.connect(signer) as DummyDisputeResolver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyDisputeResolverInterface {
    return new utils.Interface(_abi) as DummyDisputeResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyDisputeResolver {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DummyDisputeResolver;
  }
}