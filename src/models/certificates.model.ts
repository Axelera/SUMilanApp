export interface NFTCertificateModel {
    // from https://eips.ethereum.org/EIPS/eip-721 standard
    name: string;
    description: string;
    image: string;  // IPFS URI: ipfs://Qm...
}

export interface NFTCertificateExtendedModel extends NFTCertificateModel {
    tokenId: string;
    tokenURI: string;   // IPFS URI: ipfs://Qm...
    ownerAddress: string;
    txHash?: string;
}

export interface ContractDataModel {
    name: string;
    address: string;
    symbol: string;
    totalSupply: number;
};