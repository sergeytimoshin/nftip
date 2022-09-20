
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { Event } from "ethers";
import { deployContractsFixture } from "./fixtures/ERC721Rent.Fixture";

describe("ERC721Rent", function () {
  describe("Allowing rent", function () {
    it("Should allow to rent out token that is owned", async function () {
      const [tokenContract, rentContract, disputeResolverContract, tokenId]  = await deployContractsFixture();
      
      let tx = await rentContract.allowRent(tokenContract.address, tokenId, true, 123, 456);
      await tx.wait();
      const rentConditions = await rentContract.getRentConditions(tokenContract.address, tokenId);
      expect((rentConditions.allowed)).to.equal(true);
    });
  });

  describe("Renting a token", function () {
    it("Should allow to rent a token and finalize the rent after time has passed", async function () {
      const [tokenContract, rentContract, disputeResolverContract, tokenIds]  = await deployContractsFixture();
      const [owner, otherAccount] = await ethers.getSigners();

      const rentPrice = 123;
      const collateralPrice = 12;
      let tx = await rentContract.allowRent(tokenContract.address, tokenIds, true, rentPrice, collateralPrice);
      await tx.wait();

      let rentContractForOtherAccount = rentContract.connect(otherAccount);
      
      // Rent a token (mint a new token with metadata refeencing the original)
      const rentDuration = 456;
      const totalPrice = rentDuration * (rentPrice + collateralPrice);
      let rentTx = await rentContractForOtherAccount.rent(tokenContract.address, tokenIds, rentDuration, {value: totalPrice});
      let rc = await rentTx.wait();
      
      // Extract new token ID from transaction
      const event = (rc.events as Event[]).find(event => event.event === 'Transfer');
      assert(event !== undefined);
      const args = event.args
      assert(args !== undefined);
      const rentTokenId = args[2]; 

      // Check that given rent is not finished
      let rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      expect(rentData.status).to.equal(1); // STARTED

      // Wait for rent time to pass by simulating a new block with handcrafted timestamp
      await ethers.provider.send("evm_mine", [(rentData.endTs.toNumber() + 1)]);


      // Finalize the rent using Owner's account
      let finalizeRentTx = await rentContract.finalizeRent(rentTokenId);
      await finalizeRentTx.wait();
      
    
      // Check that rent is finished
      rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      expect(rentData.status).to.equal(2); // FINISHED
    });

    it("Should resolve the dispute and return the collateral to the renter", async function () {
      const [tokenContract, rentContract, disputeResolverContract, tokenIds]  = await deployContractsFixture();
      const [owner, otherAccount] = await ethers.getSigners();

      const rentPrice = 123;
      const collateralPrice = 100;
      let tx = await rentContract.allowRent(tokenContract.address, tokenIds, true, rentPrice, collateralPrice);
      await tx.wait();

      let rentContractForOtherAccount = rentContract.connect(otherAccount);
      
      // Rent a token (mint a new token with metadata refeencing the original)
      const rentDuration = 10;
      const totalPrice = rentDuration * (rentPrice + collateralPrice);
      let rentTx = await rentContractForOtherAccount.rent(tokenContract.address, tokenIds, rentDuration, {value: totalPrice});
      let rc = await rentTx.wait();
      
      // Extract new token ID from transaction
      const event = (rc.events as Event[]).find(event => event.event === 'Transfer');
      assert(event !== undefined);
      const args = event.args
      assert(args !== undefined);
      const rentTokenId = args[2]; 

      // Check that given rent is not finished
      let rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      expect(rentData.status).to.equal(1); // STARTED

      // Wait for rent time to pass by simulating a new block with handcrafted timestamp
      await ethers.provider.send("evm_mine", [(rentData.endTs.toNumber() + 1)]);


      // Finalize the rent using Owner's account
      let finalizeRentTx = await rentContract.finalizeRent(rentTokenId);
      await finalizeRentTx.wait();
      
    
      // Check that rent is finished
      rentData = await rentContractForOtherAccount.getTokenData(rentTokenId);
      expect(rentData.status).to.equal(2); // FINISHED
      
      // Resolve the dispute
      await rentContractForOtherAccount.resolveDispute(rentTokenId);

      // Check the balance of the renter
      const balance = await rentContractForOtherAccount.getBalance();
      expect(balance).to.equal(rentDuration * collateralPrice);
      const balancePrioirToWithdrawal = await otherAccount.getBalance();        
      const withdrawTx = await rentContractForOtherAccount.withdraw();
      const withdrawTxReceipt = await withdrawTx.wait();
      const balanceAfterWithdrawal = await otherAccount.getBalance();        
      const txCost = withdrawTxReceipt.gasUsed.mul(withdrawTxReceipt.effectiveGasPrice);

      expect(balanceAfterWithdrawal.add(txCost).sub(collateralPrice * rentDuration)).to.equal(balancePrioirToWithdrawal);
    });
  });
});
