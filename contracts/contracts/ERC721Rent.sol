// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Interfaces.sol";

contract ERC721Rent is ERC721, IERC721Rent {
    using Counters for Counters.Counter;


    event DisputeSettled(uint256 tokenId, bool rentIsValid);

    Counters.Counter private _tokenIds;

    // Source contract addr => Source token id => ...
    mapping(address => mapping(uint256 => RentConditions)) private _rentConditions;
    mapping(address => mapping(uint256 => uint256)) private _currentRentingToken;

    // Balances availible for withdrawal
    mapping(address => uint256) private _balances;

    // tokenID => token data
    mapping(uint256 => Rent) private _tokenData;
    
    // Dispute resolver
    IDisputeResolver _resolver;

    constructor(address resolver) ERC721("ERC721Wrapper", "ECW") {
        _resolver = IDisputeResolver(resolver);
    }

    // allow rent for an owned token
    function allowRent(IERC721 erc721Contract, uint256 tokenId, bool allow, uint256 pricePerSecond, uint256 collateralPerSecond) external {
        // TODO: Check approval as well
        require(erc721Contract.ownerOf(tokenId) == msg.sender, "not owner");
        require(_currentRentingToken[address(erc721Contract)][tokenId] == 0, "cant change while rented");
        
        _rentConditions[address(erc721Contract)][tokenId] = RentConditions(allow, pricePerSecond, collateralPerSecond);
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
        uint256 collateral = duration * rentConditions.collateralPerSecond;
        require(msg.value >= price + collateral, "msg.value too low");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        // update state
        Rent memory current = Rent(block.timestamp, block.timestamp + duration, address(erc721Contract), tokenId, price, collateral, RentStatus.STARTED);
        _currentRentingToken[address(erc721Contract)][tokenId] = newItemId;
        _tokenData[newItemId] = current;

        // Mint token
        _mint(msg.sender, newItemId);

        return newItemId;
    }

    // Commit rent and allow eth to be withdrawn by owner
    function finalizeRent(uint256 tokenId) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "token does not exist");
        require(tokenData.status == RentStatus.STARTED, "already finished");
        require(block.timestamp > tokenData.endTs, "rent not finished yet");

        // anyone can finalize the rent
        // address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);
        // require(tokenOwner == msg.sender, "not owner");

        tokenData.status = RentStatus.FINISHED;
        _currentRentingToken[tokenData.sourceERC721Contract][tokenData.sourceTokenId] = 0;

        address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);

        _balances[tokenOwner] += tokenData.price;

        // start rent validity dispute
        _resolver.callDispute(tokenId);
    }

    // Designate collateral based on dispute resolution
    function resolveDispute(uint256 tokenId) external {
        Rent storage tokenData = _tokenData[tokenId];
        require(tokenData.sourceERC721Contract != address(0), "token does not exist");
        require(tokenData.status == RentStatus.FINISHED, "not in finished status");
        
        bool rentIsValid = _resolver.checkDispute(tokenId);
        if (rentIsValid) {
            address tokenRenter = ownerOf(tokenId);
            _balances[tokenRenter] += tokenData.collateral;
        } else {
            address tokenOwner = ERC721(tokenData.sourceERC721Contract).ownerOf(tokenData.sourceTokenId);
            _balances[tokenOwner] += tokenData.collateral;
        }
        emit DisputeSettled(tokenId, rentIsValid);

        tokenData.status = RentStatus.COLLATERAL_ASSIGNED;
    }

    // get metadata associated with a token
    function getTokenData(uint256 tokenId) external view returns (Rent memory) {
        return _tokenData[tokenId];
    }
    
    // check current balance
    function getBalance() external view returns (uint256) {
        return _balances[msg.sender];
    }

    // Withdraw credits
    function withdraw() external {
        require(_balances[msg.sender] > 0, "empty balance");
        uint256 balance = _balances[msg.sender];
        _balances[msg.sender] = 0;
        bool sent = payable(msg.sender).send(balance);
        require(sent, "failed to withdraw");
    }
}
