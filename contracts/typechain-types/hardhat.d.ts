/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Testable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Testable__factory>;
    getContractFactory(
      name: "Timer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Timer__factory>;
    getContractFactory(
      name: "FinderInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FinderInterface__factory>;
    getContractFactory(
      name: "OptimisticOracleV2Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OptimisticOracleV2Interface__factory>;
    getContractFactory(
      name: "DummyDisputeResolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DummyDisputeResolver__factory>;
    getContractFactory(
      name: "ERC721Rent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Rent__factory>;
    getContractFactory(
      name: "IDisputeResolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDisputeResolver__factory>;
    getContractFactory(
      name: "IERC721Rent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Rent__factory>;
    getContractFactory(
      name: "TestERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC721__factory>;
    getContractFactory(
      name: "UMADisputeResolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UMADisputeResolver__factory>;

    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "Testable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Testable>;
    getContractAt(
      name: "Timer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Timer>;
    getContractAt(
      name: "FinderInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FinderInterface>;
    getContractAt(
      name: "OptimisticOracleV2Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OptimisticOracleV2Interface>;
    getContractAt(
      name: "DummyDisputeResolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DummyDisputeResolver>;
    getContractAt(
      name: "ERC721Rent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Rent>;
    getContractAt(
      name: "IDisputeResolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDisputeResolver>;
    getContractAt(
      name: "IERC721Rent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Rent>;
    getContractAt(
      name: "TestERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC721>;
    getContractAt(
      name: "UMADisputeResolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UMADisputeResolver>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
