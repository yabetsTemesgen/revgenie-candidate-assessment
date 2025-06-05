
import { createClient } from './server'

export interface CompanyCreationData {
  name: string
  industry?: string
  employee_range?: string
  description?: string
  linkedin_url?: string
  website_url?: string
}

export async function createCompanyWithOnboarding(
  userId: string,
  companyData: CompanyCreationData,
  initialData?: any
): Promise<{ company: any; onboarding: any; success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    // 1. Create the company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        industry: companyData.industry,
        employee_range: companyData.employee_range,
        description: companyData.description,
        linkedin_url: companyData.linkedin_url,
        website_url: companyData.website_url,
      })
      .select()
      .single()

    if (companyError) {
      console.error('Error creating company:', companyError)
      return { company: null, onboarding: null, success: false, error: companyError.message }
    }

    // 2. Create the onboarding record
    const { data: onboarding, error: onboardingError } = await supabase
      .from('company_onboarding')
      .insert({
        company_id: company.id,
        created_by: userId,
        initial_company_name: companyData.name,
        initial_linkedin_url: companyData.linkedin_url,
        initial_website_url: companyData.website_url,
        initial_resources: initialData?.resources || [],
        research_status: 'pending',
        current_step: 'loading',
        completed_steps: ['initial'],
      })
      .select()
      .single()

    if (onboardingError) {
      console.error('Error creating onboarding record:', onboardingError)
      return { company: null, onboarding: null, success: false, error: onboardingError.message }
    }

    // 3. Update user profile to link to company
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ company_id: company.id })
      .eq('id', userId)

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return { company: null, onboarding: null, success: false, error: profileError.message }
    }

    return { company, onboarding, success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in createCompanyWithOnboarding:', error)
    return { 
      company: null, 
      onboarding: null, 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function getUserCompany(userId: string) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        company_id,
        companies (
          id,
          name,
          industry,
          employee_range,
          description,
          linkedin_url,
          website_url,
          created_at
        )
      `)
      .eq('id', userId)
      .single()

    if (error) {
      return { company: null, success: false, error: error.message }
    }

    return { company: data?.companies, success: true, error: null }
  } catch (error) {
    return { 
      company: null, 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
