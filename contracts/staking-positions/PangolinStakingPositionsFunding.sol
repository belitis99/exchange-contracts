// SPDX-License-Identifier: GPLv3
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GenericErrors.sol";

/**
 * @title Pangolin Staking Positions Funding
 * @author Shung for Pangolin
 * @notice A contract that is only the rewards part of `StakingRewards`.
 * @dev The inheriting contract must call `_claim()` to check its reward since the last time the
 * same call was made. Then, based on the reward amount, the inheriting contract shall determine
 * the distribution to stakers. The purpose of this architecture is to separate the logic of
 * funding from the staking and reward distribution.
 */
abstract contract PangolinStakingPositionsFunding is AccessControlEnumerable, GenericErrors {
    uint80 public rewardRate;
    uint40 public lastUpdate;
    uint40 public periodFinish;
    uint96 public totalRewardAdded;

    uint256 public periodDuration = 1 days;

    uint256 private constant MIN_PERIOD_DURATION = 2**16 + 1;
    uint256 private constant MAX_PERIOD_DURATION = 2**32;
    uint256 private constant MAX_TOTAL_REWARD = type(uint96).max;

    bytes32 private constant FUNDER_ROLE = keccak256("FUNDER_ROLE");

    IERC20 public immutable rewardsToken;

    event PeriodEnded();
    event RewardAdded(uint256 reward);
    event PeriodDurationUpdated(uint256 newDuration);

    /**
     * @notice Constructor to create PangolinStakingPositionsFunding contract.
     * @param newRewardsToken The token used for both for staking and reward.
     * @param newAdmin The initial owner of the contract.
     */
    constructor(address newRewardsToken, address newAdmin) {
        rewardsToken = IERC20(newRewardsToken);
        _grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
        _grantRole(FUNDER_ROLE, newAdmin);
    }

    /**
     * @notice External restricted function to change the reward period duration.
     * @param newDuration The duration the feature periods will last.
     */
    function setPeriodDuration(uint256 newDuration) external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Ensure there is no ongoing period.
        if (periodFinish > block.timestamp) revert TooEarly();

        // Ensure the new period is within the bounds.
        if (newDuration < MIN_PERIOD_DURATION) revert OutOfBounds();
        if (newDuration > MAX_PERIOD_DURATION) revert OutOfBounds();

        // Assign the new duration to the state variable, and emit the associated event.
        periodDuration = newDuration;
        emit PeriodDurationUpdated(newDuration);
    }

    /** @notice External restricted function to end the period and withdraw leftover rewards. */
    function endPeriod() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Ensure period has not already ended.
        if (block.timestamp >= periodFinish) revert TooLate();

        unchecked {
            // Get the rewards remaining to be distributed.
            uint256 leftover = (periodFinish - block.timestamp) * rewardRate;

            // Decrement totalRewardAdded by the amount to be withdrawn.
            totalRewardAdded -= uint96(leftover);

            // Update periodFinish.
            periodFinish = uint40(block.timestamp);

            // Transfer leftover tokens from the contract to the caller.
            _transferToCaller(leftover);
            emit PeriodEnded();
        }
    }

    /**
     * @notice External restricted function to fund the contract.
     * @param amount The amount of reward tokens to add to the contract.
     */
    function addReward(uint256 amount) external onlyRole(FUNDER_ROLE) {
        // For efficiency, stash the periodDuration in memory.
        uint256 tmpPeriodDuration = periodDuration;

        // Ensure amount fits 96 bits.
        if (amount > MAX_TOTAL_REWARD) revert Overflow();

        // Increment totalRewardAdded, reverting on overflow to ensure it fits 96 bits.
        totalRewardAdded += uint96(amount);

        // Update the rewardRate, ensuring leftover rewards from the ongoing period are included.
        uint256 tmpRewardRate;
        if (lastUpdate >= periodFinish) {
            tmpRewardRate = amount / tmpPeriodDuration;
        } else {
            unchecked {
                uint256 leftover = (periodFinish - lastUpdate) * rewardRate;
                tmpRewardRate = (amount + leftover) / tmpPeriodDuration;
            }
        }

        // Ensure sufficient amount is supplied hence reward rate is non-zero.
        if (tmpRewardRate == 0) revert NoEffect();

        // Assign the tmpRewardRate back to storage.
        // MAX_TOTAL_REWARD / MIN_PERIOD_DURATION fits 80 bits.
        rewardRate = uint80(tmpRewardRate);

        // Update lastUpdate and periodFinish.
        lastUpdate = uint40(block.timestamp);
        periodFinish = uint40(block.timestamp + tmpPeriodDuration);

        // Transfer reward tokens from the caller to the contract.
        _transferFromCaller(amount);
        emit RewardAdded(amount);
    }

    /**
     * @notice Internal function to get the amount of reward tokens to distribute since last call
     * to this function.
     * @return reward The amount of reward tokens that is marked for distribution.
     */
    function _claim() internal returns (uint256 reward) {
        // Get the pending reward amount since last update was last updated.
        reward = _pendingRewards();

        // Update last update time.
        lastUpdate = uint40(block.timestamp);
    }

    /**
     * @notice Internal function to transfer `rewardsToken` from the contract to caller.
     * @param amount The amount of tokens to transfer.
     */
    function _transferToCaller(uint256 amount) internal {
        if (!rewardsToken.transfer(msg.sender, amount)) revert FailedTransfer();
    }

    /**
     * @notice Internal function to transfer `rewardsToken` from caller to the contract.
     * @param amount The amount of tokens to transfer.
     */
    function _transferFromCaller(uint256 amount) internal {
        if (!rewardsToken.transferFrom(msg.sender, address(this), amount)) revert FailedTransfer();
    }

    /**
     * @notice Internal view function to get the amount of accumulated reward tokens since last
     * update time.
     * @return The amount of reward tokens that has been accumulated since last update time.
     */
    function _pendingRewards() internal view returns (uint256) {
        // For efficiency, stash periodFinish timestamp in memory.
        uint256 tmpPeriodFinish = periodFinish;

        // Get end of the reward distribution period or block timestamp, whichever is less.
        // `lastTimeRewardApplicable` is the ending timestamp of the period we are calculating
        // the total rewards for.
        uint256 lastTimeRewardApplicable = tmpPeriodFinish < block.timestamp
            ? tmpPeriodFinish
            : block.timestamp;

        // For efficiency, stash lastUpdate timestamp in memory. `lastUpdate` is the beginning
        // timestamp of the period we are calculating the total rewards for.
        uint256 tmpLastUpdate = lastUpdate;

        // If the reward period is a positive range, return the rewards by multiplying the duration
        // by reward rate.
        if (lastTimeRewardApplicable > tmpLastUpdate) {
            unchecked {
                return (lastTimeRewardApplicable - tmpLastUpdate) * rewardRate;
            }
        }

        // If the reward period is an invalid or a null range, return zero.
        return 0;
    }
}
