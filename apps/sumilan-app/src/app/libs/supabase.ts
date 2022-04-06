import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env['NX_SUPABASE_URL'] as string,
    process.env['NX_SUPABASE_PUBLIC_KEY'] as string,
);

export { supabase };