export const getNFTMetadata = (
  recipientName: string,
  eventName: string,
  date: string,
  certificateIpfsHash: string
) => {
  return {
    name: 'SUMilan Chapter Event Participation Certificate',
    description: `To: ${recipientName}; Event: ${eventName}; Date: ${date}`,
    image: `ipfs://${certificateIpfsHash}`,
  };
};
