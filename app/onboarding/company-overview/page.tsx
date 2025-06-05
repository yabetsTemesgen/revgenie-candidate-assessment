"use client"

import CompanyForm from "../../../components/onboarding/company-overview/company-form"

/**
 * CompanyOverviewPage component
 * Renders the CompanyForm component directly since it now uses the global OnboardingProvider
 * that's already available from the onboarding layout
 */
export default function CompanyOverviewPage() {
  return <CompanyForm />
}
