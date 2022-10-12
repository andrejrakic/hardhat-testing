# Hardhat Testing Template

- [Chainlink Spring 2022 Hackathon Project](https://github.com/andrejrakic/hardhat-testing/tree/chainlink-spring22-hackathon)
- [Chainlink Fall 2022 Hackathon Project](https://github.com/andrejrakic/hardhat-testing/tree/chainlink-fall22-hackathon)

## Getting started

Clone the repo:

```bash
git clone https://github.com/andrejrakic/hardhat-testing/
cd hardhat-testing
```

Then:

```
npm install
```

The recommendation is to use npm 7 or later. If you are using an older version of npm, you'll also need to install all the packages used by the toolbox.

```
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
```

That's also the case if you are using yarn.

```
yarn add --dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
