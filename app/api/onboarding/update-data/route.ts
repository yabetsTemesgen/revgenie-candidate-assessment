
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('API Update Data: No authenticated user found:', userError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { updatedData } = await request.json();
    
    if (!updatedData) {
      return NextResponse.json({ error: 'Updated data is required' }, { status: 400 });
    }

    // Find the user's onboarding record
    const { data: onboardingRecord, error: fetchError } = await supabase
      .from('company_onboarding')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !onboardingRecord) {
      console.error('API Update Data: No onboarding record found:', fetchError);
      return NextResponse.json({ error: 'No onboarding record found' }, { status: 404 });
    }

    // Update the final data (since this is user-edited data)
    const { error: updateError } = await supabase
      .from('company_onboarding')
      .update({
        final_data: updatedData,
        updated_at: new Date().toISOString()
      })
      .eq('id', onboardingRecord.id);

    if (updateError) {
      console.error('API Update Data: Error updating onboarding data:', updateError);
      return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }

    console.log(`API Update Data: Successfully updated onboarding data for user ${user.id}`);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API Update Data: Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
