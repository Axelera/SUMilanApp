import { isProductionEnv } from "../../constants";

const endpoint = isProductionEnv() ? 'https://6mgu716qed.execute-api.eu-central-1.amazonaws.com/dev/SuMilanCertificateAPI' : 'http://localhost:4000/api';

const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': '',
};

if (isProductionEnv()) {
    headers['X-API-Key'] = process.env['NX_AWS_LAMBDA_CERTIFICATE_API_KEY'] as string;
}

export const mintCertificate = async (recipientAddress: string, recipientName: string, eventIdentifier: string): Promise<{ transactionHash: string }> => {
    const res = await fetch(`${endpoint}/mint`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            recipientAddress,
            recipientName,
            eventIdentifier,
        }),
    });
    if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error.message);
    }
    // res has this structure:
    // {
    //     statusCode: 200,
    //     body: "{\"transactionHash\":\"0x...\"}"
    // }
    const response = await res.json();
    return JSON.parse(response.body);
};