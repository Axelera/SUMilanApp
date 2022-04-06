/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('hardhat-jest-plugin');

const { ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
    solidity: '0.8.9',
    defaultNetwork: 'ropsten',
    networks: {
        hardhat: {},
        ropsten: {
            url: ALCHEMY_API_URL,
            accounts: [`0x${METAMASK_PRIVATE_KEY}`],
        },
    },
};
