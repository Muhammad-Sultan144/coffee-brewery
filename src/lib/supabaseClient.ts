import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xcqgqrtglywqpmfibxnx.supabase.co';
const supabaseAnonKey = 'sb_publishable_rb5VIOZ5-Xf4gTADZFn5Cw_timwMggF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
