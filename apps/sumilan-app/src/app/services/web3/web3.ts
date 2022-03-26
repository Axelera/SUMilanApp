// @ts-ignore
import Web3 from "web3/dist/web3.min"; // import compiled library to avoid webpack conflicts (https://stackoverflow.com/a/69433597/5094892)

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

web3.eth.defaultChain = 'ropsten';

export default web3;