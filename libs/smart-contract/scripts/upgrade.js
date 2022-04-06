const { ethers, upgrades } = require('hardhat');
require('dotenv').config();

const contractAddress = process.env.CONTRACT_ADDRESS;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());
    const ContractNextVersion = await ethers.getContractFactory('contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate');

    // Start deployment, returning a promise that resolves to a contract object
    const upgraded = await upgrades.upgradeProxy(contractAddress, ContractNextVersion);
    console.log('Contract updated at address:', upgraded.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
