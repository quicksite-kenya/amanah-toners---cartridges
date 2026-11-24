import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables.'
    );
  }

  supabaseClient = createClient<Database>(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseClient;
}
