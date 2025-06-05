import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUserServer } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const { user } = await getCurrentUserServer();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the onboarding data from the request
    const { onboardingData } = await request.json();

    if (!onboardingData) {
      return NextResponse.json({ 
        error: 'Missing required data: onboardingData is required' 
      }, { status: 400 });
    }

    const supabase = await createClient();

    // First, find the onboarding record for this user
    const { data: onboardingRecord, error: findError } = await supabase
      .from('company_onboarding')
      .select('company_id')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (findError || !onboardingRecord) {
      console.error('Error finding onboarding record:', findError);
      return NextResponse.json({ 
        error: 'No company found for this user. Please complete the initial onboarding steps.' 
      }, { status: 404 });
    }

    const companyId = onboardingRecord.company_id;

    // Update the company_onboarding record with final user data
    const { error: onboardingError } = await supabase
      .from('company_onboarding')
      .update({
        final_data: onboardingData,
        is_completed: true,
        completed_at: new Date().toISOString(),
        current_step: 'completed'
      })
      .eq('company_id', companyId)
      .eq('created_by', user.id);

    if (onboardingError) {
      console.error('Error completing onboarding:', onboardingError);
      return NextResponse.json({ 
        error: 'Failed to complete onboarding', 
        details: onboardingError.message 
      }, { status: 500 });
    }

    console.log(`Onboarding completed successfully for company ${companyId} by user ${user.id}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding completed successfully' 
    });

  } catch (error) {
    console.error('Error in complete onboarding API:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}