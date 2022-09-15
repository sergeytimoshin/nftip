import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { Event } from "ethers";

describe("ERC721Rent", function () {
  async function deployContractsFixture() {
    const [owner, _] = await ethers.getSigners();

    const TestERC721 = await ethers.getContractFactory("TestERC721");
    const contract = await TestERC721.deploy();
    let tx = await contract.mint(owner.address);
    let rc = await tx.wait();
    if (rc.events === undefined) assert(false);
    const event = rc.events.find(event => event.event === 'Transfer');
    if (event === undefined) assert(false);
    const args = event.args;
    if (args === undefined) assert(false);
    const tokenId = args[2]; 

    const ERC721Rent = await ethers.getContractFactory("ERC721Rent");
    const rentContract = await ERC721Rent.deploy();

    const DisputeResolver = await ethers.getContractFactory("DisputeResolver");
    const disputeResolverContract = await DisputeResolver.deploy();


    return [contract, rentContract, disputeResolverContract, tokenId];
  }

  describe("Allowing rent", function () {
    it("Should allow to rent out token that is owned", async function () {
      const [tokenContract, rentContract, disputeResolverContract, tokenId]  = await loadFixture(deployContractsFixture);
      
      let tx = await rentContract.allowRent(tokenContract.address, tokenId, true, 123, disputeResolverContract.address);
      await tx.wait();
      const rentConditions = await rentContract.getRentConditions(tokenContract.address, tokenId);
      expect((rentConditions.allowed)).to.equal(true);
    });
  });

  describe("Renting a token", function () {
    it("Should allow to rent a token and finalize the rent after time has passed", async function () {
      const [tokenContract, rentContract, disputeResolverContract, tokenIds]  = await loadFixture(deployContractsFixture);
      const [owner, otherAccount] = await ethers.getSigners();

      const rentPrice = 123;
      let tx = await rentContract.allowRent(
        tokenContract.address, 
        tokenIds,       
        true, // allowRent
        rentPrice, 
        disputeResolverContract.address);
      await tx.wait();

      let rentContractForOtherAccount = rentContract.connect(otherAccount);
      
      // Rent a token (mint a new token with metadata refeencing the original)
      const rentDuration = 456;
      const totalPrice = rentDuration * rentPrice;
      let rentTx = await rentContractForOtherAccount.rent(
        tokenContract.address,
         tokenIds, 
         rentDuration, 
         {  value: totalPrice }
      );
      let rc = await rentTx.wait();
      
      // Extract new token ID from transaction
      const event = (rc.events as Event[]).find(event => event.event === 'Transfer');
      assert(event !== undefined);
      const args = event.args
      assert(args !== undefined);
      const rentTokenId = args[2]; 

      // Check that given rent is not finished
      let rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      console.log(rentData);
      expect(rentData.status).to.equal(1); // STARTED

      // Wait for rent time to pass by simulating a new block with handcrafted timestamp
      await ethers.provider.send("evm_mine", [(rentData.endTs.toNumber() + 1)]);

      // Finalize the rent using Owner's account
      let finalizeRentTx = await rentContract.finalizeRent(rentTokenId);
      await finalizeRentTx.wait();  
    
      // Check that rent is finished
      rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      expect(rentData.status).to.equal(2);
    });
  });
});
