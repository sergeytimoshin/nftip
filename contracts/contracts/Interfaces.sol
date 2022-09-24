// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721Rent {
    
    struct RentConditions {
        bool            allowed;
        uint256         pricePerSecond;
        uint256         collateralPerSecond;
        uint256         currentRentingToken;
        address         sourceERC721Contract;
        uint256         sourceTokenId;
    }

    enum RentStatus{ UNKNOWN, STARTED, FINISHED, COLLATERAL_ASSIGNED }

    struct Rent {
        uint256    startTs;
        uint256    endTs;
        address    sourceERC721Contract;
        uint256    sourceTokenId;
        uint256    price;
        uint256    collateral;
        RentStatus status;
    }

    function getTokenData(uint256 tokenId) external view returns (Rent memory);
    function getRentConditions(IERC721 erc721Contract, uint256 tokenId) external view returns (RentConditions memory);
    function listRentConditions() external view returns (RentConditions[] memory);
    
    function allowRent(IERC721 erc721Contract, uint256 tokenId, bool allow, uint256 pricePerSecond, uint256 collateralPerSecond) external;
    function rent(IERC721 erc721Contract, uint256 tokenId, uint256 duration) external payable returns (uint256);
    function finalizeRent(uint256 tokenId) external;
    function resolveDispute(uint256 tokenId) external;

    function getBalance() external view returns (uint256);
    function withdraw() external;
}

interface IDisputeResolver {
    function callDispute(uint256 tokenId) external;
    function checkDispute(uint256 tokenId) external returns (bool rentIsValid);
}

