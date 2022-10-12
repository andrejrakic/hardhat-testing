import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      hardfork: "merge",
      // If you want to do some forking set `enabled` to true. 
      // It is higly recommended to set forking block number, otherwise the latest one will be used each time
      // which can lead into inconsistency of tests
      forking: {
        url: process.env.MAINNET_RPC_URL || "",
        // blockNumber:
        enabled: false,
      },
      chainId: 31337,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || "",
    },
  },
};

export default config;
