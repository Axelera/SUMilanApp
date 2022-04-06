const { writeFileSync } = require('fs');
const { artifacts } = require('hardhat');

const copyAbiToApi = () => {
    const { abi } = artifacts.readArtifactSync('contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate');
    writeFileSync('../../dist/apps/sc-api/assets/SUMilanCertificate.json', JSON.stringify(abi));
};

copyAbiToApi();
