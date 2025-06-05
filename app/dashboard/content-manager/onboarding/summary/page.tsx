"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Check, FileText, Calendar, Target, Users, Building } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"


export default function StrategySummaryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // In a real app, this data would come from your state management or API
  // Here we're using mock data to simulate what was collected during onboarding
  const strategyData = {
    businessGoal: {
      goal: "Increase demo signups by 20% in 30 days",
      timeframe: "30 days",
    },
    targetAudience: {
      industry: "Software & Technology",
      audience:
        "Small to medium-sized businesses (10-500 employees) in the technology sector, particularly SaaS companies and digital agencies looking to scale their operations and improve marketing efficiency.",
      painPoints: [
        "Difficulty generating high-quality leads consistently",
        "Struggle to demonstrate ROI from marketing efforts",
        "Limited resources for content creation and distribution",
      ],
    },
    contentTopics: [
      "AI-Powered Marketing Automation",
      "ROI Measurement & Analytics",
      "Content Creation Efficiency",
      "Lead Generation Strategies",
    ],
    contentPreferences: {
      frequency: "Medium (3-4 posts per week)",
      platforms: ["LinkedIn"],
      tone: "Professional",
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Navigate to the content generation screen
    setTimeout(() => {
      router.push("/dashboard/content-manager/onboarding/generating")
    }, 500)
  }

  const handleBack = () => {
    router.push("/dashboard/content-manager/onboarding/content-preferences")
  }

  return (
    <>
      <div className="py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-green-100 p-1.5 rounded-full">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-green-600 font-medium">Strategy Complete</p>
          </div>

          <h1 className="text-2xl font-bold">Strategy Summary</h1>
          <p className="text-muted-foreground">
            Review your content strategy before we generate your personalized content plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-purple-500 mr-2" />
                Business Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 rounded-md">
                  <p className="font-medium text-purple-900">{strategyData.businessGoal.goal}</p>
                </div>
                <p className="text-sm text-muted-foreground">Timeframe: {strategyData.businessGoal.timeframe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-purple-500 mr-2" />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-muted-foreground mr-2" />
                  <h3 className="text-sm font-medium">Industry</h3>
                </div>
                <p className="text-sm">{strategyData.targetAudience.industry}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Audience Description</h3>
                <p className="text-sm">{strategyData.targetAudience.audience}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pain Points</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  {strategyData.targetAudience.painPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-purple-500 mr-2" />
                Content Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {strategyData.contentTopics.map((topic, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                Content Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Frequency</h3>
                  <p className="text-sm">{strategyData.contentPreferences.frequency}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Platforms</h3>
                  <div className="flex flex-wrap gap-1">
                    {strategyData.contentPreferences.platforms.map((platform, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tone</h3>
                  <p className="text-sm">{strategyData.contentPreferences.tone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                    I agree to generate content based on this strategy
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    By checking this box, you confirm that the strategy outlined above meets your requirements and
                    authorize Content Genie to generate content based on these specifications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting || !agreedToTerms}>
              {isSubmitting ? "Processing..." : "Generate My Content"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
