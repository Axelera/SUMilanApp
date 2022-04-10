import { createClient } from '@supabase/supabase-js';
import {createClient as createGrapQLClient} from 'urql';

export const supabase = createClient(
    process.env['NX_SUPABASE_URL'] as string,
    process.env['NX_SUPABASE_PUBLIC_KEY'] as string,
);

export const graphQLClient = createGrapQLClient({
    url: process.env['NX_SUPABASE_GRAPHQL_ENDPOINT'] as string,
    fetchOptions: {
        headers: {
            apikey: process.env['NX_SUPABASE_PUBLIC_KEY'] as string,
        },
    },
    fetch,
    maskTypename: true,
});