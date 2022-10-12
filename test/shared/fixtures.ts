import { MockContract } from '@ethereum-waffle/mock-contract';
import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { Lending } from "../../typechain-types";
import { deployMockUsdc } from "./mocks";
import { Signers } from './types';

type UnitLendingFixtureType = {
    lending: Lending;
    mockUsdc: MockContract;
};

export async function getSigners(): Promise<Signers> {
    const [deployer, alice, bob] = await ethers.getSigners();

    return { deployer, alice, bob };
}

export async function unitLendingFixture(): Promise<UnitLendingFixtureType> {
    const { deployer } = await getSigners();

    const lendingFactory: ContractFactory = await ethers.getContractFactory(
        `Lending`
    );

    const lending: Lending = (await lendingFactory
        .connect(deployer)
        .deploy()) as Lending;

    await lending.deployed();

    const mockUsdc = await deployMockUsdc(deployer);

    return { lending, mockUsdc };
};