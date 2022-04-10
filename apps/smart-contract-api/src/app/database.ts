import { createClient } from 'urql';
import fetch from 'isomorphic-unfetch';

import {
  Events,
  GetEventDetailsQueryVariables,
  GetEventToMintDocument,
  GetEventToMintQuery,
} from '@sumilan-app/api';

const client = createClient({
  url: process.env['NX_SUPABASE_GRAPHQL_ENDPOINT'],
  fetchOptions: {
    headers: {
      apikey: process.env['NX_SUPABASE_PUBLIC_KEY'],
    },
  },
  fetch,
  maskTypename: true,
});

export const getEventData = async (
  eventIdentifier: string
): Promise<Partial<Events> | undefined> => {
  const result = await client
    .query<GetEventToMintQuery, GetEventDetailsQueryVariables>(
      GetEventToMintDocument,
      { identifier: eventIdentifier }
    )
    .toPromise();
  console.log(result);
  if (
    result.data?.eventsCollection?.edges &&
    result.data.eventsCollection.edges.length > 0
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result.data.eventsCollection.edges[0].node;
  }
  return undefined;
};
