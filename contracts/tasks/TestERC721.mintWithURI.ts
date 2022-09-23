import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import { types } from "hardhat/config";

import { TestERC721__factory } from "../typechain-types";

export async function action(taskArgs: any, hre: HardhatRuntimeEnvironment ) {
    const { deployments, ethers } = hre;

    const contractAddress = (await deployments.get("TestERC721")).address;
    const [ signer ] = (await ethers.getSigners());

    const contract = await TestERC721__factory.connect(contractAddress, signer);
    const tx = await contract.mintWithURI(signer.address, taskArgs.uri);
    let rc = await tx.wait();
    const event = rc?.events?.find(event => event.event === 'Transfer');
    const args = event?.args;
    const tokenId = args?.[2];
    
    console.log(`Minted token with ID: ${tokenId} and URI: ${taskArgs.uri} to ${signer.address}`)
}


task("TestERC721.mintWithURI", "A sample task with params")
  .addParam("uri", "token URI", undefined, types.string, false)
  .setAction(action);
