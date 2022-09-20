// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Interfaces.sol";

contract DummyDisputeResolver is IDisputeResolver {
    
    bool private _returnValue;

    mapping(uint256 => bool) _disputes;

    constructor(bool returnValue) {
        _returnValue = returnValue;
    }

    function callDispute(uint256 tokenId) external {
        require(_disputes[tokenId] == false, "dispute exists");
        _disputes[tokenId] = true;
    }

    function checkDispute(uint256 tokenId) public returns (bool rentIsValid) {
        require(_disputes[tokenId] == true, "no such dispute");
        return _returnValue;
    }
}