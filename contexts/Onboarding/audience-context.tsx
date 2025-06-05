"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useOnboarding, AudienceData } from './onboarding-context'; // Import AudienceData

// Define the context shape
interface AudienceContextType {
  audienceData: AudienceData;
  availableMarkets: string[];
  updateTargetAudience: (value: string) => void;
  toggleMarket: (market: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Create the context with a default value
const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

// Provider component
export const AudienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    formData,
    availableMarkets, // Sourced from OnboardingContext
    updateAudienceTargetAudience,
    toggleAudienceMarket,
    handleStepSubmit, // Use global step submit for navigation
  } = useOnboarding();

  const audienceData = formData.audience;

  // Update target audience - delegates to OnboardingContext
  const updateTargetAudience = (value: string) => {
    updateAudienceTargetAudience(value);
  };

  // Toggle a geographic market - delegates to OnboardingContext
  const toggleMarket = (market: string) => {
    toggleAudienceMarket(market);
  };

  // Handle form submission for this step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields locally
    if (!audienceData.targetAudience.trim()) {
      alert('Target Audience is required');
      return;
    }
    
    if (audienceData.geographicMarkets.length === 0) {
      alert('Please select at least one Geographic Market');
      return;
    }
    
    // Log current step data (optional)
    console.log("Audience step data submitted:", audienceData);
    
    // Call global step submit, which handles navigation
    handleStepSubmit('audience', e);
  };

  // Provide the context value to children
  // The 'audienceData' and 'availableMarkets' are directly from OnboardingContext
  // The functions 'updateTargetAudience', 'toggleMarket', and 'handleSubmit' are now wrappers or direct calls
  return (
    <AudienceContext.Provider 
      value={{ 
        audienceData, // from onboardingContext.formData.audience
        availableMarkets, // from onboardingContext.availableMarkets
        updateTargetAudience, // local wrapper for onboardingContext.updateAudienceTargetAudience
        toggleMarket, // local wrapper for onboardingContext.toggleAudienceMarket
        handleSubmit // local submit handler that calls onboardingContext.handleStepSubmit
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
};

// Custom hook for using the audience context
export const useAudience = () => {
  const context = useContext(AudienceContext);
  if (context === undefined) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
};
