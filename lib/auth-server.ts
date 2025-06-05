import { createClient } from './supabase/server';
import type { User } from '@supabase/supabase-js';

// Get current user (server-side only)
export async function getCurrentUserServer(): Promise<{ user: User | null; error?: string }> {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return { user: null, error: error.message };
  }

  return { user };
}