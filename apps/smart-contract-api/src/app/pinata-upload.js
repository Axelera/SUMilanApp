const { Readable } = require('stream');
const pinataSDK = require('@pinata/sdk');

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log('Successfully authenticated to Pinata');
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

const uploadToIPFS = (buffer, name) => {
  return new Promise((resolve, reject) => {
    const readableStream = Readable.from(buffer);
    const options = {
      pinataOptions: {
        cidVersion: 0,
      },
    };
    readableStream.path = name;
    pinata
      .pinFileToIPFS(readableStream, options)
      .then((result) => {
        resolve(result.IpfsHash);
      })
      .catch((err) => {
        //handle error here
        console.log('Failed to upload to IPFS');
        console.log(err);
        reject(err);
      });
  });
};

module.exports.uploadToIPFS = uploadToIPFS;
