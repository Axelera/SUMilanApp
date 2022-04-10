// from: https://blog.logrocket.com/how-to-create-nfts-with-javascript/
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import contract from '../assets/SUMilanCertificate.json';

const ALCHEMY_API_URL = process.env['ALCHEMY_API_URL'];
const CONTRACT_ADDRESS = process.env['CONTRACT_ADDRESS'];
const METAMASK_PUBLIC_KEY = process.env['METAMASK_PUBLIC_KEY'];
const METAMASK_PRIVATE_KEY = process.env['METAMASK_PRIVATE_KEY'];

const alchemyWeb3 = createAlchemyWeb3(ALCHEMY_API_URL);

const nftContract = new alchemyWeb3.eth.Contract(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract.abi as any,
  CONTRACT_ADDRESS
);

export const checkIfCanMint = async (
  to: string,
  tokenURI: string,
  eventIdentifier: string
) => {
  const gas = await nftContract.methods
    .mintCertificate(to, tokenURI, eventIdentifier)
    .estimateGas({
      from: METAMASK_PUBLIC_KEY,
    });
  console.log('Gas:', gas);
  return gas;
};

export const mintNFT = async (
  to: string,
  tokenURI: string,
  eventIdentifier: string
): Promise<string> => {
  // get the nonce - nonce is needed for security reasons. It keeps track of the number of
  // transactions sent from our address and prevents replay attacks.
  const nonce = await alchemyWeb3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    'latest'
  );
  const tx = {
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: CONTRACT_ADDRESS, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
      .mintCertificate(to, tokenURI, eventIdentifier)
      .encodeABI(), // call the mintCertificate function from our SUMilanCertificateUpgradeable.sol file
  };
  const signedTx = await alchemyWeb3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  );

  return new Promise((resolve, reject) => {
    if (signedTx) {
      try {
        alchemyWeb3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log('The hash of our transaction is: ', hash);
              resolve(hash);
            } else {
              console.log(
                'Something went wrong when submitting our transaction:',
                err
              );
              reject(err);
            }
          }
        );
      } catch (err) {
        console.log('The transaction cannot be completed');
      }
    } else {
      console.log('Something went wrong when signing our transaction');
      reject(new Error('Something went wrong when signing our transaction'));
    }
  });
};

export const getTokenURI = (tokenId) => {
  return new Promise((resolve, reject) => {
    nftContract.methods
      .tokenURI(tokenId)
      .call()
      .then((tokenURI) => {
        console.log('Token URI:', tokenURI);
        resolve(tokenURI);
      })
      .catch((err) => {
        console.log('Error retrieving tokenURI');
        reject(err);
      });
  });
};
