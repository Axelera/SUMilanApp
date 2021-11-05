import web3 from "../web3/web3";
import * as CONSTANTS from "../../constants";
import SUMilanCertificateAbi from "./SUMilanCertificateAbi.json";
import { ContractDataModel, NFTCertificateExtendedModel, NFTCertificateModel } from "../../models/certificates.model";
import * as IPFSService from "../ipfs/ipfs";

const Contract = new web3.eth.Contract(SUMilanCertificateAbi as any, CONSTANTS.CONTRACT_ADDRESS);

export const getContractData = async (): Promise<ContractDataModel> => {
    const name = await Contract.methods.name().call();
    const symbol = await Contract.methods.symbol().call();
    const totalSupply = await Contract.methods.totalSupply().call();
    return {
        name,
        address: CONSTANTS.CONTRACT_ADDRESS,
        symbol,
        totalSupply,
    };
};

export const getTokenURI = async (tokenId: string): Promise<string> => {
    return await Contract.methods.tokenURI(tokenId).call();
};

export const getBalanceOfAddress = async (address: string): Promise<number> => {
    return await Contract.methods.balanceOf(address).call();
};

export const getTokenURIsOfAddress = async (address: string): Promise<string[]> => {
    const tokenURIs: string[] = [];
    const balanceOf = await getBalanceOfAddress(address);
    for (let i = 0; i < balanceOf; i++) {
        const tokenId = await Contract.methods.tokenOfOwnerByIndex(address, i).call();
        const tokenURI = await getTokenURI(tokenId);
        tokenURIs.push(tokenURI);
    }
    return tokenURIs;
};

export const getTokenOwner = async (tokenId: string) => {
    return await Contract.methods.ownerOf(tokenId).call();
};

export const getNFTCertificate = async (tokenId: string): Promise<NFTCertificateModel> => {
    const tokenURI = await getTokenURI(tokenId);
    return await IPFSService.getIpfsJSON<NFTCertificateModel>(tokenURI);
};

export const getNFTCertificateExtended = async (tokenId: string, ownerAddress?: string): Promise<NFTCertificateExtendedModel> => {
    const tokenURI = await getTokenURI(tokenId);
    const nftCertificate = await IPFSService.getIpfsJSON<NFTCertificateModel>(tokenURI);
    return {
        ...nftCertificate,
        tokenId,
        tokenURI,
        ownerAddress: ownerAddress || await getTokenOwner(tokenId),
    };
};

export const getNFTCertificatesOfAddress = async (address: string): Promise<NFTCertificateExtendedModel[]> => {
    const nftCertificates: NFTCertificateExtendedModel[] = [];
    const balanceOf = await getBalanceOfAddress(address);
    for (let i = 0; i < balanceOf; i++) {
        const tokenId = await Contract.methods.tokenOfOwnerByIndex(address, i).call();
        const nftCertificate = await getNFTCertificateExtended(tokenId, address);
        nftCertificates.push(nftCertificate);
    }
    return nftCertificates;
};

export const getTotalSupply = async (): Promise<number> => {
    return await Contract.methods.totalSupply().call();
};

export const SUMilanCertificate = Contract;