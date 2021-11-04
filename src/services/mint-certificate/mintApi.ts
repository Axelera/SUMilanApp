export const mintCertificate = async (recipientAddress: string, recipientName: string, eventId: string): Promise<{ transactionHash: string }> => {
    const res = await fetch('http://localhost:4000/api/mint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipientAddress,
            recipientName,
            eventId,
        }),
    });
    if (res.status !== 200) {
        throw new Error('Minting certificate failed');
    }
    return await res.json();
};