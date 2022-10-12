import { MockContract } from '@ethereum-waffle/mock-contract';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Lending } from "../../typechain-types";

declare module "mocha" {
    export interface Context {
        signers: Signers;
        mocks: Mocks;
        lending: Lending;
    }
}

export interface Signers {
    deployer: SignerWithAddress;
    alice: SignerWithAddress;
    bob: SignerWithAddress;
}

export interface Mocks {
    mockUsdc: MockContract;
}