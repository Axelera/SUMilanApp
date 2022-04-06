const { ethers, upgrades } = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());
    const Contract = await ethers.getContractFactory('contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate');

    // Start deployment, returning a promise that resolves to a contract object
    const contract = await upgrades.deployProxy(Contract, { initializer: 'initialize' });
    console.log('Contract deployed to address:', contract.address);
    await contract.deployed();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
