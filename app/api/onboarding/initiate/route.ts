import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { getCurrentUserServer } from '../../../../lib/auth-server';
import { v4 as uuidv4 } from 'uuid';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.your-domain.com/webhook/onboard';
const THIS_APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://your-domain.com'; // Important for n8n callback

export async function POST(request: NextRequest) {
  try {
    const { companyName, linkedInUrl, websiteUrl } = await request.json();

    if (!companyName || !linkedInUrl) {
      return NextResponse.json({ error: 'Missing required fields: companyName and linkedInUrl' }, { status: 400 });
    }

    const { user } = await getCurrentUserServer();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobId = uuidv4();
    const supabase = await createClient();

    // Find the existing onboarding record and update it with job_id
    const { data: onboardingRecord, error: updateError } = await supabase
      .from('company_onboarding')
      .update({
        job_id: jobId,
        research_status: 'pending',
        current_step: 'loading'
      })
      .eq('created_by', user.id)
      .eq('initial_company_name', companyName)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating onboarding record:', updateError);
      return NextResponse.json({ error: 'Failed to update onboarding record' }, { status: 500 });
    }

    // Construct the callback URL for n8n
    const n8nCallbackUrl = `${THIS_APP_BASE_URL}/api/onboarding/n8n-callback`;

    // Data to send to n8n, including our jobId and the callback URL
    const n8nPayload = {
      jobId: jobId, // So n8n can send it back to us
      callbackUrl: n8nCallbackUrl, // The URL n8n should call upon completion
      // The actual data n8n needs for processing
      company_name: companyName,
      company_linkedin_url: linkedInUrl,
      company_website_url: websiteUrl,
      // You might want to include original user/request details if n8n needs them
      // For example: user_name, role from your onboarding context if they are part of initial submission
    };

    console.log(`API Initiate: Sending job ${jobId} to n8n:`, n8nPayload);

    // Asynchronously call n8n - DO NOT await this for a long-running n8n process
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload),
    })
    .then(async response => {
      if (!response.ok) {
        // If n8n immediately returns an error (e.g., webhook not found, auth issue)
        const errorText = await response.text();
        console.error(`API Initiate: Error response from n8n for job ${jobId}: ${response.status} ${errorText}`);
        // Update job status to error if n8n call itself fails critically and immediately
        // This is tricky because n8n might still process if it accepts the request but then fails internally.
        // For now, we assume n8n will accept the request or the main error handling will be via n8n calling our callbackUrl with an error.
        // jobStore.updateJob(jobId, 'error', undefined, `n8n initial call failed: ${errorText.substring(0, 200)}`);
      } else {
        console.log(`API Initiate: Successfully triggered n8n for job ${jobId}. Status: ${response.status}`);
      }
    })
    .catch(error => {
      // Network error or other issue calling n8n
      console.error(`API Initiate: Failed to call n8n for job ${jobId}:`, error);
      // Again, tricky to update job status here, as it's a failure to *trigger* n8n.
      // jobStore.updateJob(jobId, 'error', undefined, `Failed to trigger n8n: ${error.message.substring(0, 200)}`);
    });

    // Immediately respond to the client with the jobId
    return NextResponse.json({ jobId }, { status: 202 }); // 202 Accepted: request accepted, processing not complete

  } catch (error) {
    console.error('API Initiate: Error in /api/onboarding/initiate:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
