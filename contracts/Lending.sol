// SPDX-License-Identifier: MIT
// This contract is not audited!!!
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import "hardhat/console.sol";

contract Lending is ReentrancyGuard {
    event Deposit(
        address indexed account,
        address indexed token,
        uint256 indexed amount
    );

    error TransferFailed();
    error NeedsMoreThanZero();

    // Account -> Token -> Amount
    mapping(address => mapping(address => uint256))
        public s_accountToTokenDeposits;

    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert NeedsMoreThanZero();
        }
        _;
    }

    function deposit(address token, uint256 amount)
        external
        nonReentrant
        moreThanZero(amount)
    {
        emit Deposit(msg.sender, token, amount);
        s_accountToTokenDeposits[msg.sender][token] += amount;
        bool success = IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        if (!success) revert TransferFailed();
    }
}
