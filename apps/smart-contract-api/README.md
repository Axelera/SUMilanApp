# SUMilanCertificate Node.js API (Lambda)

This code is typically used for development.

## Usage

### Requirements

- create an Amazon AWS Lambda + API Gateway (REST) resource

### Build

- create a zip package of the api by running:

  ```
  npx nx run smart-contract-api:package
  ```
  this command will create a **zip file** named `smart-contract-api.zip` inside `dist/smart-contract-api` folder
- upload the zip file to Lambda (see [here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-zip.html))
- insert all these keys in the **Environment variables** inside Lambda Configuration tab (see [here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html)):

```
METAMASK_PRIVATE_KEY="<obtained in the requirements>"
METAMASK_PUBLIC_KEY="<obtained in the requirements>"

ALCHEMY_API_URL="<obtained in the requirements>"

CONTRACT_ADDRESS="<the contract address>"

PINATA_API_KEY="<obtained in the requirements>"
PINATA_SECRET_API_KEY="<obtained in the requirements>"
PINATA_JWT="<obtained in the requirements>"

SUPABASE_URL="<obtained in the requirements>"
SUPABASE_KEY="<obtained in the requirements>"
```

### Run

Just deploy the Lambda function and the API Gateway that triggers it.

## API reference

**Endpoint** : depends on your API Gateway configuration

**Method** : `POST`

**Auth required** : depends on your API Gateway configuration

**Permissions required** : None

## Request

**type: body**

```json
{
  "recipiendAddress": "0x...",
  "recipientName": "John Doe",
  "eventId": "incontro-41"
}
```

**Request Fields Description**

| key              | value       | description                               |
| ---------------- | ----------- | ----------------------------------------- |
| recipiendAddress | 0x...       | ETH address that receives the certificate |
| recipientName    | John Doe    | Name that appears on the certificate      |
| eventId          | incontro-41 | event ID from Supabase database           |

## Response

```json
{
  "transactionHash": "0x..."
}
```

**Response Fields Description**

| key             | value | description                                                       |
| --------------- | ----- | ----------------------------------------------------------------- |
| transactionHash | 0x... | ETH blockchain hash of the transaction that mints the certificate |

**Response codes**

- If response is success, http **status** will be **200**
- If the invocation ends with error, http status will have the standard status: 401, 403, 500, 502, etc depending on your API Gateway configuration.

| code | description                                                                      |
| ---- | -------------------------------------------------------------------------------- |
| 200  | ✅ success                                                                       |
| 400  | ❌ server did not find the event with that eventId of the event is not ended yet |
| 500  | ❌ server encountered an error                                                   |
