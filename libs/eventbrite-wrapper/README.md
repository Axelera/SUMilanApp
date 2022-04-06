# [SuMilanEventbriteWrapper](src/index.js)
**Checks if there's a ticket with the user email, in order to unlock study materials for that event.**

This is the code of an [IBM Cloud Function](https://www.ibm.com/cloud). It's a web enabled [Action](https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-actions_over) wrapped in an [API gateway](https://cloud.ibm.com/docs/api-gateway?topic=api-gateway-getting-started).
The API gateway is configured to forward **GET** requests sent to `/sumilaneventbriteapi` to the cloud function.

The API key is shared outside of Cloud Foundry organization.

### How it works
The function receives `email` and `eventId` as input and checks if that email is contained in the event (identified by eventId) orders fetched from [Eventbrite APIs](https://www.eventbrite.com/platform/api#/reference/order/retrieve/list-orders-by-event-id).

_You must have a valid Eventbrite API Key ([instructions](https://www.eventbrite.it/platform/docs/authentication#get-a-private-token)) and put it in the `eventbriteToken` variable in order to make this function work._