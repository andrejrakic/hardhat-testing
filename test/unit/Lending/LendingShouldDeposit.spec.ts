import { expect, assert } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

export const shouldDeposit = (): void => {
  //   // to silent warning for duplicate definition of Transfer event
  //   ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

  context(`#deposit`, async function () {
    it(`should revert if the token amount is not greater than zero`, async function () {
      const amount: BigNumber = ethers.constants.Zero;

      await expect(
        this.lending
          .connect(this.signers.alice)
          .deposit(this.mocks.mockUsdc.address, amount)
      ).to.be.revertedWith(`NeedsMoreThanZero`);
    });

    it(`should emit proper event`, async function () {
      const amount: BigNumber = parseEther(`1`);

      await expect(
        this.lending
          .connect(this.signers.alice)
          .deposit(this.mocks.mockUsdc.address, amount)
      ).to.emit(this.lending, `Deposit`);
    });

    it(`should update storage variable`, async function () {
      const amount: BigNumber = parseEther(`1`);
      const previousAccountToTokenDeposits: BigNumber =
        await this.lending.s_accountToTokenDeposits(
          this.signers.alice.address,
          this.mocks.mockUsdc.address
        );

      await this.lending
        .connect(this.signers.alice)
        .deposit(this.mocks.mockUsdc.address, amount);

      const newAccountToTokenDeposits: BigNumber =
        await this.lending.s_accountToTokenDeposits(
          this.signers.alice.address,
          this.mocks.mockUsdc.address
        );

      assert(
        newAccountToTokenDeposits.toBigInt() ===
          previousAccountToTokenDeposits.add(amount).toBigInt(),
        `New value should equal previous value plus amount`
      );
    });

    it(`should emit transfer failed event`, async function () {
      await this.mocks.mockUsdc.mock.transferFrom.returns(false);

      const amount: BigNumber = parseEther(`1`);

      await expect(
        this.lending
          .connect(this.signers.alice)
          .deposit(this.mocks.mockUsdc.address, amount)
      ).to.be.revertedWith(`TransferFailed`);
    });
  });
};
