"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Building, Users, Globe, MessageSquare, Target, Lightbulb, Edit, Save, X, Loader2, ChevronDown, Plus } from 'lucide-react'
import { toast } from 'sonner'
import TextInput from '@/components/text-input'
import TextareaInput from '@/components/textarea-input'
import SelectInput from '@/components/select-input'
import CheckboxGroup from '@/components/checkbox-group'
import SelectedTags from '@/components/selected-tags'
import UrlInput from '@/components/url-input'
import MessageInput from '@/components/message-input'

interface OnboardingData {
  role: string
  jobId: string
  fullName: string
  companyName: string
  company_name: string
  companyWebsiteUrl: string
  companyLinkedInUrl: string
  resources: string[]
  audience: {
    targetAudience: string
    geographicMarkets: string[]
  }
  brandStyles: {
    brandVoices: string[]
    competitors: string[]
    differentiator: string
    keyMarketingMessages: string[]
  }
  companyOverview: {
    industry: string
    employees: string
    description: string
  }
  businessGoals: {
    selectedObjectives: string[]
    objectiveDescriptions: Record<string, string>
    customObjectives: any[]
    expandedSections: Record<string, boolean>
  }
}

export function OnboardingDataEditor() {
  const { user } = useAuth()
  const router = useRouter()
  const [data, setData] = useState<OnboardingData | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tempData, setTempData] = useState<Partial<OnboardingData>>({})

  // Available options for different fields
  const employeeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "50-100", label: "50-100 employees" },
    { value: "101-250", label: "101-250 employees" },
    { value: "251-500", label: "251-500 employees" },
    { value: "501+", label: "501+ employees" }
  ]

  const industryOptions = [
    { value: "Software & Technology", label: "Software & Technology" },
    { value: "Finance & Banking", label: "Finance & Banking" },
    { value: "Healthcare & Medical", label: "Healthcare & Medical" },
    { value: "Education & E-learning", label: "Education & E-learning" },
    { value: "Retail & E-commerce", label: "Retail & E-commerce" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Marketing & Advertising", label: "Marketing & Advertising" },
    { value: "Other", label: "Other" }
  ]

  const brandVoiceOptions = [
    { value: "professional", label: "Professional" },
    { value: "friendly", label: "Friendly" },
    { value: "technical", label: "Technical" },
    { value: "casual", label: "Casual" },
    { value: "authoritative", label: "Authoritative" },
    { value: "helpful", label: "Helpful" },
    { value: "innovative", label: "Innovative" },
    { value: "trustworthy", label: "Trustworthy" }
  ]

  const availableMarkets = [
    "United States", "Canada", "United Kingdom", "Germany", "France", 
    "Spain", "Italy", "Netherlands", "Australia", "Japan", "Singapore", 
    "Brazil", "Mexico", "India", "South Africa", "Europe", "North America", 
    "Asia Pacific", "Latin America"
  ]

  const businessObjectives = [
    { id: "increase_leads", label: "Increase Leads" },
    { id: "boost_revenue", label: "Boost Revenue" },
    { id: "grow_brand", label: "Grow Brand" },
    { id: "optimize_funnel", label: "Optimize Funnel" },
    { id: "expand_team", label: "Expand Team" },
    { id: "raise_funding", label: "Raise Funding" },
    { id: "automate_tasks", label: "Automate Tasks" },
    { id: "enter_new_markets", label: "Enter New Markets" },
    { id: "retain_existing_customers", label: "Retain Existing Customers" }
  ]

  // Load onboarding data on component mount
  useEffect(() => {
    loadOnboardingData()
  }, [user])

  const loadOnboardingData = async () => {
    if (!user) return

    try {
      setLoading(true)
      const response = await fetch('/api/onboarding/load-progress')

      if (response.ok) {
        const result = await response.json()
        if (result.data?.final_data) {
          console.log('Set data:', result.data.final_data)
          setData(result.data.final_data)
        } else {
          console.log('No final_data found. Onboarding needs to be completed.')
          // Show alert instead of redirecting
          alert('Please complete the onboarding process first before accessing the AI Brain data.')
          return
        }
      } else {
        throw new Error('Failed to load onboarding data')
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error)
      toast.error('Failed to load your data')
    } finally {
      setLoading(false)
    }
  }

  const startEditing = (section: string) => {
    setEditingSection(section)
    setTempData({ ...data })
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setTempData({})
  }

  const saveSection = async () => {
    if (!user || !data) return

    try {
      setSaving(true)
      const updatedData = { ...data, ...tempData }

      // Call API to update the onboarding data
      const response = await fetch('/api/onboarding/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedData }),
      })

      if (response.ok) {
        setData(updatedData)
        setEditingSection(null)
        setTempData({})
        toast.success('Data updated successfully')
      } else {
        throw new Error('Failed to save data')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      toast.error('Failed to save data')
    } finally {
      setSaving(false)
    }
  }

  const updateTempData = (field: string, value: any) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  const updateNestedTempData = (section: string, field: string, value: any) => {
    setTempData(prev => ({
      ...prev,
      [section]: {
        ...((prev as any)[section] || (data as any)?.[section] || {}),
        [field]: value
      }
    }))
  }

  const updateArrayField = (section: string, field: string, index: number, value: string) => {
    setTempData(prev => {
      const currentSection = (prev as any)[section] || (data as any)?.[section] || {}
      const currentArray = currentSection[field] || []
      const newArray = [...currentArray]
      newArray[index] = value
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: newArray
        }
      }
    })
  }

  const addToArrayField = (section: string, field: string, defaultValue: string = '') => {
    setTempData(prev => {
      const currentSection = (prev as any)[section] || (data as any)?.[section] || {}
      const currentArray = currentSection[field] || []
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: [...currentArray, defaultValue]
        }
      }
    })
  }

  const removeFromArrayField = (section: string, field: string, index: number) => {
    setTempData(prev => {
      const currentSection = (prev as any)[section] || (data as any)?.[section] || {}
      const currentArray = currentSection[field] || []
      const newArray = currentArray.filter((_: any, i: number) => i !== index)
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: newArray
        }
      }
    })
  }

  const toggleArrayValue = (section: string, field: string, value: string) => {
    setTempData(prev => {
      const currentSection = (prev as any)[section] || (data as any)?.[section] || {}
      const currentArray = currentSection[field] || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: newArray
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Onboarding not completed</p>
            <p className="text-sm text-gray-500">Please complete the onboarding process to access your data</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getCurrentData = (path: string) => {
    const keys = path.split('.')
    let current: any = { ...data, ...tempData }
    for (const key of keys) {
      current = current?.[key]
    }
    return current
  }

  return (
    <div className="space-y-6">
      {/* Personal & Company Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Personal & Company Information
            </CardTitle>
            <CardDescription>Your basic profile and company details</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === 'personal' ? (
              <>
                <Button
                  onClick={saveSection}
                  disabled={saving}
                  size="sm"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEditing('personal')} variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === 'personal' ? (
            <div className="space-y-4">
              <TextInput
                label="Full Name"
                name="fullName"
                value={getCurrentData('fullName') || ''}
                onChange={(name, value) => updateTempData('fullName', value)}
                placeholder="Enter your full name"
              />
              <TextInput
                label="Role"
                name="role"
                value={getCurrentData('role') || ''}
                onChange={(name, value) => updateTempData('role', value)}
                placeholder="Enter your role"
              />
              <TextInput
                label="Company Name"
                name="companyName"
                value={getCurrentData('companyName') || ''}
                onChange={(name, value) => updateTempData('companyName', value)}
                placeholder="Enter company name"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Website</label>
                  <UrlInput
                    value={getCurrentData('companyWebsiteUrl') || ''}
                    onChange={(index, value) => updateTempData('companyWebsiteUrl', value)}
                    placeholder="company-website.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <UrlInput
                    value={getCurrentData('companyLinkedInUrl') || ''}
                    onChange={(index, value) => updateTempData('companyLinkedInUrl', value)}
                    placeholder="linkedin.com/company/your-company"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-base">{data.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-base">{data.role}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p className="text-base">{data.companyName}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <p className="text-base text-blue-600">{data.companyWebsiteUrl}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                  <p className="text-base text-blue-600">{data.companyLinkedInUrl}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Overview
            </CardTitle>
            <CardDescription>Industry, size, and description</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === 'companyOverview' ? (
              <>
                <Button
                  onClick={saveSection}
                  disabled={saving}
                  size="sm"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEditing('companyOverview')} variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === 'companyOverview' ? (
            <div className="space-y-4">
              <SelectInput
                name="industry"
                value={getCurrentData('companyOverview.industry') || ''}
                onChange={(name, value) => updateNestedTempData('companyOverview', 'industry', value)}
                options={industryOptions}
                label="Industry"
                icon={<Building className="h-5 w-5 text-purple-300" />}
              />
              <SelectInput
                name="employees"
                value={getCurrentData('companyOverview.employees') || ''}
                onChange={(name, value) => updateNestedTempData('companyOverview', 'employees', value)}
                options={employeeOptions}
                label="Number of Employees"
                icon={<Users className="h-5 w-5 text-purple-300" />}
              />
              <TextareaInput
                name="description"
                value={getCurrentData('companyOverview.description') || ''}
                onChange={(name, value) => updateNestedTempData('companyOverview', 'description', value)}
                label="Company Description"
                icon={<Building className="h-5 w-5 text-purple-300" />}
                placeholder="Enter company description"
                rows={4}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Industry</p>
                  <Badge variant="secondary">{data.companyOverview.industry}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Company Size</p>
                  <Badge variant="secondary">{data.companyOverview.employees}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-base mt-1">{data.companyOverview.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Target Audience & Markets
            </CardTitle>
            <CardDescription>Your target customers and geographic focus</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === 'audience' ? (
              <>
                <Button
                  onClick={saveSection}
                  disabled={saving}
                  size="sm"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEditing('audience')} variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === 'audience' ? (
            <div className="space-y-4">
              <TextareaInput
                name="targetAudience"
                value={getCurrentData('audience.targetAudience') || ''}
                onChange={(name, value) => updateNestedTempData('audience', 'targetAudience', value)}
                label="Target Audience"
                icon={<Users className="h-5 w-5 text-purple-300" />}
                placeholder="Describe your ideal customers"
                rows={4}
              />
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-purple-300 mr-2" />
                  <label className="block text-sm font-medium">Geographic Markets</label>
                </div>
                <SelectedTags 
                  items={getCurrentData('audience.geographicMarkets') || []} 
                  onRemove={(value) => toggleArrayValue('audience', 'geographicMarkets', value)} 
                />
                <CheckboxGroup
                  options={availableMarkets.map(market => ({ value: market, label: market }))}
                  selectedValues={getCurrentData('audience.geographicMarkets') || []}
                  onChange={(value) => toggleArrayValue('audience', 'geographicMarkets', value)}
                  columns={3}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Target Audience</p>
                <p className="text-base mt-1">{data.audience.targetAudience}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Geographic Markets</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.audience.geographicMarkets.map((market, index) => (
                    <Badge key={index} variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      {market}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brand Styles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Brand Styles & Positioning
            </CardTitle>
            <CardDescription>Your brand voice, competitors, and messaging</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === 'brandStyles' ? (
              <>
                <Button
                  onClick={saveSection}
                  disabled={saving}
                  size="sm"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEditing('brandStyles')} variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === 'brandStyles' ? (
            <div className="space-y-8">
              {/* Brand Voice */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Brand Voice</h3>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <CheckboxGroup
                    options={brandVoiceOptions}
                    selectedValues={getCurrentData('brandStyles.brandVoices') || []}
                    onChange={(value) => toggleArrayValue('brandStyles', 'brandVoices', value)}
                    columns={2}
                  />
                </div>
              </div>

              {/* Competitors */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Competitors</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {(getCurrentData('brandStyles.competitors') || []).length}/5 added
                  </Badge>
                </div>
                <div className="space-y-3">
                  {(getCurrentData('brandStyles.competitors') || []).map((competitor: string, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <UrlInput
                        value={competitor}
                        index={index}
                        onChange={(i, value) => updateArrayField('brandStyles', 'competitors', i, value)}
                        onRemove={() => removeFromArrayField('brandStyles', 'competitors', index)}
                        showRemoveButton={true}
                        placeholder="competitor-website.com"
                      />
                    </div>
                  ))}
                  {(getCurrentData('brandStyles.competitors') || []).length < 5 && (
                    <Button
                      type="button"
                      onClick={() => addToArrayField('brandStyles', 'competitors')}
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Competitor
                    </Button>
                  )}
                </div>
              </div>

              {/* Differentiator */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">What Makes You Different</h3>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <TextareaInput
                    name="differentiator"
                    value={getCurrentData('brandStyles.differentiator') || ''}
                    onChange={(name, value) => updateNestedTempData('brandStyles', 'differentiator', value)}
                    placeholder="Describe what sets your company apart from competitors..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Marketing Messages */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Key Marketing Messages</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {(getCurrentData('brandStyles.keyMarketingMessages') || []).length}/5 added
                  </Badge>
                </div>
                <div className="space-y-3">
                  {(getCurrentData('brandStyles.keyMarketingMessages') || []).map((message: string, index: number) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <MessageInput
                        value={message}
                        index={index}
                        onChange={(i, value) => updateArrayField('brandStyles', 'keyMarketingMessages', i, value)}
                        onRemove={() => removeFromArrayField('brandStyles', 'keyMarketingMessages', index)}
                        showRemoveButton={true}
                        placeholder="Enter a key marketing message..."
                      />
                    </div>
                  ))}
                  {(getCurrentData('brandStyles.keyMarketingMessages') || []).length < 5 && (
                    <Button
                      type="button"
                      onClick={() => addToArrayField('brandStyles', 'keyMarketingMessages')}
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Message
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Brand Voice</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.brandStyles.brandVoices.map((voice, index) => (
                    <Badge key={index} variant="secondary">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {voice}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-500">Competitors</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.brandStyles.competitors.map((competitor, index) => (
                    <Badge key={index} variant="outline">
                      {competitor}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-500">Differentiator</p>
                <p className="text-base mt-1">{data.brandStyles.differentiator}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-500">Key Marketing Messages</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {data.brandStyles.keyMarketingMessages.map((message, index) => (
                    <li key={index} className="text-base">{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Business Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Business Goals
            </CardTitle>
            <CardDescription>Your objectives and strategic focus</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === 'businessGoals' ? (
              <>
                <Button
                  onClick={saveSection}
                  disabled={saving}
                  size="sm"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEditing('businessGoals')} variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === 'businessGoals' ? (
            <div className="space-y-8">
              {/* Selected Objectives */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Selected Objectives</h3>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {businessObjectives.map((objective) => {
                      const isSelected = (getCurrentData('businessGoals.selectedObjectives') || []).includes(objective.id)
                      return (
                        <div key={objective.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
                          <input
                            type="checkbox"
                            id={`objective-${objective.id}`}
                            checked={isSelected}
                            onChange={() => toggleArrayValue('businessGoals', 'selectedObjectives', objective.id)}
                            className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                          />
                          <label
                            htmlFor={`objective-${objective.id}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                          >
                            {objective.label}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Objective Descriptions */}
              {(getCurrentData('businessGoals.selectedObjectives') || []).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Describe Your Objectives</h3>
                  </div>
                  <div className="space-y-3">
                    {(getCurrentData('businessGoals.selectedObjectives') || []).map((objectiveId: string) => {
                      const objective = businessObjectives.find(obj => obj.id === objectiveId)
                      if (!objective) return null

                      const isExpanded = getCurrentData(`businessGoals.expandedSections.${objectiveId}`) || false

                      return (
                        <div key={objectiveId} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                          <div
                            className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              const current = getCurrentData('businessGoals.expandedSections') || {}
                              updateNestedTempData('businessGoals', 'expandedSections', {
                                ...current,
                                [objectiveId]: !isExpanded
                              })
                            }}
                          >
                            <h5 className="font-medium text-gray-900">{objective.label}</h5>
                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>

                          {isExpanded && (
                            <div className="px-4 pb-4 border-t border-gray-100">
                              <textarea
                                value={getCurrentData(`businessGoals.objectiveDescriptions.${objectiveId}`) || ''}
                                onChange={(e) => {
                                  const current = getCurrentData('businessGoals.objectiveDescriptions') || {}
                                  updateNestedTempData('businessGoals', 'objectiveDescriptions', {
                                    ...current,
                                    [objectiveId]: e.target.value
                                  })
                                }}
                                rows={3}
                                className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder={`Describe your ${objective.label.toLowerCase()} objective in detail...`}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Custom Objectives */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Custom Objectives</h3>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      const currentCustom = getCurrentData('businessGoals.customObjectives') || []
                      const newObjective = {
                        id: `custom_${Date.now()}`,
                        name: '',
                        description: ''
                      }
                      updateNestedTempData('businessGoals', 'customObjectives', [...currentCustom, newObjective])
                    }}
                    size="sm"
                    variant="outline"
                    className="border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Objective
                  </Button>
                </div>

                <div className="space-y-3">
                  {(getCurrentData('businessGoals.customObjectives') || []).map((customObj: any, index: number) => (
                    <div key={customObj.id || index} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-start mb-3">
                        <input
                          type="text"
                          value={customObj.name || ''}
                          onChange={(e) => {
                            const current = getCurrentData('businessGoals.customObjectives') || []
                            const updated = current.map((obj: any, i: number) => 
                              i === index ? { ...obj, name: e.target.value } : obj
                            )
                            updateNestedTempData('businessGoals', 'customObjectives', updated)
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter objective name..."
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const current = getCurrentData('businessGoals.customObjectives') || []
                            const updated = current.filter((_: any, i: number) => i !== index)
                            updateNestedTempData('businessGoals', 'customObjectives', updated)
                          }}
                          size="sm"
                          variant="ghost"
                          className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <textarea
                        value={customObj.description || ''}
                        onChange={(e) => {
                          const current = getCurrentData('businessGoals.customObjectives') || []
                          const updated = current.map((obj: any, i: number) => 
                            i === index ? { ...obj, description: e.target.value } : obj
                          )
                          updateNestedTempData('businessGoals', 'customObjectives', updated)
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe your objective in detail..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.businessGoals?.selectedObjectives?.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {data.businessGoals.selectedObjectives.map((objectiveId: string) => {
                      const objective = businessObjectives.find(obj => obj.id === objectiveId)
                      const description = data.businessGoals.objectiveDescriptions?.[objectiveId]
                      return objective ? (
                        <div key={objectiveId} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="font-medium text-sm">{objective.label}</span>
                          </div>
                          {description && (
                            <p className="text-xs text-gray-600 ml-4">{description}</p>
                          )}
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* Custom Objectives */}
                  {data.businessGoals.customObjectives?.length > 0 && (
                    <div className="space-y-3 pt-2 border-t">
                      <h5 className="text-sm font-medium text-gray-700">Custom Objectives</h5>
                      {data.businessGoals.customObjectives.map((customObj: any) => (
                        <div key={customObj.id} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="font-medium text-sm">{customObj.name}</span>
                          </div>
                          {customObj.description && (
                            <p className="text-xs text-gray-600 ml-4">{customObj.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">No objectives selected</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}