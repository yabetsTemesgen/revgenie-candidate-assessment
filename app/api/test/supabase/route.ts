
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Simple connection test - this will fail gracefully if connection issues exist
    const { data, error } = await supabase.auth.getUser()
    
    if (error && error.message !== 'Auth session missing!') {
      throw error
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Supabase connection working',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Supabase connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
