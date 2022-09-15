// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Interfaces.sol";

contract ERC721Rent is ERC721, IERC721Rent {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    // Source contract addr => Source token id => ...
    mapping(address => mapping(uint256 => RentConditions)) private _rentConditions;
    mapping(address => mapping(uint256 => uint256)) private _currentRentingToken;

    // tokenID => token data
    mapping(uint256 => Rent) private _tokenData;
    
    constructor() ERC721("ERC721Wrapper", "ECW") {}

    // allow rent for an owned token
    function allowRent(
        IERC721 erc721Contract, 
        uint256 tokenId, 
        bool allow, 
        uint256 pricePerSecond, 
        IDisputeResolver resolver
        ) external {
        // TODO: Check approval as well
        require(erc721Contract.ownerOf(tokenId) == msg.sender, "not owner");
        require(_currentRentingToken[address(erc721Contract)][tokenId] == 0, "cant change while rented");
        
        _rentConditions[address(erc721Contract)][tokenId] = RentConditions(allow, pricePerSecond, resolver);
    }

    // check if a specific token was added as rentable
    function getRentConditions(IERC721 erc721Contract, uint256 tokenId) external view returns (RentConditions memory) {
        return _rentConditions[address(erc721Contract)][tokenId];
    }

    // mint a token by renting out an availible token
    function rent(IERC721 erc721Contract, uint256 tokenId, uint256 duration) external payable returns (uint256) {
        // FIX: check if owner gave permission to rent
        // require(erc721Contract.ownerOf(tokenId) == msg.sender, "not owner");
        
        RentConditions storage rentConditions = _rentConditions[address(erc721Contract)][tokenId];

        require(rentConditions.allowed == true, "cant rent this token");
        require(_currentRentingToken[address(erc721Contract)][tokenId] == 0, "already rented");
        uint256 price = duration * rentConditions.pricePerSecond;
        require(msg.value >= price, "msg.value too low");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        // update state
        Rent memory current = Rent(
            block.timestamp,             // startTs
            block.timestamp + duration,  // endTs
            address(erc721Contract),     // sourceERC721Contract 
            tokenId, 
            false,                       // withdrawn
            price, 
            RentStatus.STARTED);

        _currentRentingToken[address(erc721Contract)][tokenId] = newItemId;
        _tokenData[newItemId] = current;

        // Handle balance change
        // ...


        // Mint token
        _mint(msg.sender, tokenId);

        return newItemId;
    }

    // get metadata associated with a token
    function getTokenData(uint256 tokenId) external view returns (Rent memory) {
        return _tokenData[tokenId];
    }

    // commit rent and allow eth to be withdrawn by owner
    function finalizeRent(uint256 tokenId) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "does not exist");
        require(tokenData.status == RentStatus.STARTED, "already finished");
        address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);
        require(tokenOwner == msg.sender, "not owner");

        tokenData.status = RentStatus.FINISHED;
        _currentRentingToken[tokenData.sourceERC721Contract][tokenData.sourceTokenId] = 0;
    }
    
    function callDispute(uint256 tokenId) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "does not exist");
        require(tokenData.status == RentStatus.STARTED, "already finished");
        address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);
        require(tokenOwner == msg.sender, "not owner");

        tokenData.status = RentStatus.DISPUTE;
        _currentRentingToken[tokenData.sourceERC721Contract][tokenData.sourceTokenId] = 0;
        _rentConditions[tokenData.sourceERC721Contract][tokenData.sourceTokenId].resolver.callDispute(tokenId);
    }

    function resolveDispute(uint256 tokenId, bool ok) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "does not exist");
        require(tokenData.status == RentStatus.DISPUTE, "not in dispute");

        require(msg.sender == address(_rentConditions[tokenData.sourceERC721Contract][tokenData.sourceTokenId].resolver), "only resolver can resolve");

        if (ok) {
            tokenData.status = RentStatus.FINISHED;
        } else {
            tokenData.status = RentStatus.CANCELED;
            _burn(tokenId); // should token be burnt or status change is enough?
        }
    }

    function withdrawRent(uint256 tokenId) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "does not exist");
        require(tokenData.status == RentStatus.FINISHED, "not finished");
        address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);
        require(tokenOwner == msg.sender, "not owner");
        require(tokenData.withdrawn == false, "already withdrawn");

        tokenData.withdrawn = true;
        bool sent =  payable(msg.sender).send(tokenData.price);
        require(sent, "Failed to send ether");
    }
}
