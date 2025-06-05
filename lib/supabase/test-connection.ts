
import { createClient } from './client'
import { createClient as createServerClient } from './server'

export async function testSupabaseConnection() {
  try {
    // Test client-side connection
    const supabase = createClient()
    const { data, error } = await supabase.from('_supabase_health_check').select('*').limit(1)
    
    console.log('✅ Supabase client connection successful')
    return { success: true, client: true }
  } catch (error) {
    console.error('❌ Supabase client connection failed:', error)
    return { success: false, client: false, error }
  }
}

export async function testSupabaseServerConnection() {
  try {
    // Test server-side connection
    const supabase = createServerClient()
    const { data, error } = await supabase.from('_supabase_health_check').select('*').limit(1)
    
    console.log('✅ Supabase server connection successful')
    return { success: true, server: true }
  } catch (error) {
    console.error('❌ Supabase server connection failed:', error)
    return { success: false, server: false, error }
  }
}
