"use client"

import { useOnboarding } from "../../../contexts/Onboarding/onboarding-context";
import SummaryView from "../../../components/onboarding/summary/summary-view";
import { useRouter } from "next/navigation";

/**
 * SummaryPage component
 * Fetches all onboarding data and passes it to the SummaryView.
 */
export default function SummaryPage() {
  const onboardingContext = useOnboarding();
  const router = useRouter();

  // Handle case where context might not be available, though layout should ensure it is.
  if (!onboardingContext) {
    return <div>Loading summary data...</div>; // Or some error state
  }

  const { formData, allObjectives } = onboardingContext;

  // Use the context's handleSubmit which properly saves to database
  const { handleSubmit } = onboardingContext;

  return (
    <SummaryView 
      formData={formData} 
      allObjectives={allObjectives} 
      onSubmit={handleSubmit} // Use context's handleSubmit for proper database saving
    />
  );
}
