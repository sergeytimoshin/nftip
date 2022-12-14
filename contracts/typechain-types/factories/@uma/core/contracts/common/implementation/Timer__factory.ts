/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  Timer,
  TimerInterface,
} from "../../../../../../@uma/core/contracts/common/implementation/Timer";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getCurrentTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "setCurrentTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5042600081905550610150806100276000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806322f8e5661461003b57806329cb924d14610057575b600080fd5b610055600480360381019061005091906100c3565b610075565b005b61005f61007f565b60405161006c91906100ff565b60405180910390f35b8060008190555050565b60008054905090565b600080fd5b6000819050919050565b6100a08161008d565b81146100ab57600080fd5b50565b6000813590506100bd81610097565b92915050565b6000602082840312156100d9576100d8610088565b5b60006100e7848285016100ae565b91505092915050565b6100f98161008d565b82525050565b600060208201905061011460008301846100f0565b9291505056fea2646970667358221220074aa9cfa3e46c7310b348ab0e68e7f06feab0e4fde8cb98610866fdcb9d27aa64736f6c63430008090033";

type TimerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TimerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Timer__factory extends ContractFactory {
  constructor(...args: TimerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Timer> {
    return super.deploy(overrides || {}) as Promise<Timer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Timer {
    return super.attach(address) as Timer;
  }
  override connect(signer: Signer): Timer__factory {
    return super.connect(signer) as Timer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimerInterface {
    return new utils.Interface(_abi) as TimerInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Timer {
    return new Contract(address, _abi, signerOrProvider) as Timer;
  }
}
