"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Calendar, Check, ArrowLeft, MessageSquare, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"


export default function ContentPreferencesPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pre-filled preferences
  const [preferences, setPreferences] = useState({
    frequency: "medium", // low, medium, high
    platforms: {
      linkedin: true,
      twitter: false,
      instagram: false,
      blog: false,
    },
    tone: "professional", // professional, conversational, authoritative, friendly
  })

  const handleFrequencyChange = (value: string) => {
    setPreferences({
      ...preferences,
      frequency: value,
    })
  }

  const handlePlatformToggle = (platform: keyof typeof preferences.platforms) => {
    if (platform === "linkedin") return // LinkedIn can't be toggled off in this version

    setPreferences({
      ...preferences,
      platforms: {
        ...preferences.platforms,
        [platform]: !preferences.platforms[platform],
      },
    })
  }

  const handleToneChange = (value: string) => {
    setPreferences({
      ...preferences,
      tone: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Navigate to the summary page
    setTimeout(() => {
      router.push("/dashboard/content-manager/onboarding/summary")
    }, 500)
  }

  const handleBack = () => {
    router.push("/dashboard/content-manager/onboarding/content-topics")
  }

  // Helper function to get frequency description
  const getFrequencyDescription = () => {
    switch (preferences.frequency) {
      case "low":
        return "1-2 posts per week"
      case "medium":
        return "3-4 posts per week"
      case "high":
        return "5+ posts per week"
      default:
        return ""
    }
  }

  return (
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
            <p className="text-sm text-green-600 font-medium">AI Analysis Complete</p>
          </div>

          <h1 className="text-2xl font-bold">Content Preferences</h1>
          <p className="text-muted-foreground">
            Set your preferences for content delivery, platforms, and communication style.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                Posting Frequency
              </CardTitle>
              <CardDescription>How often would you like to publish content?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={preferences.frequency} onValueChange={handleFrequencyChange} className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="flex flex-col">
                    <span className="font-medium">Low Frequency</span>
                    <span className="text-sm text-muted-foreground">1-2 posts per week</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="flex flex-col">
                    <span className="font-medium">Medium Frequency</span>
                    <span className="text-sm text-muted-foreground">3-4 posts per week</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="flex flex-col">
                    <span className="font-medium">High Frequency</span>
                    <span className="text-sm text-muted-foreground">5+ posts per week</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <p className="text-sm text-purple-700">
                  <strong>AI Recommendation:</strong> Based on your business goals and industry, we recommend a{" "}
                  <strong>medium frequency</strong> posting schedule ({getFrequencyDescription()}).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 text-purple-500 mr-2" />
                Platform Selection
              </CardTitle>
              <CardDescription>Choose the platforms where you want to publish content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-md p-4 flex flex-col items-center ${
                    preferences.platforms.linkedin
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600 mb-2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>

                <div className="border-2 border-gray-200 rounded-md p-4 flex flex-col items-center opacity-70 cursor-not-allowed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400 mb-2"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="font-medium">Twitter</span>
                  <Badge className="mt-2 bg-gray-100 text-gray-800 hover:bg-gray-100">Coming Soon</Badge>
                </div>

                <div className="border-2 border-gray-200 rounded-md p-4 flex flex-col items-center opacity-70 cursor-not-allowed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pink-500 mb-2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="font-medium">Instagram</span>
                  <Badge className="mt-2 bg-gray-100 text-gray-800 hover:bg-gray-100">Coming Soon</Badge>
                </div>

                <div className="border-2 border-gray-200 rounded-md p-4 flex flex-col items-center opacity-70 cursor-not-allowed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 mb-2"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                    <path d="M8 7h6"></path>
                    <path d="M8 11h8"></path>
                    <path d="M8 15h6"></path>
                  </svg>
                  <span className="font-medium">Blog Posts</span>
                  <Badge className="mt-2 bg-gray-100 text-gray-800 hover:bg-gray-100">Coming Soon</Badge>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Currently, content can be generated for LinkedIn. Additional platforms will be
                  available soon.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
                Tone & Voice
              </CardTitle>
              <CardDescription>Select the communication style for your content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={preferences.tone} onValueChange={handleToneChange} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="conversational">Conversational</TabsTrigger>
                  <TabsTrigger value="authoritative">Authoritative</TabsTrigger>
                  <TabsTrigger value="friendly">Friendly</TabsTrigger>
                </TabsList>
                <TabsContent value="professional" className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Professional</h4>
                  <p className="text-sm text-muted-foreground">
                    Polished, clear, and business-appropriate. Uses industry terminology correctly but avoids
                    unnecessary jargon. Focuses on delivering value and insights in a straightforward manner.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
                    <strong>Example:</strong> "Our analysis indicates that implementing these five strategies could
                    increase your conversion rates by approximately 25% within the first quarter."
                  </div>
                </TabsContent>
                <TabsContent value="conversational" className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Conversational</h4>
                  <p className="text-sm text-muted-foreground">
                    Casual and approachable, like talking to a knowledgeable friend. Uses contractions, asks questions,
                    and maintains an engaging dialogue with the reader.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
                    <strong>Example:</strong> "Have you been struggling with low conversion rates? Let's talk about five
                    strategies that could boost your numbers by 25% — and you might see results faster than you think!"
                  </div>
                </TabsContent>
                <TabsContent value="authoritative" className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Authoritative</h4>
                  <p className="text-sm text-muted-foreground">
                    Confident, expert-level communication that establishes thought leadership. Presents information with
                    conviction and backs claims with data and research.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
                    <strong>Example:</strong> "Based on extensive research and proven methodologies, these five
                    strategies will deliver a 25% increase in conversion rates. Industry leaders who have implemented
                    these approaches consistently outperform their competitors."
                  </div>
                </TabsContent>
                <TabsContent value="friendly" className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Friendly</h4>
                  <p className="text-sm text-muted-foreground">
                    Warm, encouraging, and positive. Uses simple language, personal anecdotes, and creates an emotional
                    connection with the audience.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
                    <strong>Example:</strong> "We're excited to share these five amazing strategies with you! Our team
                    has seen them work wonders for businesses just like yours, with conversion rates jumping up by 25%.
                    Let's dive in and get those results for you too!"
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <p className="text-sm text-purple-700">
                  <strong>AI Recommendation:</strong> For your industry and target audience, a{" "}
                  <strong>professional tone</strong> typically resonates best and builds credibility.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Review Strategy Summary"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

  )
}
