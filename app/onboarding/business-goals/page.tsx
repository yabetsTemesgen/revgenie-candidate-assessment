"use client"

import { BusinessGoalsProvider } from "../../../contexts/Onboarding/business-goals-context"
import BusinessGoalsForm from "../../../components/onboarding/business-goals/business-goals-form"

/**
 * BusinessGoalsPage component
 * Container component that provides the context and renders the presentational component
 */
export default function BusinessGoalsPage() {
  return (
    <BusinessGoalsProvider>
      <BusinessGoalsForm />
    </BusinessGoalsProvider>
  )
}
