// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@uma/core/contracts/oracle/interfaces/OptimisticOracleV2Interface.sol";
import "@uma/core/contracts/common/implementation/Testable.sol";

import "./Interfaces.sol";

contract UMADisputeResolver is Testable, IDisputeResolver {
    
    event DisputeStarted(uint256 tokenId);

    // Finder for UMA contracts.
    FinderInterface finder;

    bytes32 public priceIdentifier = "YES_OR_NO_QUERY";

    IERC20 collateralCurrency;

    mapping (uint256 => uint256) timestamps;

    constructor(IERC20 _collateralCurrency, FinderInterface _finder, address _timerAddress)  Testable(_timerAddress) {
        collateralCurrency = _collateralCurrency;
        finder = _finder;
    }

    function callDispute(uint256 tokenId) public {
        require(timestamps[tokenId] == 0x0, "There is an ongoing dispute");
        OptimisticOracleV2Interface oracle = _getOptimisticOracle();
        uint256 requestedTime = getCurrentTime();
        timestamps[tokenId] = requestedTime;
        oracle.requestPrice(priceIdentifier, requestedTime, "OK?", collateralCurrency, 0);
        oracle.setCustomLiveness(priceIdentifier, requestedTime, "OK?", 60);

        emit DisputeStarted(tokenId);
    }

    function checkDispute(uint256 tokenId) public returns (bool rentIsValid) {
        OptimisticOracleV2Interface oracle = _getOptimisticOracle();
        uint256 timestamp = timestamps[tokenId];
        
        require(
            oracle.hasPrice(address(this), priceIdentifier, timestamp, "OK?"),
            "Unresolved dispute"
        );

        int256 oraclePrice = oracle.settleAndGetPrice(priceIdentifier, timestamp, "OK?");

        if (oraclePrice < 0) {
            oraclePrice = 0;
        }

        timestamps[tokenId] = 0;
        return oraclePrice == 1;
    }

    function _getOptimisticOracle() internal view returns (OptimisticOracleV2Interface) {
        return OptimisticOracleV2Interface(finder.getImplementationAddress("OptimisticOracleV2"));
    }
}
