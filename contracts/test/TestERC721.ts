import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("TestERC721", function () {

  describe("Minting", function () {
    it("Should mint", async function () {
      const [owner, otherAccount] = await ethers.getSigners();

      const TestERC721 = await ethers.getContractFactory("TestERC721");
      const contract = await TestERC721.deploy();
  
      let tx = await contract.mint(owner.address);
      let rc = await tx.wait();
      if (rc.events === undefined) assert(false);
      const event = rc.events.find(event => event.event === 'Transfer');
      if (event === undefined) assert(false);
      const args = event.args
      if (args === undefined) assert(false);
      const tokenId = args[2]; 
      expect(tokenId).to.equal(1);
      expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    });
  });
});
