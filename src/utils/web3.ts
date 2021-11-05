export const getExplorerUrl = (hash: string, type: 'address' | 'tx' | 'token') => {
    return `https://ropsten.etherscan.io/${type}/${hash}`;
}