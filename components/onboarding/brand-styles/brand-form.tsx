"use client"

import React from 'react';
import { ArrowLeft, Check, MessageSquare, Users, Lightbulb, Plus } from "lucide-react";
import Link from "next/link";
import TextareaInput from '../../textarea-input';
import CheckboxGroup from '../../checkbox-group';
import UrlInput from '../../url-input';
import MessageInput from '../../message-input';
import { useBrandStyles } from '../../../contexts/Onboarding/brand-styles-context';

/**
 * BrandForm - Presentational component for the brand styles form
 * Responsible only for rendering the UI based on props
 */
const BrandForm: React.FC = () => {
  // Get all data and handlers from context
  const { 
    brandData, 
    brandVoiceOptions,
    toggleBrandVoice,
    updateDifferentiator,
    addMarketingMessage,
    removeMarketingMessage,
    updateMarketingMessage,
    addCompetitor,
    removeCompetitor,
    updateCompetitor,
    handleSubmit 
  } = useBrandStyles();

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/onboarding/audience" className="inline-flex items-center text-purple-200 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to audience & markets
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-green-400 font-medium">AI Analysis Complete</p>
          </div>

          <h1 className="text-3xl font-bold mb-6">Brand Styles & Positioning</h1>
          <p className="text-xl text-purple-200 mb-8">
            We've analyzed your brand's communication style and market positioning. Please review and adjust if needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <CheckboxGroup
              options={brandVoiceOptions}
              selectedValues={brandData.brandVoices}
              onChange={toggleBrandVoice}
              label="Brand Voice"
              icon={<MessageSquare className="h-5 w-5 text-purple-300" />}
              columns={2}
              required
              className="mb-2"
            />
            <p className="text-xs text-purple-300 mb-4">
              Your brand voice defines how you communicate with your audience across all channels.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-300 mr-2" />
                  <label className="block text-sm font-medium text-purple-200">Competitors</label>
                </div>
                <span className="text-xs text-purple-300">{brandData.competitors.length}/5 added</span>
              </div>

              {brandData.competitors.map((competitor, index) => (
                <UrlInput
                  key={index}
                  value={competitor}
                  index={index}
                  onChange={updateCompetitor}
                  onRemove={() => removeCompetitor(index)}
                  showRemoveButton={brandData.competitors.length > 1}
                  placeholder="competitor-website.com"
                  required
                />
              ))}

              {brandData.competitors.length < 5 && (
                <button
                  type="button"
                  onClick={addCompetitor}
                  className="inline-flex items-center text-sm text-purple-300 hover:text-white focus:outline-none"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add another competitor
                </button>
              )}
            </div>

            <TextareaInput
              name="differentiator"
              value={brandData.differentiator}
              onChange={(name, value) => updateDifferentiator(value)}
              label="What Makes You Different"
              icon={<Lightbulb className="h-5 w-5 text-purple-300" />}
              placeholder="Describe what sets your company apart from competitors"
              required
              helpText="Your unique value proposition helps us position your brand effectively in the market."
              rows={4}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-purple-300 mr-2" />
                  <label className="block text-sm font-medium text-purple-200">Your Key Marketing Messages</label>
                </div>
                <span className="text-xs text-purple-300">{brandData.keyMarketingMessages.length}/5 added</span>
              </div>

              {brandData.keyMarketingMessages.map((message, index) => (
                <MessageInput
                  key={index}
                  value={message}
                  index={index}
                  onChange={updateMarketingMessage}
                  onRemove={() => removeMarketingMessage(index)}
                  showRemoveButton={brandData.keyMarketingMessages.length > 1}
                  placeholder="Enter a concise marketing message"
                  required
                />
              ))}

              {brandData.keyMarketingMessages.length < 5 && (
                <button
                  type="button"
                  onClick={addMarketingMessage}
                  className="inline-flex items-center text-sm text-purple-300 hover:text-white focus:outline-none"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add another marketing message
                </button>
              )}
              
              <p className="text-xs text-purple-300">
                These messages will be used to create content that resonates with your target audience.
              </p>
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

export default BrandForm;
