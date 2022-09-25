/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  UMADisputeResolver,
  UMADisputeResolverInterface,
} from "../../contracts/UMADisputeResolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_collateralCurrency",
        type: "address",
      },
      {
        internalType: "contract FinderInterface",
        name: "_finder",
        type: "address",
      },
      {
        internalType: "address",
        name: "_timerAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "DisputeStarted",
    type: "event",
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
    inputs: [],
    name: "priceIdentifier",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
  {
    inputs: [],
    name: "timerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040527f5945535f4f525f4e4f5f515545525900000000000000000000000000000000006002553480156200003557600080fd5b50604051620010813803806200108183398181016040528101906200005b91906200021c565b80806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505062000278565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200015a826200012d565b9050919050565b60006200016e826200014d565b9050919050565b620001808162000161565b81146200018c57600080fd5b50565b600081519050620001a08162000175565b92915050565b6000620001b3826200014d565b9050919050565b620001c581620001a6565b8114620001d157600080fd5b50565b600081519050620001e581620001ba565b92915050565b620001f6816200014d565b81146200020257600080fd5b50565b6000815190506200021681620001eb565b92915050565b60008060006060848603121562000238576200023762000128565b5b600062000248868287016200018f565b93505060206200025b86828701620001d4565b92505060406200026e8682870162000205565b9150509250925092565b610df980620002886000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631c39c38d1461006757806322f8e5661461008557806329cb924d146100a157806397523661146100bf578063a5a21a2e146100dd578063dd9db4271461010d575b600080fd5b61006f610129565b60405161007c91906107d3565b60405180910390f35b61009f600480360381019061009a9190610829565b61014d565b005b6100a9610235565b6040516100b69190610865565b60405180910390f35b6100c7610336565b6040516100d49190610899565b60405180910390f35b6100f760048036038101906100f29190610829565b61033c565b60405161010491906108cf565b60405180910390f35b61012760048036038101906101229190610829565b6104f7565b005b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101a757600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166322f8e566826040518263ffffffff1660e01b81526004016102009190610865565b600060405180830381600087803b15801561021a57600080fd5b505af115801561022e573d6000803e3d6000fd5b5050505050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461032f5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166329cb924d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102f057600080fd5b505afa158015610304573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032891906108ff565b9050610333565b4290505b90565b60025481565b6000806103476106e2565b90506000600460008581526020019081526020016000205490508173ffffffffffffffffffffffffffffffffffffffff1663bc58ccaa30600254846040518463ffffffff1660e01b81526004016103a093929190610989565b60206040518083038186803b1580156103b857600080fd5b505afa1580156103cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f091906109ff565b61042f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042690610a89565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff166353b59239600254846040518363ffffffff1660e01b815260040161046e929190610aa9565b602060405180830381600087803b15801561048857600080fd5b505af115801561049c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c09190610b1b565b905060008112156104d057600090505b60006004600087815260200190815260200160002081905550600181149350505050919050565b600060046000838152602001908152602001600020541461054d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054490610b94565b60405180910390fd5b60006105576106e2565b90506000610563610235565b90508060046000858152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff166311df92f160025483600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660006040518563ffffffff1660e01b81526004016105e19493929190610c4e565b602060405180830381600087803b1580156105fb57600080fd5b505af115801561060f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063391906108ff565b508173ffffffffffffffffffffffffffffffffffffffff1663473c45fe60025483603c6040518463ffffffff1660e01b815260040161067493929190610ce1565b600060405180830381600087803b15801561068e57600080fd5b505af11580156106a2573d6000803e3d6000fd5b505050507f0715daac82f9b9aa17ddece2f059d6667b3fe54f36bcc4571221f96a00a5b5aa836040516106d59190610865565b60405180910390a1505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663aafd5e406040518163ffffffff1660e01b815260040161073d90610d51565b60206040518083038186803b15801561075557600080fd5b505afa158015610769573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078d9190610d96565b905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107bd82610792565b9050919050565b6107cd816107b2565b82525050565b60006020820190506107e860008301846107c4565b92915050565b600080fd5b6000819050919050565b610806816107f3565b811461081157600080fd5b50565b600081359050610823816107fd565b92915050565b60006020828403121561083f5761083e6107ee565b5b600061084d84828501610814565b91505092915050565b61085f816107f3565b82525050565b600060208201905061087a6000830184610856565b92915050565b6000819050919050565b61089381610880565b82525050565b60006020820190506108ae600083018461088a565b92915050565b60008115159050919050565b6108c9816108b4565b82525050565b60006020820190506108e460008301846108c0565b92915050565b6000815190506108f9816107fd565b92915050565b600060208284031215610915576109146107ee565b5b6000610923848285016108ea565b91505092915050565b600082825260208201905092915050565b7f4f4b3f0000000000000000000000000000000000000000000000000000000000600082015250565b600061097360038361092c565b915061097e8261093d565b602082019050919050565b600060808201905061099e60008301866107c4565b6109ab602083018561088a565b6109b86040830184610856565b81810360608301526109c981610966565b9050949350505050565b6109dc816108b4565b81146109e757600080fd5b50565b6000815190506109f9816109d3565b92915050565b600060208284031215610a1557610a146107ee565b5b6000610a23848285016109ea565b91505092915050565b600082825260208201905092915050565b7f556e7265736f6c76656420646973707574650000000000000000000000000000600082015250565b6000610a73601283610a2c565b9150610a7e82610a3d565b602082019050919050565b60006020820190508181036000830152610aa281610a66565b9050919050565b6000606082019050610abe600083018561088a565b610acb6020830184610856565b8181036040830152610adc81610966565b90509392505050565b6000819050919050565b610af881610ae5565b8114610b0357600080fd5b50565b600081519050610b1581610aef565b92915050565b600060208284031215610b3157610b306107ee565b5b6000610b3f84828501610b06565b91505092915050565b7f546865726520697320616e206f6e676f696e6720646973707574650000000000600082015250565b6000610b7e601b83610a2c565b9150610b8982610b48565b602082019050919050565b60006020820190508181036000830152610bad81610b71565b9050919050565b6000819050919050565b6000610bd9610bd4610bcf84610792565b610bb4565b610792565b9050919050565b6000610beb82610bbe565b9050919050565b6000610bfd82610be0565b9050919050565b610c0d81610bf2565b82525050565b6000819050919050565b6000610c38610c33610c2e84610c13565b610bb4565b6107f3565b9050919050565b610c4881610c1d565b82525050565b600060a082019050610c63600083018761088a565b610c706020830186610856565b8181036040830152610c8181610966565b9050610c906060830185610c04565b610c9d6080830184610c3f565b95945050505050565b6000819050919050565b6000610ccb610cc6610cc184610ca6565b610bb4565b6107f3565b9050919050565b610cdb81610cb0565b82525050565b6000608082019050610cf6600083018661088a565b610d036020830185610856565b8181036040830152610d1481610966565b9050610d236060830184610cd2565b949350505050565b7f4f7074696d69737469634f7261636c6556320000000000000000000000000000815250565b6000602082019050610d6560008301610d2b565b919050565b610d73816107b2565b8114610d7e57600080fd5b50565b600081519050610d9081610d6a565b92915050565b600060208284031215610dac57610dab6107ee565b5b6000610dba84828501610d81565b9150509291505056fea2646970667358221220273d480c087e9378ec56e06d8607b3efff8bdc039e5cb626eca5ea1a82a7c8d864736f6c63430008090033";

type UMADisputeResolverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UMADisputeResolverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UMADisputeResolver__factory extends ContractFactory {
  constructor(...args: UMADisputeResolverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _collateralCurrency: PromiseOrValue<string>,
    _finder: PromiseOrValue<string>,
    _timerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UMADisputeResolver> {
    return super.deploy(
      _collateralCurrency,
      _finder,
      _timerAddress,
      overrides || {}
    ) as Promise<UMADisputeResolver>;
  }
  override getDeployTransaction(
    _collateralCurrency: PromiseOrValue<string>,
    _finder: PromiseOrValue<string>,
    _timerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _collateralCurrency,
      _finder,
      _timerAddress,
      overrides || {}
    );
  }
  override attach(address: string): UMADisputeResolver {
    return super.attach(address) as UMADisputeResolver;
  }
  override connect(signer: Signer): UMADisputeResolver__factory {
    return super.connect(signer) as UMADisputeResolver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UMADisputeResolverInterface {
    return new utils.Interface(_abi) as UMADisputeResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UMADisputeResolver {
    return new Contract(address, _abi, signerOrProvider) as UMADisputeResolver;
  }
}
