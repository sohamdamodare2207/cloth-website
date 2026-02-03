import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for use in the browser (client components).
 * Returns null if env is not set (see .env.local.example).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createSupabaseClient(url, anonKey);
}
