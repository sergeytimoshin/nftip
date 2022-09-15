import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("TestERC721", function () {
  async function deployTestERC721Fixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const TestERC721 = await ethers.getContractFactory("TestERC721");
    const contract = await TestERC721.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Minting", function () {
    it("Should mint", async function () {
      const { contract, owner, otherAccount } = await loadFixture(deployTestERC721Fixture);
      let tx = await contract.mint(owner.address);
      let rc = await tx.wait();
      if (rc.events === undefined) assert(false);
      const transferEvent = rc.events.find(event => event.event === 'Transfer');
      if (transferEvent === undefined) assert(false);
      const args = transferEvent.args;
      if (args === undefined) assert(false);
      const tokenId = args[2]; 
      console.log("ID", tokenId);
      expect(tokenId).to.equal(1);
      expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    });
  });
});
