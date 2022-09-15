import { ethers } from "hardhat";

async function main() {
  const ERC721Rent = await ethers.getContractFactory("ERC721Rent");
  const rent = await ERC721Rent.deploy();

  await rent.deployed();

  console.log(rent.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
