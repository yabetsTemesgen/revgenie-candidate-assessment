
import { createClient } from './server'
import type { OnboardingFormData } from '@/contexts/Onboarding/onboarding-context'

export interface OnboardingRecord {
  id: string
  user_id: string
  company_id: string
  initial_ai_data: any // JSON field for AI-generated data
  final_user_data: any // JSON field for user's final data
  completed_at?: string
  created_at: string
  updated_at: string
}

// Save initial AI-generated onboarding data
export async function saveInitialOnboardingData(
  userId: string,
  companyId: string,
  aiGeneratedData: any
): Promise<{ onboardingId: string | null; success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('company_onboarding')
      .insert({
        user_id: userId,
        company_id: companyId,
        initial_ai_data: aiGeneratedData,
        final_user_data: null, // Will be updated when user completes onboarding
        completed_at: null
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error saving initial onboarding data:', error)
      return { onboardingId: null, success: false, error: error.message }
    }

    return { onboardingId: data.id, success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in saveInitialOnboardingData:', error)
    return { 
      onboardingId: null,
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Complete onboarding with final user data
export async function completeOnboarding(
  onboardingId: string,
  finalUserData: OnboardingFormData
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('company_onboarding')
      .update({
        final_user_data: finalUserData,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', onboardingId)

    if (error) {
      console.error('Error completing onboarding:', error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in completeOnboarding:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Get onboarding data for comparison
export async function getOnboardingData(
  userId: string
): Promise<{ onboardingData: OnboardingRecord | null; success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('company_onboarding')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching onboarding data:', error)
      return { onboardingData: null, success: false, error: error.message }
    }

    return { onboardingData: data || null, success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in getOnboardingData:', error)
    return { 
      onboardingData: null,
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
