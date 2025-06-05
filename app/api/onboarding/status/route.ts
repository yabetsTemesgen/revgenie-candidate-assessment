import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Missing required query parameter: jobId' }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the onboarding record with this job_id
    const { data: onboardingRecord, error: findError } = await supabase
      .from('company_onboarding')
      .select('research_status, ai_generated_data, research_data')
      .eq('job_id', jobId)
      .single();

    if (findError || !onboardingRecord) {
      console.warn(`API Status: No onboarding record found for job ${jobId}`);
      // Return pending for early polls before the job is fully registered
      return NextResponse.json({ status: 'pending', message: 'Job not found or not yet processed.' }, { status: 200 });
    }

    // Map database status to API status
    let status: 'pending' | 'success' | 'error';
    let data = undefined;
    let error = undefined;

    switch (onboardingRecord.research_status) {
      case 'completed':
        status = 'success';
        data = onboardingRecord.ai_generated_data;
        break;
      case 'failed':
        status = 'error';
        error = onboardingRecord.research_data?.error || 'Processing failed';
        break;
      case 'in_progress':
      case 'pending':
      default:
        status = 'pending';
        break;
    }

    return NextResponse.json({ status, data, error }, { status: 200 });

  } catch (error) {
    console.error('API Status: Error in /api/onboarding/status:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
