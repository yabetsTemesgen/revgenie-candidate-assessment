"use client"

import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import TextInput from '../text-input';
import UrlInput from '../url-input';
import { useOnboarding } from '../../contexts/Onboarding/onboarding-context';

/**
 * OnboardingForm - Presentational component for the onboarding form
 * Responsible only for rendering the UI based on props
 */
const OnboardingForm: React.FC = () => {
  // Get all data and handlers from context
  const { 
    formData, 
    updateTextInput, 
    updateCompanyLinkedInUrl, // Added
    updateCompanyWebsiteUrl, // Added
    updateResource, 
    addResource, 
    removeResource, 
    handleStepSubmit 
  } = useOnboarding();

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-6">Welcome to your Geniverse</h1>
          <p className="text-xl text-purple-200 mb-8">
            Tell the Genies more about you and your company so we can prefill the onboarding for you.
            <br /><br />
            <em>Our Motto: "Let the Geni do the work for you!"</em>
          </p>

          {/* Onboarding form */}
          <form onSubmit={(e) => handleStepSubmit('initial', e)} className="space-y-6">
            {/* Company and user information */}
            <TextInput 
              label="Company Name" 
              name="companyName"
              value={formData.companyName}
              onChange={updateTextInput}
              placeholder="Enter your company name" 
              required 
            />
            
            <TextInput 
              label="Your Name" 
              name="fullName"
              value={formData.fullName}
              onChange={updateTextInput}
              placeholder="Enter your full name" 
              required 
            />
            
            <TextInput 
              label="Your Role" 
              name="role"
              value={formData.role}
              onChange={updateTextInput}
              placeholder="Enter your role (e.g. Marketing Manager)" 
              required 
            />

            {/* Company LinkedIn URL */}
            <p className="text-sm text-purple-200">Company LinkedIn URL</p>
            <UrlInput
              value={formData.companyLinkedInUrl}
              onChange={(_index, value) => updateCompanyLinkedInUrl(value)} // Pass dummy index, use value
              placeholder="https://www.linkedin.com/company/your-company"
              required
              // No index or onRemove needed for this dedicated field
            />

            {/* Company Website URL */}
            <p className="text-sm text-purple-200">Company Website URL</p>
            <UrlInput
              value={formData.companyWebsiteUrl}
              onChange={(_index, value) => updateCompanyWebsiteUrl(value)} // Pass dummy index, use value
              placeholder="https://www.yourcompany.com"
              // Not strictly required by the webhook call, but good to have
              // No index or onRemove needed for this dedicated field
            />

            {/* Resource URLs section (for additional URLs) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-purple-200">
                  Additional Resources (e.g., Product Hunt, News Articles, etc.)
                </label>
                <span className="text-xs text-purple-300">{formData.resources.length}/5 added</span>
              </div>

              {/* Resource URL inputs */}
              {formData.resources.map((resource, index) => (
                <UrlInput
                  key={index}
                  value={resource}
                  index={index}
                  onChange={updateResource}
                  onRemove={() => removeResource(index)}
                  showRemoveButton={formData.resources.length > 1}
                />
              ))}

              {/* Add resource button */}
              {formData.resources.length < 5 && (
                <button
                  type="button"
                  onClick={addResource}
                  className="inline-flex items-center text-sm text-purple-300 hover:text-white focus:outline-none"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add another resource
                </button>
              )}
            </div>

            {/* Submit button */}
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

export default OnboardingForm;