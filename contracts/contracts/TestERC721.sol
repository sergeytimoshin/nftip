// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract TestERC721 is ERC721URIStorage {
    
    struct TokenData {
        uint256 id;
        string uri;
    }

    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    constructor() ERC721("Test", "TST") {}

    function mint(address to) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        return newItemId;
    }

    function mintWithURI(address to, string calldata uri) external returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        
        _mint(to, newItemId);
        _setTokenURI(newItemId, uri);

        return newItemId;
    }

    function listTokens() external view returns (TokenData[] memory) {
        uint256 count = _tokenIds.current();
        TokenData[] memory tokens = new TokenData[](count);

        for (uint i = 0; i < count; i++) {
            tokens[i] = TokenData(i, tokenURI(i));
        }
        return tokens;
    } 
}
