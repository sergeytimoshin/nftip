import { ethers } from "hardhat";

async function main() {
    const target = "0xF89c468717c061E9874F2Bd2B795df782cC003Ac";
    const [ signer ] = (await ethers.getSigners());


    const contract = await ethers.getContractAt("UMADisputeResolver", target);

    let tx = await contract.callDispute(0);
    console.log(tx);
    console.log(await tx.wait())
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
