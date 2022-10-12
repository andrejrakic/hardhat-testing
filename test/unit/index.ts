import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, unitLendingFixture } from "../shared/fixtures";
import { Mocks, Signers } from "../shared/types";
import { shouldDeposit } from "./Lending/LendingShouldDeposit.spec";

describe(`Unit tests`, async () => {
    before(async function () {
        const { deployer, alice, bob } = await loadFixture(getSigners);

        this.signers = {} as Signers;
        this.signers.deployer = deployer;
        this.signers.alice = alice;
        this.signers.bob = bob;
    });

    describe(`Lending`, async () => {
        beforeEach(async function () {
            const { lending, mockUsdc } = await loadFixture(unitLendingFixture);

            this.lending = lending;

            this.mocks = {} as Mocks;
            this.mocks.mockUsdc = mockUsdc;
        });

        shouldDeposit();
    });
});