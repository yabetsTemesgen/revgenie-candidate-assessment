"use client"

import { AudienceProvider } from "../../../contexts/Onboarding/audience-context"
import AudienceForm from "../../../components/onboarding/audience/audience-form"

/**
 * AudiencePage component
 * Container component that provides the context and renders the presentational component
 */
export default function AudiencePage() {
  return (
    <AudienceProvider>
      <AudienceForm />
    </AudienceProvider>
  )
}