import { ethers, deployments } from "hardhat";
import { TestERC721__factory } from "../typechain-types";

export async function main() {
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

/*
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
*/