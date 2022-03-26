const IPFS_GATEWAY = 'https://ipfs.io/ipfs';

export const getIpfsGatewayUrl = (ipfsCID: string): string => `${IPFS_GATEWAY}/${ipfsCID}`;

export const getIpfsCID = (ipfsURI: string): string => {
    if (ipfsURI.startsWith('ipfs://')) {
        const CID = ipfsURI.split('ipfs://')[1];
        return CID;
    }
    return '';
}

export const getIpfsJSON = async <T> (ipfsURI: string): Promise<T> => {
    const res = await fetch(getIpfsGatewayUrl(getIpfsCID(ipfsURI)));
    if (!res.ok) {
        throw new Error(`Failed to fetch IPFS CID: ${ipfsURI}`);
    }
    return await res.json();
}

