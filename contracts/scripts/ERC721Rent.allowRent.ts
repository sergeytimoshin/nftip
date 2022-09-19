import { ethers, deployments } from "hardhat";
import { ERC721Rent__factory } from "../typechain-types";

async function main() {
    const testERC721ContractAddress = (await deployments.get("ERC721Rent")).address;
    const [ signer ] = (await ethers.getSigners());

    const contractAddress = (await deployments.get("ERC721Rent")).address;
    const contract = await ERC721Rent__factory.connect(contractAddress, signer);
    
    const tx = await 

    console.log(`Minted token with ID: ${tokenId} to ${signer.address}`)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
