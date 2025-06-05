"use client"

import React from 'react';
import { ArrowLeft, Check, Users, Globe } from "lucide-react";
import Link from "next/link";
import TextareaInput from '../../textarea-input';
import CheckboxGroup from '../../checkbox-group';
import SelectedTags from '../../selected-tags';
import { useAudience } from '../../../contexts/Onboarding/audience-context';

/**
 * AudienceForm - Presentational component for the audience form
 * Responsible only for rendering the UI based on props
 */
const AudienceForm: React.FC = () => {
  // Get all data and handlers from context
  const { 
    audienceData, 
    availableMarkets, 
    updateTargetAudience, 
    toggleMarket, 
    handleSubmit 
  } = useAudience();

  // Convert available markets to checkbox options
  const marketOptions = availableMarkets.map(market => ({
    value: market,
    label: market
  }));

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/onboarding/company-overview"
          className="inline-flex items-center text-purple-200 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to company overview
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-green-400 font-medium">AI Analysis Complete</p>
          </div>

          <h1 className="text-3xl font-bold mb-6">Target Audience & Markets</h1>
          <p className="text-xl text-purple-200 mb-8">
            Based on your company profile, we've identified your likely target audience and geographic focus. Please
            review and adjust if needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextareaInput
              name="targetAudience"
              value={audienceData.targetAudience}
              onChange={(name, value) => updateTargetAudience(value)}
              label="Target Audience"
              icon={<Users className="h-5 w-5 text-purple-300" />}
              placeholder="Describe your ideal customers and target audience"
              required
              helpText="Be specific about company size, industry, roles, and pain points of your ideal customers."
              rows={4}
            />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-purple-300 mr-2" />
                <label className="block text-sm font-medium text-purple-200">Geographic Markets</label>
              </div>

              <SelectedTags 
                items={audienceData.geographicMarkets} 
                onRemove={toggleMarket} 
              />

              <CheckboxGroup
                options={marketOptions}
                selectedValues={audienceData.geographicMarkets}
                onChange={toggleMarket}
                columns={3}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-white text-[#5a17d6] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AudienceForm;
