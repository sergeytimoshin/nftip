// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Interfaces.sol";

contract DisputeResolver is IDisputeResolver {
    function callDispute(uint256 tokenId) external {
        IERC721Rent(msg.sender).resolveDispute(tokenId, true);
    }
}