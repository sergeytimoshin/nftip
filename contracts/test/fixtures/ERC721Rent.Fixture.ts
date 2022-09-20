import { ethers } from "hardhat";

export const deployContractsFixture = async function() {
    const [owner, _] = await ethers.getSigners();

    const TestERC721 = await ethers.getContractFactory("TestERC721");
    const contract = await TestERC721.deploy();
    let tx = await contract.mint(owner.address);
    let rc = await tx.wait();
    const event = rc?.events?.find(event => event.event === 'Transfer');
    const args = event?.args;
    const tokenId = args?.[2]; 

    const DisputeResolver = await ethers.getContractFactory("DummyDisputeResolver");
    const disputeResolverContract = await DisputeResolver.deploy(true);


    const ERC721Rent = await ethers.getContractFactory("ERC721Rent");
    const rentContract = await ERC721Rent.deploy(disputeResolverContract.address);

    return [contract, rentContract, disputeResolverContract, tokenId];
}
