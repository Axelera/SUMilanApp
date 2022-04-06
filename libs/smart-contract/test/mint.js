const chai = require('chai');
const { describe, before, beforeEach, it } = require('mocha');
const { ethers, upgrades } = require('hardhat');
const { solidity } = require('ethereum-waffle');

chai.use(solidity);

const expect = chai.expect;

describe('SUMilanCertificate mint', function () {
    before(async function () {
        const [deployer, addr1, addr2] = await ethers.getSigners();
        this.deployer = deployer;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.Contract = await ethers.getContractFactory(
            'contracts/SUMilanCertificateUpgradeable.sol:SUMilanCertificate'
        );
    });
    beforeEach(async function () {
        this.contract = await upgrades.deployProxy(this.Contract, { initializer: 'initialize' });
        await this.contract.deployed();
    });
    it("Should mint the certificate and return the tokenUri", async function () {
        await (await this.contract.functions.mintCertificate(this.addr1.address, 'https://example.com/certificate1.pdf', 'incontro-41')).wait();
        
        expect(await this.contract.ownerOf(1)).to.equal(this.addr1.address);
        expect(await this.contract.tokenURI(1)).to.equal('https://example.com/certificate1.pdf');
    });
    it("Should throw error when minting the same certificate", async function () {
        await (await this.contract.functions.mintCertificate(this.addr1.address, 'https://example.com/certificate1.pdf', 'incontro-41')).wait();

        await expect(
            this.contract.functions.mintCertificate(this.addr1.address, 'https://example.com/certificate1.pdf', 'incontro-41')
        ).to.be.revertedWith('This address already has a certificate for this event');

        await expect(
            this.contract.functions.mintCertificate(this.addr2.address, 'https://example.com/certificate2.pdf', 'incontro-41')
        ).to.not.be.reverted;

        await expect(
            this.contract.functions.mintCertificate(this.addr1.address, 'https://example.com/certificate1.pdf', 'incontro-42')
        ).to.not.be.reverted;
    });
});