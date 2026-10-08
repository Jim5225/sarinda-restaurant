import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare const process: any;

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: { persistSession: false }
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
    }
  }

  return null;
}
