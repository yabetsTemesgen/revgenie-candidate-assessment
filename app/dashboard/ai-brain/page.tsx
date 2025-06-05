
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Building, Users, Target, Palette, Trophy, Edit, Save, X } from "lucide-react"
import { OnboardingDataEditor } from "@/components/ai-brain/onboarding-data-editor"

export default function AIBrainPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Brain</h1>
            <p className="text-gray-600">Manage your company's knowledge base and AI agent data</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Company Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="onboarding" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="onboarding" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Onboarding Data
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Audience
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Brand & Voice
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Business Goals
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Performance Data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="onboarding" className="mt-6">
              <OnboardingDataEditor />
            </TabsContent>
            
            <TabsContent value="audience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Target Audience Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Audience data management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="brand" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand & Voice Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Brand data management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Goals & Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Goals data management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Performance data coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
