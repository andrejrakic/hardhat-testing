import { waffle } from "hardhat";
import { unitLendingFixture } from "../shared/fixtures";
import { Mocks, Signers } from "../shared/types";
import { shouldDeposit } from "./Lending/LendingShouldDeposit.spec";

describe(`Unit tests`, async () => {
  before(async function () {
    const wallets = waffle.provider.getWallets();

    this.signers = {} as Signers;
    this.signers.deployer = wallets[0];
    this.signers.alice = wallets[1];
    this.signers.bob = wallets[2];

    this.loadFixture = waffle.createFixtureLoader(wallets);
  });

  describe(`Lending`, async () => {
    beforeEach(async function () {
      const { lending, mockUsdc } = await this.loadFixture(unitLendingFixture);

      this.lending = lending;

      this.mocks = {} as Mocks;
      this.mocks.mockUsdc = mockUsdc;
    });

    shouldDeposit();
  });
});
