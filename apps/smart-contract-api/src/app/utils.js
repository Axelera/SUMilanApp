module.exports.getNFTMetadata = (
  recipientName,
  eventName,
  date,
  certificateIpfsHash
) => {
  return {
    name: 'SUMilan Chapter Event Participation Certificate',
    description: `To: ${recipientName}; Event: ${eventName}; Date: ${date}`,
    image: `ipfs://${certificateIpfsHash}`,
  };
};
