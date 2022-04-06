const { expect } = require('chai');
const { describe, before, beforeEach, it } = require('mocha');
const { ethers, upgrades } = require('hardhat');

describe('SUMilanCertificate upgrade', function () {
    before(async function () {
        const [deployer, addr1] = await ethers.getSigners();
        this.deployer = deployer;
        this.addr1 = addr1;
        this.Contract = await ethers.getContractFactory(
            'contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate'
        );
    });
    beforeEach(async function () {
        this.contract = await upgrades.deployProxy(this.Contract, { initializer: 'initialize' });
        await this.contract.deployed();
        await (await this.contract.functions.mintCertificate(this.addr1.address, 'https://example.com/certificate1.pdf', 'incontro-41')).wait();
    });
    it("Should update the contract and return the same certificate", async function () {
        const ContractV2 = await ethers.getContractFactory(
            'contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate'
        );
        const upgraded = await upgrades.upgradeProxy(this.contract.address, ContractV2);

        expect(await upgraded.owner()).to.equal(this.deployer.address);
        expect(await upgraded.ownerOf(1)).to.equal(this.addr1.address);
        expect(await upgraded.tokenURI(1)).to.equal('https://example.com/certificate1.pdf');
    });
});
