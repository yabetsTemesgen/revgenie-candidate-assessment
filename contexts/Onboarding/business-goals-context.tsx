"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useOnboarding } from './onboarding-context'; // Import the global context hook

// Define the shape of an objective
interface Objective {
  id: string;
  label: string;
  description: string;
}

// Define the shape of a custom objective
interface CustomObjective {
  id: string;
  name: string;
  description: string;
}

// Define the shape of our business goals data
interface BusinessGoalsData {
  selectedObjectives: string[];
  objectiveDescriptions: Record<string, string>;
  expandedSections: Record<string, boolean>;
  customObjectives: CustomObjective[];
}

// Define the context shape
interface BusinessGoalsContextType {
  businessGoalsData: BusinessGoalsData;
  allObjectives: Objective[];
  toggleObjective: (objectiveId: string) => void;
  updateObjectiveDescription: (objectiveId: string, description: string) => void;
  toggleExpanded: (objectiveId: string) => void;
  addCustomObjective: () => void;
  removeCustomObjective: (id: string) => void;
  updateCustomObjectiveName: (id: string, name: string) => void;
  updateCustomObjectiveDescription: (id: string, description: string) => void;
  toggleCustomObjectiveExpanded: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Create the context with a default value
const BusinessGoalsContext = createContext<BusinessGoalsContextType | undefined>(undefined);

// Provider component
export const BusinessGoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const onboardingContext = useOnboarding();

  if (!onboardingContext) {
    throw new Error('useBusinessGoals must be used within an OnboardingProvider, which itself must be within an OnboardingProvider.');
  }

  const {
    formData,
    allObjectives, // Get allObjectives from global context
    toggleObjective,
    updateObjectiveDescription,
    toggleExpanded,
    addCustomObjective,
    removeCustomObjective,
    updateCustomObjectiveName,
    updateCustomObjectiveDescription,
    toggleCustomObjectiveExpanded,
    handleStepSubmit
  } = onboardingContext;

  const businessGoalsData = formData.businessGoals;

  // handleSubmit now calls the global context's step submission handler
  const handleSubmit = (e: React.FormEvent) => {
    handleStepSubmit('business-goals', e);
  };
  
  // Provide the context value to children
  // Children will consume data derived from global state and the delegated update functions
  return (
    <BusinessGoalsContext.Provider 
      value={{ 
        businessGoalsData, // This is now formData.businessGoals from the global context
        allObjectives,    // This is now allObjectives from the global context
        toggleObjective,  // Delegated from global context
        updateObjectiveDescription, // Delegated
        toggleExpanded,             // Delegated
        addCustomObjective,         // Delegated
        removeCustomObjective,      // Delegated
        updateCustomObjectiveName,  // Delegated
        updateCustomObjectiveDescription, // Delegated
        toggleCustomObjectiveExpanded, // Delegated
        handleSubmit                // Points to local handleSubmit which calls global handleStepSubmit
      }}
    >
      {children}
    </BusinessGoalsContext.Provider>
  );
};

// Custom hook for using the business goals context
export const useBusinessGoals = () => {
  const context = useContext(BusinessGoalsContext);
  if (context === undefined) {
    throw new Error('useBusinessGoals must be used within a BusinessGoalsProvider');
  }
  return context;
};
