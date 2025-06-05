
import { NextResponse } from 'next/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getUserProfile, upsertUserProfile, upsertCompany } from '@/lib/supabase/profiles'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const { user } = await getCurrentUserServer()
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { profile, company, error } = await getUserProfile(user.id)
    
    if (error && !error.includes('JSON object requested, multiple (or no) rows returned')) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Profile data retrieved successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata
        },
        profile,
        company
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Profile test error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Profile test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const { user } = await getCurrentUserServer()
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const supabase = await createClient()
    
    // Debug 1: Check auth.uid() function in RLS context (correct way)
    const { data: authCheck, error: authError } = await supabase
      .rpc('debug_auth_context')

    console.log('Auth UID check:', { authCheck, authError })

    // Debug 2: Test simple query to verify connection
    const { data: testData, error: testError } = await supabase
      .from('companies')
      .select('count')
      .limit(1)

    console.log('Companies table test:', { testData, testError })

    // Debug 3: Test the test_company_insert function with detailed logging
    const { data: testInsert, error: testInsertError } = await supabase
      .rpc('test_company_insert', { company_name: 'Debug Test Company' })

    console.log('Test company insert:', { testInsert, testInsertError })

    // Debug 4: Try direct insert to see exact error
    const { data: directInsert, error: directError } = await supabase
      .from('companies')
      .insert({
        name: 'Debug Test Company',
        industry: 'Technology',
        employee_range: '1-10',
        description: 'Direct insert test'
      })
      .select()
      .single()

    console.log('Direct insert test:', { directInsert, directError })

    if (directError) {
      return NextResponse.json({
        status: 'debug_info',
        message: 'RLS Policy Debug Information',
        debug: {
          user: {
            id: user.id,
            email: user.email,
            aud: user.aud,
            role: user.role
          },
          authCheck,
          authError: authError?.message,
          testData,
          testError: testError?.message,
          testInsert,
          testInsertError: testInsertError?.message,
          directError: directError.message,
          directErrorDetails: directError
        },
        timestamp: new Date().toISOString()
      })
    }

    // If we get here, the insert worked
    return NextResponse.json({
      status: 'success',
      message: 'Company creation successful',
      data: {
        company: directInsert,
        userId: user.id
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('RLS Debug test error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'RLS debug test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
