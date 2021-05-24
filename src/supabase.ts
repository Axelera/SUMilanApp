import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL as string,
    process.env.REACT_APP_SUPABASE_PUBLIC_KEY as string,
);

export { supabase };