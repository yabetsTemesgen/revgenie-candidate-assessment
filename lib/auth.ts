
import { createClient } from './supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User | null;
  session?: Session | null;
}

// Sign up with email and password
export async function signUp(email: string, password: string, fullName?: string): Promise<AuthResult> {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { 
    success: true, 
    user: data.user, 
    session: data.session 
  };
}

// Sign in with email and password
export async function signIn(email: string, password: string, redirectTo?: string): Promise<AuthResult> {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Handle redirect after successful sign-in
  if (redirectTo && typeof window !== 'undefined') {
    window.location.href = redirectTo;
  }

  return { 
    success: true, 
    user: data.user, 
    session: data.session 
  };
}

// Sign out
export async function signOut(): Promise<AuthResult> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get current user (client-side)
export async function getCurrentUser(): Promise<{ user: User | null; error?: string }> {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return { user: null, error: error.message };
  }

  return { user };
}



// Sign in with OAuth (Google, LinkedIn, etc.)
export async function signInWithOAuth(provider: 'google' | 'linkedin'): Promise<AuthResult> {
  const supabase = createClient();
  
  // Get the current URL to determine the correct redirect
  const redirectTo = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/callback`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`;
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Reset password
export async function resetPassword(email: string): Promise<AuthResult> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Update password
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
