"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ABMManagerOnboardingRedirect() {
  const router = useRouter()

  useEffect(() => {
     router.push('/dashboard/abm-genie/onboarding/initial-input')
  }, [router])

  return (
    <div className="flex items-center justify-center h-full">
      <p>Redirecting to onboarding...</p>
    </div>
  )
}
