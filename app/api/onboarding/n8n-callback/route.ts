import { NextRequest, NextResponse } from 'next/server';
import { jobStore } from '../../../../lib/job-store';
import { createClient } from '../../../../lib/supabase/server';
import type { WebhookResponseItem } from '../../../../contexts/Onboarding/onboarding-context';

// Define the expected shape of the callback from n8n
interface N8nCallbackPayload {
  jobId: string;
  status: 'success' | 'error';
  data?: WebhookResponseItem; // Present if status is 'success'
  error?: string;             // Present if status is 'error'
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('API n8n-callback: Received payload:', JSON.stringify(payload, null, 2));

    const { jobId, status, data: resultData } = payload;

    if (!jobId) {
      console.error('API n8n-callback: No jobId provided in payload');
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the onboarding record by job_id
    const { data: onboardingRecord, error: findError } = await supabase
      .from('company_onboarding')
      .select('*')
      .eq('job_id', jobId)
      .single();

    if (findError || !onboardingRecord) {
      console.log(`API n8n-callback: Received callback for non-existent job ${jobId}`);
      return NextResponse.json({ 
        message: 'Job not found in database',
        acknowledged: true 
      });
    }

    if (status === 'success' && resultData) {
      console.log(`API n8n-callback: Job ${jobId} completed successfully`);

      // Update the onboarding record with the AI-generated data
      const { error: updateError } = await supabase
        .from('company_onboarding')
        .update({
          research_status: 'completed',
          research_data: resultData,
          ai_generated_data: resultData,
          ai_generated_at: new Date().toISOString(),
          current_step: 'company-overview'
        })
        .eq('job_id', jobId);

      if (updateError) {
        console.error('Error updating onboarding record:', updateError);
        return NextResponse.json({ error: 'Failed to store results' }, { status: 500 });
      }

      // Also update job store for immediate status checks
      jobStore.updateJob(jobId, 'completed', resultData);
    } else if (status === 'error') {
      console.error(`API n8n-callback: Job ${jobId} failed:`, resultData);

      // Update the onboarding record with error status
      const { error: updateError } = await supabase
        .from('company_onboarding')
        .update({
          research_status: 'failed',
          current_step: 'initial' // Go back to initial step
        })
        .eq('job_id', jobId);

      if (updateError) {
        console.error('Error updating onboarding record with error:', updateError);
      }

      jobStore.updateJob(jobId, 'error', undefined, resultData?.message || 'Unknown error from n8n');
    } else {
      console.warn(`API n8n-callback: Job ${jobId} received unknown status:`, status);
      jobStore.updateJob(jobId, 'error', undefined, `Unknown status: ${status}`);
    }

    return NextResponse.json({ 
      message: 'Callback received successfully',
      jobId,
      status: 'processed'
    });
  } catch (error) {
    console.error('API n8n-callback: Error processing callback:', error);
    const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errMessage }, { status: 500 });
  }
}