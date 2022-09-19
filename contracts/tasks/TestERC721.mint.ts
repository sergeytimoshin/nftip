import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

import { TestERC721__factory } from "../typechain-types";

export async function action(taskArgs: any, hre: HardhatRuntimeEnvironment ) {
    const { deployments, ethers } = hre;

    const contractAddress = (await deployments.get("TestERC721")).address;
    const [ signer ] = (await ethers.getSigners());

    const contract = await TestERC721__factory.connect(contractAddress, signer);
    const tx = await contract.mint(signer.address);
    let rc = await tx.wait();
    const event = rc?.events?.find(event => event.event === 'Transfer');
    const args = event?.args;
    const tokenId = args?.[2];
    
    console.log(`Minted token with ID: ${tokenId} to ${signer.address}`)
}


task("TestERC721.mint", "A sample task with params")
  .setAction(action);
