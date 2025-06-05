
import { createClient } from '@/lib/supabase/server';
import { getCurrentBaseUrl } from '@/lib/utils/environment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const baseUrl = getCurrentBaseUrl();

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Check if this is an email confirmation or a regular OAuth sign-in
      // Email confirmations typically don't have an active session immediately
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User has an active session (OAuth flow) - redirect to dashboard
        return NextResponse.redirect(`${baseUrl}/dashboard`);
      } else {
        // Email confirmation flow - redirect to sign-in page
        return NextResponse.redirect(`${baseUrl}/signin?message=email_confirmed`);
      }
    } else {
      // Redirect with error parameter
      return NextResponse.redirect(`${baseUrl}/test/auth?error=auth_callback_failed`);
    }
  }

  // Return to auth page if there was an error
  return NextResponse.redirect(`${baseUrl}/test/auth?error=no_auth_code`);
}
