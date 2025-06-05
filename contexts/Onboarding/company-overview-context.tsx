"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useOnboarding } from './onboarding-context'; // Import the global context hook

// Define the shape of our company data
interface CompanyData {
  employees: string;
  industry: string;
  description: string;
}

// Define the context shape
interface CompanyOverviewContextType {
  companyData: CompanyData;
  updateField: (field: keyof CompanyData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Create the context with a default value
const CompanyOverviewContext = createContext<CompanyOverviewContextType | undefined>(undefined);

// Provider component
export const CompanyOverviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const onboardingContext = useOnboarding();

  if (!onboardingContext) {
    // This should ideally not happen if OnboardingProvider is correctly placed higher in the tree
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }

  const { formData, updateCompanyOverviewField, handleStepSubmit } = onboardingContext;
  const companyData = formData.companyOverview;

  // The updateField function now calls the global context's updater
  const updateField = (field: keyof CompanyData, value: string) => {
    updateCompanyOverviewField(field, value);
  };

  // The handleSubmit function now calls the global context's step submission handler
  const handleSubmit = (e: React.FormEvent) => {
    // The actual navigation and global state submission is handled by handleStepSubmit
    handleStepSubmit('company-overview', e);
  };

  // Provide the context value to children
  // Children will consume companyData (derived from global state) and the modified updateField/handleSubmit
  return (
    <CompanyOverviewContext.Provider 
      value={{ 
        companyData, // This is now formData.companyOverview from the global context
        updateField, 
        handleSubmit 
      }}
    >
      {children}
    </CompanyOverviewContext.Provider>
  );
};

// Custom hook for using the company overview context
export const useCompanyOverview = () => {
  const context = useContext(CompanyOverviewContext);
  if (context === undefined) {
    throw new Error('useCompanyOverview must be used within a CompanyOverviewProvider');
  }
  return context;
};
