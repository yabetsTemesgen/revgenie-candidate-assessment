"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useOnboarding, BrandData } from './onboarding-context'; // Import BrandData

// BrandData is now imported from onboarding-context.tsx

// Define the context shape
interface BrandStylesContextType {
  brandData: BrandData;
  brandVoiceOptions: { value: string; label: string }[];
  toggleBrandVoice: (value: string) => void;
  updateDifferentiator: (value: string) => void;
  addMarketingMessage: () => void;
  removeMarketingMessage: (index: number) => void;
  updateMarketingMessage: (index: number, value: string) => void;
  addCompetitor: () => void;
  removeCompetitor: (index: number) => void;
  updateCompetitor: (index: number, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Create the context with a default value
const BrandStylesContext = createContext<BrandStylesContextType | undefined>(undefined);

// Provider component
export const BrandStylesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    formData,
    brandVoiceOptions, // Sourced from OnboardingContext
    toggleBrandStyleVoice,
    updateBrandStyleDifferentiator,
    addBrandStyleMarketingMessage,
    removeBrandStyleMarketingMessage,
    updateBrandStyleMarketingMessage,
    addBrandStyleCompetitor,
    removeBrandStyleCompetitor,
    updateBrandStyleCompetitor,
    handleStepSubmit, // Use global step submit for navigation
  } = useOnboarding();

  const brandData = formData.brandStyles;

  // Wrapper functions that call OnboardingContext updaters
  const toggleBrandVoice = (value: string) => toggleBrandStyleVoice(value);
  const updateDifferentiator = (value: string) => updateBrandStyleDifferentiator(value);
  const addMarketingMessage = () => addBrandStyleMarketingMessage();
  const removeMarketingMessage = (index: number) => removeBrandStyleMarketingMessage(index);
  const updateMarketingMessage = (index: number, value: string) => updateBrandStyleMarketingMessage(index, value);
  const addCompetitor = () => addBrandStyleCompetitor();
  const removeCompetitor = (index: number) => removeBrandStyleCompetitor(index);
  const updateCompetitor = (index: number, value: string) => updateBrandStyleCompetitor(index, value);

  // Handle form submission for this step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields locally
    if (brandData.brandVoices.length === 0) {
      alert('Please select at least one Brand Voice');
      return;
    }
    if (brandData.competitors.length === 0 || brandData.competitors.some(comp => !comp.trim())) {
      alert('Please provide at least one valid competitor URL');
      return;
    }
    if (!brandData.differentiator.trim()) {
      alert('Differentiator is required');
      return;
    }
    if (brandData.keyMarketingMessages.length === 0 || brandData.keyMarketingMessages.some(msg => !msg.trim())) {
      alert('Please provide at least one valid Marketing Message');
      return;
    }
    
    // Log current step data (optional)
    console.log("Brand Styles step data submitted:", brandData);
    
    // Call global step submit, which handles navigation
    handleStepSubmit('brand-styles', e);
  };

  // Provide the context value to children
  // Data and options are from OnboardingContext; functions are local wrappers or direct calls
  return (
    <BrandStylesContext.Provider 
      value={{ 
        brandData, // from onboardingContext.formData.brandStyles
        brandVoiceOptions, // from onboardingContext.brandVoiceOptions
        toggleBrandVoice, // local wrapper
        updateDifferentiator, // local wrapper
        addMarketingMessage, // local wrapper
        removeMarketingMessage, // local wrapper
        updateMarketingMessage, // local wrapper
        addCompetitor, // local wrapper
        removeCompetitor, // local wrapper
        updateCompetitor, // local wrapper
        handleSubmit // local submit handler that calls onboardingContext.handleStepSubmit
      }}
    >
      {children}
    </BrandStylesContext.Provider>
  );
};

// Custom hook for using the brand styles context
export const useBrandStyles = () => {
  const context = useContext(BrandStylesContext);
  if (context === undefined) {
    throw new Error('useBrandStyles must be used within a BrandStylesProvider');
  }
  return context;
};
