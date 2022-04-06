const { mintNFT, checkIfCanMint } = require('./app/mint-nft');
const { generateCertificateImg } = require('./app/img-generator');
const { getEventData } = require('./app/event-query');
const { uploadToIPFS } = require('./app/pinata-upload');
const { getNFTMetadata } = require('./app/utils');

exports.handler = async (event, context, callback) => {
  try {
    // console.log(event);
    const { recipientAddress, recipientName, eventId } = event;

    const eventData = await getEventData(eventId);
    if (eventData.error) {
      callback(new Error(`Error: ${eventData.error}`));
      return;
    }

    await checkIfCanMint(recipientAddress, 'ipfs://dummyURI', eventId);

    const certificateBuffer = await generateCertificateImg(
      recipientName,
      eventData.title,
      `Milano, ${eventData.date}`
    );
    const certificateIpfsHash = await uploadToIPFS(
      certificateBuffer,
      'certificate.png'
    );

    const nftMetadata = getNFTMetadata(
      recipientName,
      eventData.title,
      eventData.date,
      certificateIpfsHash
    );
    // console.log(nftMetadata);
    const nftMetadataIpfsHash = await uploadToIPFS(
      Buffer.from(JSON.stringify(nftMetadata)),
      'nft-metadata.json'
    );
    // console.log(`NFT metadata uploaded to IPFS: ${nftMetadataIpfsHash}`);

    const tokenUri = `ipfs://${nftMetadataIpfsHash}`;
    const txHash = await mintNFT(recipientAddress, tokenUri, eventId);
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
