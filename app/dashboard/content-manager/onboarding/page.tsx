"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ContentManagerOnboardingRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/content-manager/onboarding/business-goal")
  }, [router])

  return (
    <div className="flex items-center justify-center h-full">
      <p>Redirecting to onboarding...</p>
    </div>
  )
}
