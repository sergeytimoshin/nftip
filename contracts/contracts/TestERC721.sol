// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestERC721 is ERC721 {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    constructor() ERC721("Test", "TST") {}

    function mint(address to) external returns (uint256) {
        uint256 newItemId = _tokenIds.current() + 1;
        _safeMint(to, newItemId);
        _tokenIds.increment();
        return newItemId;
    }

    function currentTokenId() external view returns (uint256) {
        return _tokenIds.current();
    }
}
