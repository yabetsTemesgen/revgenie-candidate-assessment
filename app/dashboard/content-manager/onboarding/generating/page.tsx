"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, FileText, Calendar, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export default function GeneratingContentPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  // Generation steps
  const generationSteps = [
    {
      title: "Creating content ideas",
      description: "Generating engaging headlines and topics based on your strategy",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Building content calendar",
      description: "Organizing content into an optimal publishing schedule",
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Drafting content",
      description: "Creating professional content tailored to your audience",
      icon: <Sparkles className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Finalizing strategy",
      description: "Putting everything together in your dashboard",
      icon: <CheckCircle2 className="h-5 w-5 text-purple-600" />,
    },
  ]

  useEffect(() => {
    // Set up the progress bar to complete in 7 seconds
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1.5

        // Update current step at specific progress points
        if (newProgress >= 25 && newProgress < 50) {
          setCurrentStep(1)
        } else if (newProgress >= 50 && newProgress < 75) {
          setCurrentStep(2)
        } else if (newProgress >= 75) {
          setCurrentStep(3)
        }

        // When complete, navigate to the content manager dashboard
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/dashboard/content-manager")
          }, 500)
        }

        return Math.min(newProgress, 100)
      })
    }, 100) // 7 seconds total (100 steps * 70ms)

    return () => clearInterval(interval)
  }, [router])

  return (
    <>
      <div className="py-16 px-4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white absolute" />
            <div className="w-14 h-14 border-t-4 border-l-4 border-white rounded-full animate-spin"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Generating Your Content</h1>
        <p className="text-center text-muted-foreground mb-8">
          Content Genie is creating your personalized content based on your strategy
        </p>

        <div className="w-full mb-8">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium">{Math.round(progress)}% complete</span>
            <span className="text-sm text-muted-foreground">Estimated time: {7 - Math.floor(progress / 15)}s</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="w-full space-y-4">
          {generationSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                currentStep === index
                  ? "bg-purple-100 border border-purple-200"
                  : currentStep > index
                    ? "opacity-60"
                    : "opacity-40"
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  currentStep >= index ? "bg-purple-200" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground max-w-sm">
          <p>
            We're using AI to create high-quality content that aligns with your business goals and resonates with your
            target audience.
          </p>
        </div>
      </div>
    </>
  )
}
