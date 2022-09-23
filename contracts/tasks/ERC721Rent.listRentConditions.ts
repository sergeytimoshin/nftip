import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import { types } from "hardhat/config";

import { ERC721Rent__factory } from "../typechain-types";

export async function action(taskArgs: any, hre: HardhatRuntimeEnvironment ) {
    const { deployments, ethers } = hre;

    const contractAddress = (await deployments.get("ERC721Rent")).address;
    const [ signer ] = (await ethers.getSigners());

    const contract = await ERC721Rent__factory.connect(contractAddress, signer);
    const resp = await contract.listRentConditions();
    
    console.log(resp);
}


task("ERC721Rent.listRentConditions", "A sample task with params")
  .setAction(action);
