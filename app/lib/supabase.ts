import { createBrowserClient } from '@supabase/ssr';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database from the browser
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey); 