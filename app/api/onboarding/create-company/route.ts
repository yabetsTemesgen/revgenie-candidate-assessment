import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import { createCompanyWithOnboarding } from '@/lib/supabase/companies'

export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUserServer()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { companyData, initialData } = body

    if (!companyData || !companyData.name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    const result = await createCompanyWithOnboarding(
      user.id,
      companyData,
      initialData
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      company: result.company,
      onboarding: result.onboarding
    })

  } catch (error) {
    console.error('Error in create-company API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}