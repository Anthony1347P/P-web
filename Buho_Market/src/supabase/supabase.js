import { createClient } from '@supabase/supabase-js';

/*easter egg del supremo buho market sabroson*/
/*crack el que lo lea brou*/
export const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);