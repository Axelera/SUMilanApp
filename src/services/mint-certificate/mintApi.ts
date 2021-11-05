const isProduction = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

const endpoint = isProduction ? '<to-be-added>' : 'http://localhost:4000';

export const mintCertificate = async (recipientAddress: string, recipientName: string, eventId: string): Promise<{ transactionHash: string }> => {
    const res = await fetch(`${endpoint}/api/mint`, {
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
        throw new Error(await res.text());
    }
    return await res.json();
};