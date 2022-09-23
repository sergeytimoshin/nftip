import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import { types } from "hardhat/config";

import { TestERC721__factory } from "../typechain-types";

export async function action(taskArgs: any, hre: HardhatRuntimeEnvironment ) {
    const { deployments, ethers } = hre;

    const contractAddress = (await deployments.get("TestERC721")).address;
    const [ signer ] = (await ethers.getSigners());

    const contract = await TestERC721__factory.connect(contractAddress, signer);
    const tx = await contract.listTokens();
    
    console.log(tx);
}


task("TestERC721.listTokens", "A sample task with params")
  .setAction(action);
