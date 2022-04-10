import { format } from 'date-fns';

import { getEventData } from './app/database';
import { generateCertificateImg } from './app/img-generator';
import { checkIfCanMint, mintNFT } from './app/mint-nft';
import { uploadToIPFS } from './app/pinata-upload';
import { getNFTMetadata } from './app/utils';

export const handler = async (event, context, callback) => {
  try {
    const { recipientAddress, recipientName, eventIdentifier } = event;

    const eventData = await getEventData(eventIdentifier);
    const eventDate = format(new Date(eventData.start_timestamp), 'dd/MM/yyyy');

    await checkIfCanMint(recipientAddress, 'ipfs://dummyURI', eventIdentifier);

    const certificateBuffer = await generateCertificateImg(
      recipientName,
      eventData.event_title,
      `Milano, ${eventDate}`
    );
    const certificateIpfsHash = await uploadToIPFS(
      certificateBuffer,
      'certificate.png'
    );

    const nftMetadata = getNFTMetadata(
      recipientName,
      eventData.event_title,
      eventDate,
      certificateIpfsHash
    );
    // console.log(nftMetadata);
    const nftMetadataIpfsHash = await uploadToIPFS(
      Buffer.from(JSON.stringify(nftMetadata)),
      'nft-metadata.json'
    );
    // console.log(`NFT metadata uploaded to IPFS: ${nftMetadataIpfsHash}`);

    const tokenUri = `ipfs://${nftMetadataIpfsHash}`;
    const txHash = await mintNFT(recipientAddress, tokenUri, eventIdentifier);
    return {
      statusCode: 200,
      body: JSON.stringify({
        transactionHash: txHash,
      }),
    };
    // used for tests
    // response.set(200).send({
    //     transactionHash: '0xfeb3756f864e095a5e8c5c22ccb01917e1ecd721417820f466e4296d9835a7ed',
    // });
  } catch (error) {
    console.error(error);
    callback(new Error(`InternalError: ${error.message}`));
    return;
  }
};
