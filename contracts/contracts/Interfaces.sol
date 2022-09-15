// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721Rent {
    
    struct RentConditions {
        bool            allowed;
        uint256         pricePerSecond;
        IDisputeResolver resolver;
    }

    enum RentStatus{ UNKNOWN, STARTED, FINISHED, DISPUTE, CANCELED }

    struct Rent {
        uint256    startTs;
        uint256    endTs;
        address    sourceERC721Contract;
        uint256    sourceTokenId;
        bool       withdrawn;
        uint256    price;
        RentStatus status;
    }

    function allowRent(IERC721 erc721Contract, uint256 tokenId, bool allow, uint256 pricePerSecond, IDisputeResolver resolver) external;
    function getRentConditions(IERC721 erc721Contract, uint256 tokenId) external view returns (RentConditions memory);
    function rent(IERC721 erc721Contract, uint256 tokenId, uint256 duration) external payable returns (uint256);
    function getTokenData(uint256 tokenId) external view returns (Rent memory);
    function finalizeRent(uint256 tokenId) external;
    function callDispute(uint256 tokenId) external;
    function resolveDispute(uint256 tokenId, bool ok) external;
    function withdrawRent(uint256 tokenId) external;
}

interface IDisputeResolver {
    function callDispute(uint256 tokenId) external;
}

