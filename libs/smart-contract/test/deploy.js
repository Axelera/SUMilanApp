/* eslint-disable no-undef */

const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');

describe('SUMilanCertificate deploy', function () {
    before(async function () {
        const [deployer, addr1] = await ethers.getSigners();
        console.log(deployer, addr1);
        this.deployer = deployer;
        this.addr1 = addr1;
        this.Contract = await ethers.getContractFactory(
            'contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate'
        );
    });
    beforeEach(async function () {
        this.contract = await upgrades.deployProxy(this.Contract, { initializer: 'initialize' });
        await this.contract.deployed();
    });
    it("Should return the contract owner's address", async function () {
        console.log(this.deployer.address, this.addr1.address);

        expect(await this.contract.owner()).to.equal(this.deployer.address);
        expect(await this.contract.owner()).to.not.equal(this.addr1.address);
    });
});
