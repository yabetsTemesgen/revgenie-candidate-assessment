"use client"

import { BrandStylesProvider } from "../../../contexts/Onboarding/brand-styles-context"
import BrandForm from "../../../components/onboarding/brand-styles/brand-form"

/**
 * BrandStylesPage component
 * Container component that provides the context and renders the presentational component
 */
export default function BrandStylesPage() {
  return (
    <BrandStylesProvider>
      <BrandForm />
    </BrandStylesProvider>
  )
}
