import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

import { ERC721Rent__factory } from "../typechain-types";
import { config } from "hardhat";

export async function action(taskArgs: any, hre: HardhatRuntimeEnvironment ) {
  const { deployments, ethers } = hre;
  
  const testERC721ContractAddress = (await deployments.get("TestERC721")).address;
  const [ signer ] = (await ethers.getSigners());

  const contractAddress = (await deployments.get("ERC721Rent")).address;
  const contract = await ERC721Rent__factory.connect(contractAddress, signer);
  console
  const tx = await contract.allowRent(testERC721ContractAddress, taskArgs.token, taskArgs.allow, taskArgs.price, taskArgs.collateral);
  const rc = await tx.wait();
  console.log(`ERC721Rent.allowRent called. tx: ${rc.transactionHash}`)
}


task("ERC721Rent.allowRent", "A sample task with params")
  .addParam("allow", "Whether to allow rent for given NFT", undefined, types.boolean, false)
  .addParam("token", "NFT Token ID in given erc721 contract", undefined, types.int, false)
  .addParam("price", "Rent price per second", 1, types.int, true)
  .addParam("collateral", "Rent collateral per second", 1, types.int, true)
  .setAction(action);
