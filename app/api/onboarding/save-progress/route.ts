
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUserServer } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const { user } = await getCurrentUserServer();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentStep, onboardingData } = await request.json();

    if (!currentStep || !onboardingData) {
      return NextResponse.json({ 
        error: 'Missing required data: currentStep and onboardingData are required' 
      }, { status: 400 });
    }

    const supabase = await createClient();

    // Update the onboarding record with current progress
    const { error: updateError } = await supabase
      .from('company_onboarding')
      .update({
        current_step: currentStep,
        partial_data: onboardingData,
        updated_at: new Date().toISOString()
      })
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('Error saving onboarding progress:', updateError);
      return NextResponse.json({ 
        error: 'Failed to save progress', 
        details: updateError.message 
      }, { status: 500 });
    }

    console.log(`Progress saved for user ${user.id} at step: ${currentStep}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Progress saved successfully',
      currentStep 
    });

  } catch (error) {
    console.error('Error in save progress API:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
