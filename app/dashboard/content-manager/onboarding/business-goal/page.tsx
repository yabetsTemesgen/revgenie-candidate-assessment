"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Target, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function BusinessGoalPage() {
  const router = useRouter()
  const [goal, setGoal] = useState("")
  const [timeframe, setTimeframe] = useState("30")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would save this data to your state management or API
    // For now, we'll just navigate to the loading screen
    setTimeout(() => {
      router.push("/dashboard/content-manager/onboarding/loading")
    }, 500)
  }

  return (

      <div className="py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white absolute" />
              <div className="w-6 h-6 border-t-2 border-l-2 border-white rounded-full animate-spin"></div>
            </div>
            <h1 className="text-2xl font-bold">Content Manager Genie</h1>
          </div>
          <p className="text-muted-foreground">Let's set up your content strategy to achieve your business goals</p>
        </div>

        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-purple-500 mr-2" />
              What's your business goal?
            </CardTitle>
            <CardDescription>
              Tell us what you're trying to achieve with your content strategy. Be specific about metrics if possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="goal" className="text-sm font-medium">
                  Business Goal
                </label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Increase demo signups, grow email subscribers, boost product awareness..."
                  className="min-h-[100px]"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Example: "Increase demo signups by 20%" or "Grow our email list to 5,000 subscribers"
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="timeframe" className="text-sm font-medium">
                  Timeframe (days)
                </label>
                <Input
                  id="timeframe"
                  type="number"
                  min="7"
                  max="90"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="max-w-[200px]"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  How many days do you want to run this content strategy? (7-90 days recommended)
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Content Genie will analyze your business goal and create a personalized content strategy to help you achieve
            it.
          </p>
        </div>
      </div>

  )
}
