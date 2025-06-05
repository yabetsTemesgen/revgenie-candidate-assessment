"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export default function LoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Analyzing your business goal...")

  const statusMessages = [
    "Analyzing your business goal...",
    "Identifying target audience...",
    "Researching industry trends...",
    "Generating content strategy...",
    "Creating content calendar...",
    "Finalizing recommendations...",
  ]

  useEffect(() => {
    // Set up the progress bar to complete in 5 seconds
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2

        // Update status message at specific progress points
        if (newProgress === 20) setStatusText(statusMessages[1])
        else if (newProgress === 40) setStatusText(statusMessages[2])
        else if (newProgress === 60) setStatusText(statusMessages[3])
        else if (newProgress === 80) setStatusText(statusMessages[4])
        else if (newProgress === 90) setStatusText(statusMessages[5])

        // When complete, navigate to the target audience page
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/dashboard/content-manager/onboarding/target-audience")
          }, 500)
        }

        return Math.min(newProgress, 100)
      })
    }, 100) // 5 seconds total (100 steps * 50ms)

    return () => clearInterval(interval)
  }, [router])

  return (
    <>
      <div className="py-16 px-4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white absolute" />
            <div className="w-10 h-10 border-t-4 border-l-4 border-white rounded-full animate-spin"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Creating Your Content Strategy</h1>
        <p className="text-center text-muted-foreground mb-8">
          Content Genie is analyzing your goal and preparing your personalized strategy
        </p>

        <div className="w-full mb-4">
          <div className="mb-2 text-center font-medium">{statusText}</div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground max-w-sm">
          <p>
            We're using AI to analyze your business goal and create a tailored content strategy that will help you
            achieve results.
          </p>
        </div>
      </div>
    </>
  )
}
