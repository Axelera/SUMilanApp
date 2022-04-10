import { Readable } from 'stream';
import pinataSDK from '@pinata/sdk';

const pinataApiKey = process.env['PINATA_API_KEY'];
const pinataSecretApiKey = process.env['PINATA_SECRET_API_KEY'];
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

pinata
  .testAuthentication()
  .then(() => {
    //handle successful authentication here
    console.log('Successfully authenticated to Pinata');
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

export const uploadToIPFS = (buffer: Buffer, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const readableStream = Readable.from(buffer);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    readableStream.path = name;
    pinata
      .pinFileToIPFS(readableStream, {
        pinataOptions: {
          cidVersion: 0,
        },
      })
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
