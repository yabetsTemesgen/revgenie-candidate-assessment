import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RevGeni - Onboarding",
  description: "Complete your onboarding to get started with RevGeni",
}

import { OnboardingProvider } from "../../contexts/Onboarding/onboarding-context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <main>{children}</main>
    </OnboardingProvider>
  );
}
