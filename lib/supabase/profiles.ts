
import { createClient } from './server'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  company_id?: string
  full_name?: string
  role?: string
  user_role: 'user' | 'admin' | 'organization_owner'
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  industry?: string
  employee_range?: string
  description?: string
  linkedin_url?: string
  website_url?: string
  created_at: string
  updated_at: string
}

// Get user profile with company information
export async function getUserProfile(userId: string): Promise<{
  profile: UserProfile | null
  company: Company | null
  error: string | null
}> {
  try {
    const supabase = await createClient()
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        companies (*)
      `)
      .eq('id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      return { profile: null, company: null, error: profileError.message }
    }

    return {
      profile: profile,
      company: profile?.companies || null,
      error: null
    }
  } catch (error) {
    console.error('Unexpected error in getUserProfile:', error)
    return { 
      profile: null, 
      company: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Create or update user profile
export async function upsertUserProfile(
  userId: string, 
  profileData: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error upserting user profile:', error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in upsertUserProfile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Create or update company
export async function upsertCompany(
  companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>,
  companyId?: string
): Promise<{ companyId: string | null; success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('companies')
      .upsert({
        ...(companyId && { id: companyId }),
        ...companyData,
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error upserting company:', error)
      return { companyId: null, success: false, error: error.message }
    }

    return { companyId: data.id, success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in upsertCompany:', error)
    return { 
      companyId: null,
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
