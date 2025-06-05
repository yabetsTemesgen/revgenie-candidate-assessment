"use client"

import React from 'react';
import { ArrowLeft, Check, Building, Users, Globe, MessageSquare, Target } from "lucide-react";
import Link from "next/link";
import { OnboardingFormData, Objective } from '../../../contexts/Onboarding/onboarding-context';

/**
 * SummaryView - Presentational component for the summary page
 * Responsible only for rendering the UI based on props
 */
interface SummaryViewProps {
  formData: OnboardingFormData;
  allObjectives: Objective[];
  onSubmit: (event: React.FormEvent) => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ formData, allObjectives, onSubmit }) => {

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/onboarding/business-goals"
          className="inline-flex items-center text-purple-200 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to business goals
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-green-400 font-medium">Onboarding Information Complete</p>
          </div>

          <h1 className="text-3xl font-bold mb-6">Summary</h1>
          <p className="text-xl text-purple-200 mb-8">
            Please review all the information you've provided. If everything looks correct, click "Complete Onboarding"
            to proceed to your dashboard.
          </p>

          <div className="space-y-8">
            {/* Company Information */}
            <div className="bg-[#3a0a96] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Building className="h-5 w-5 text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold">Company Information</h2>
              </div>
              <div className="space-y-3 pl-7">
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Company Name</h3>
                  <p>{formData.companyName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Industry</h3>
                  <p>{formData.companyOverview.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Company Size</h3>
                  <p>{formData.companyOverview.employees} employees</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Description</h3>
                  <p className="text-sm">{formData.companyOverview.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Your Name & Role</h3>
                  <p>
                    {formData.fullName}, {formData.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-[#3a0a96] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Globe className="h-5 w-5 text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold">Resources</h2>
              </div>
              <div className="space-y-2 pl-7">
                {formData.resources.map((resource, index) => (
                  <p key={index} className="text-purple-200 break-words">
                    {resource}
                  </p>
                ))}
              </div>
            </div>

            {/* Target Audience & Markets */}
            <div className="bg-[#3a0a96] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold">Target Audience & Markets</h2>
              </div>
              <div className="space-y-3 pl-7">
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Target Audience</h3>
                  <p className="text-sm">{formData.audience.targetAudience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Geographic Markets</h3>
                  {formData.audience.geographicMarkets.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {formData.audience.geographicMarkets.map((market, index) => (
                        <li key={index}>{market}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">No geographic markets specified.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Brand Styles & Positioning */}
            <div className="bg-[#3a0a96] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-purple-300 mr-2" /> {/* Reusing MessageSquare, or consider 'Palette' or 'Sparkles' if more appropriate and available */}
                <h2 className="text-xl font-semibold">Brand Styles & Positioning</h2>
              </div>
              <div className="space-y-3 pl-7">
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Brand Voices</h3>
                  {formData.brandStyles.brandVoices.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {formData.brandStyles.brandVoices.map((voice, index) => (
                        <li key={index}>{voice}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">No brand voices specified.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Differentiator</h3>
                  <p className="text-sm">{formData.brandStyles.differentiator}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Key Marketing Messages</h3>
                  {formData.brandStyles.keyMarketingMessages.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {formData.brandStyles.keyMarketingMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">No key marketing messages specified.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-300">Competitors</h3>
                  {formData.brandStyles.competitors.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {formData.brandStyles.competitors.map((competitor, index) => (
                        <li key={index}>{competitor}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">No competitors specified.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Goals */}
            <div className="bg-[#3a0a96] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Target className="h-5 w-5 text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold">Business Goals</h2>
              </div>
              <div className="space-y-4 pl-7">
                {formData.businessGoals.selectedObjectives.map((objectiveId) => {
                  // FIXED: objectiveId is a string ID, need to look up the full object
                  const objectiveDetails = allObjectives.find(obj => obj.id === objectiveId);
                  const description = formData.businessGoals.objectiveDescriptions[objectiveId];
                  
                  return (
                    <div key={objectiveId}>
                      <h3 className="text-sm font-medium text-purple-300">
                        {objectiveDetails?.label || objectiveId}
                      </h3>
                      <p className="text-sm">
                        {description || (objectiveDetails?.description) || 'No description provided.'}
                      </p>
                    </div>
                  );
                })}
                {formData.businessGoals.customObjectives.map((customGoal) => (
                  <div key={customGoal.id}>
                    <h3 className="text-sm font-medium text-purple-300">{customGoal.name} (Custom)</h3>
                    <p className="text-sm">{customGoal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onSubmit}
              className="bg-white text-[#5a17d6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Complete Onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
