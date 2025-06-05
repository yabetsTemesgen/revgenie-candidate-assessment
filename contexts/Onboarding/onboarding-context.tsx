"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Define data structures for Onboarding
export interface CompanyData {
  employees: string;
  industry: string;
  description: string;
}

export interface CustomObjective {
  id: string;
  name: string;
  description: string;
  isEditing?: boolean; // Used for UI state during custom objective creation
}

// Note: 'Objective' interface is already defined and exported further down in this file.
// Ensure it matches: export interface Objective { id: string; label: string; description: string; }

export interface BusinessGoalsData {
  selectedObjectives: string[]; // Array of Objective IDs
  objectiveDescriptions: Record<string, string>; // Keyed by Objective ID
  expandedSections: Record<string, boolean>; // Keyed by Objective ID or custom objective ID
  customObjectives: CustomObjective[];
}

export interface AudienceData {
  targetAudience: string;
  geographicMarkets: string[];
}

export interface BrandData {
  brandVoices: string[];
  competitors: string[];
  differentiator: string;
  keyMarketingMessages: string[];
}

// OnboardingFormData (defined further down) will now use these local types.

// Define available geographic markets (from audience-context)
const AVAILABLE_MARKETS: string[] = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Australia",
  "South America",
  "Middle East",
  "Africa",
  "United Kingdom",
  "India",
  "China",
  "Japan",
];

// Define brand voice options (from brand-styles-context)
const BRAND_VOICE_OPTIONS: { value: string; label: string }[] = [
  { value: "bold", label: "Bold" },
  { value: "friendly", label: "Friendly" },
  { value: "technical", label: "Technical" },
  { value: "trustworthy", label: "Trustworthy" },
  { value: "creative", label: "Creative" },
  { value: "helpful", label: "Helpful" },
  { value: "empathetic", label: "Empathetic" },
  { value: "inspiring", label: "Inspiring" },
  { value: "witty", label: "Witty" },
  { value: "energetic", label: "Energetic" },
];

// Define initial brand styles data (empty for user input)
const initialBrandStylesData: BrandData = {
  brandVoices: [],
  competitors: [],
  differentiator: "",
  keyMarketingMessages: [],
};

// Define initial audience data (empty for user input)
const initialAudienceData: AudienceData = {
  targetAudience: "",
  geographicMarkets: [],
};

// Define the shape of our company data (empty for user input)
const initialCompanyData: CompanyData = {
  employees: "",
  industry: "",
  description: "",
};

// Define all possible objectives (mock from business-goals-context)
const allObjectivesMock: Objective[] = [
  {
    id: "increase_leads",
    label: "Increase Leads",
    description:
      "Aiming to increase qualified lead generation by 30% in the next quarter through improved targeting and conversion optimization.",
  },
  {
    id: "boost_revenue",
    label: "Boost Revenue",
    description:
      "Looking to increase monthly recurring revenue by 25% within the next 6 months by optimizing pricing strategy and reducing churn.",
  },
  {
    id: "grow_brand",
    label: "Grow Brand",
    description:
      "Focused on increasing brand awareness and recognition in the technology sector, particularly among decision-makers at mid-sized companies.",
  },
  {
    id: "expand_team",
    label: "Expand Team",
    description:
      "Planning to grow the team by adding 5-10 new roles in engineering and marketing over the next year to support product development and growth initiatives.",
  },
  {
    id: "enter_new_markets",
    label: "Enter New Markets",
    description:
      "Exploring expansion into European markets in the next 12 months, with particular focus on Germany and the UK.",
  },
  {
    id: "optimize_funnel",
    label: "Optimize Funnel",
    description:
      "Working to improve conversion rates throughout the sales funnel, particularly focusing on the demo-to-paid conversion which is currently at 15%.",
  },
  {
    id: "raise_funding",
    label: "Raise Funding",
    description:
      "Preparing for a Series A funding round in the next 6-8 months, targeting $5-7M to accelerate growth and product development.",
  },
  {
    id: "automate_tasks",
    label: "Automate Tasks",
    description:
      "Looking to implement automation for repetitive marketing and customer onboarding tasks to improve efficiency and reduce operational costs.",
  },
  {
    id: "retain_existing_customers",
    label: "Retain existing customers",
    description:
      "Looking to retain existing customers by providing exceptional customer service and support.",
  },
];

// Initial business goals data (empty for user input)
const initialBusinessGoalsData: BusinessGoalsData = {
  selectedObjectives: [],
  objectiveDescriptions: allObjectivesMock.reduce(
    (acc, obj) => {
      acc[obj.id] = obj.description;
      return acc;
    },
    {} as Record<string, string>
  ),
  expandedSections: {},
  customObjectives: [],
};

// Define the shape of our combined onboarding form data
export interface OnboardingFormData {
  // System fields
  jobId?: string;

  // Company Information
  companyName: string;
  fullName: string;
  role: string;
  companyLinkedInUrl: string; // New required field
  companyWebsiteUrl: string; // New dedicated field
  resources: string[]; // For additional URLs
  companyOverview: CompanyData;
  businessGoals: BusinessGoalsData;
  audience: AudienceData;
  brandStyles: BrandData;
}

export interface Objective {
  id: string;
  label: string;
  description: string;
}

// --- Webhook API Response Interfaces ---
export interface WebhookResponseObjective {
  objective: string;
  description: string;
}

export interface WebhookResponseItem {
  company_name: string;
  employee_range: string;
  industry: string;
  company_description: string;
  target_audience: string;
  geographic_markets: string[];
  brand_voice: string[];
  competitors: string[];
  differentiator: string;
  key_marketing_messages: string[];
  objectives: WebhookResponseObjective[];
}

export type WebhookResponseData = WebhookResponseItem[];
// --- End Webhook API Response Interfaces ---

// Define the context shape
interface OnboardingContextType {
  formData: OnboardingFormData;
  allObjectives: Objective[]; // Keep allObjectives accessible
  availableMarkets: string[];
  brandVoiceOptions: { value: string; label: string }[];
  updateTextInput: (name: keyof Pick<OnboardingFormData, 'companyName' | 'fullName' | 'role'>, value: string) => void;
  updateCompanyLinkedInUrl: (value: string) => void; // New updater
  updateCompanyWebsiteUrl: (value: string) => void; // New updater
  updateResource: (index: number, value: string) => void;
  addResource: () => void;
  removeResource: (index: number) => void;
  // Company Overview Updaters
  updateCompanyOverviewField: (field: keyof CompanyData, value: string) => void;
  // Business Goals Updaters
  toggleObjective: (objectiveId: string) => void;
  updateObjectiveDescription: (objectiveId: string, description: string) => void;
  toggleExpanded: (objectiveId: string) => void; // For standard objectives
  addCustomObjective: () => void;
  removeCustomObjective: (id: string) => void;
  updateCustomObjectiveName: (id: string, name: string) => void;
  updateCustomObjectiveDescription: (id: string, description: string) => void;
  toggleCustomObjectiveExpanded: (id: string) => void;
  updateAudienceTargetAudience: (value: string) => void;
  toggleAudienceMarket: (market: string) => void;
  // Brand Styles Updaters
  toggleBrandStyleVoice: (value: string) => void;
  updateBrandStyleDifferentiator: (value: string) => void;
  addBrandStyleMarketingMessage: () => void;
  removeBrandStyleMarketingMessage: (index: number) => void;
  updateBrandStyleMarketingMessage: (index: number, value: string) => void;
  addBrandStyleCompetitor: () => void;
  removeBrandStyleCompetitor: (index: number) => void;
  updateBrandStyleCompetitor: (index: number, value: string) => void; // For custom objectives
  // Global Submit
  handleSubmit: (e: React.FormEvent) => void; // This will likely be the final submit on summary page
  handleStepSubmit: (step: string, e?: React.FormEvent) => void; // For individual step submissions/validation
  prefillOnboardingDataFromApi: (apiResponse: WebhookResponseItem) => Promise<void> | void; // New function for prefilling
  loadSavedProgress: () => Promise<string | null>; // Load saved progress and return current step
}

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Maximum number of resources allowed
const MAX_RESOURCES = 5;

// Provider component
export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  // Initialize form state with combined data
  const [formData, setFormData] = useState<OnboardingFormData>({
    jobId: undefined,
    companyName: '',
    fullName: '',
    role: '',
    companyLinkedInUrl: '', 
    companyWebsiteUrl: '', 
    resources: [''],
    companyOverview: initialCompanyData,
    businessGoals: initialBusinessGoalsData,
    audience: initialAudienceData,
    brandStyles: initialBrandStylesData,
  });
  const allObjectives = allObjectivesMock; // Make mock objectives available via context

  // --- General Info Updaters ---
  const updateTextInput = (name: keyof Pick<OnboardingFormData, 'companyName' | 'fullName' | 'role'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateCompanyLinkedInUrl = (value: string) => {
    setFormData(prev => ({ ...prev, companyLinkedInUrl: value }));
  };

  const updateCompanyWebsiteUrl = (value: string) => {
    setFormData(prev => ({ ...prev, companyWebsiteUrl: value }));
  };

  const updateResource = (index: number, value: string) => {
    setFormData(prev => {
      const newResources = [...prev.resources];
      newResources[index] = value;
      return {
        ...prev,
        resources: newResources
      };
    });
  };

  const addResource = () => {
    if (formData.resources.length < MAX_RESOURCES) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, '']
      }));
    }
  };

  const removeResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  // --- Company Overview Updaters ---
  const updateCompanyOverviewField = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      companyOverview: {
        ...prev.companyOverview,
        [field]: value,
      }
    }));
  };

  // --- Business Goals Updaters ---
  const generateUniqueId = () => `custom_${new Date().getTime()}_${Math.random().toString(36).substring(2, 7)}`;

  const toggleObjective = (objectiveId: string) => {
    setFormData(prev => {
      const selected = prev.businessGoals.selectedObjectives.includes(objectiveId);
      const newSelectedObjectives = selected
        ? prev.businessGoals.selectedObjectives.filter(id => id !== objectiveId)
        : [...prev.businessGoals.selectedObjectives, objectiveId];
      return {
        ...prev,
        businessGoals: {
          ...prev.businessGoals,
          selectedObjectives: newSelectedObjectives,
        }
      };
    });
  };

  const updateObjectiveDescription = (objectiveId: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: {
        ...prev.businessGoals,
        objectiveDescriptions: {
          ...prev.businessGoals.objectiveDescriptions,
          [objectiveId]: description,
        }
      }
    }));
  };

  const toggleExpanded = (objectiveId: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: {
        ...prev.businessGoals,
        expandedSections: {
          ...prev.businessGoals.expandedSections,
          [objectiveId]: !prev.businessGoals.expandedSections[objectiveId],
        }
      }
    }));
  };

  const addCustomObjective = () => {
    setFormData(prev => {
      const newCustomObjective: CustomObjective = {
        id: generateUniqueId(),
        name: '',
        description: ''
      };
      return {
        ...prev,
        businessGoals: {
          ...prev.businessGoals,
          customObjectives: [...prev.businessGoals.customObjectives, newCustomObjective],
          expandedSections: {
            ...prev.businessGoals.expandedSections,
            [newCustomObjective.id]: true, // Auto-expand new custom objectives
          }
        }
      };
    });
  };

  const removeCustomObjective = (id: string) => {
    setFormData(prevData => {
      const newCustomObjectives = prevData.businessGoals.customObjectives.filter(obj => obj.id !== id);
      const newExpandedSections = { ...prevData.businessGoals.expandedSections };
      delete newExpandedSections[id];
      return {
        ...prevData,
        businessGoals: {
            ...prevData.businessGoals,
            customObjectives: newCustomObjectives,
            expandedSections: newExpandedSections
        }
      };
    });
  };

  const updateCustomObjectiveName = (id: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: {
        ...prev.businessGoals,
        customObjectives: prev.businessGoals.customObjectives.map(obj =>
          obj.id === id ? { ...obj, name } : obj
        )
      }
    }));
  };

  const updateCustomObjectiveDescription = (id: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: {
        ...prev.businessGoals,
        customObjectives: prev.businessGoals.customObjectives.map(obj =>
          obj.id === id ? { ...obj, description } : obj
        )
      }
    }));
  };

  const updateAudienceTargetAudience = (value: string) => {
    setFormData(prev => ({
      ...prev,
      audience: {
        ...prev.audience,
        targetAudience: value,
      }
    }));
  };

  const toggleAudienceMarket = (market: string) => {
    setFormData(prev => {
      const currentMarkets = prev.audience.geographicMarkets;
      const newMarkets = currentMarkets.includes(market)
        ? currentMarkets.filter(m => m !== market)
        : [...currentMarkets, market];
      return {
        ...prev,
        audience: {
          ...prev.audience,
          geographicMarkets: newMarkets,
        }
      };
    });
  };

  // Brand Styles Updater Functions
  const toggleBrandStyleVoice = (value: string) => {
    setFormData(prev => {
      const currentVoices = [...prev.brandStyles.brandVoices];
      const index = currentVoices.indexOf(value);
      if (index !== -1) {
        currentVoices.splice(index, 1);
      } else {
        currentVoices.push(value);
      }
      return {
        ...prev,
        brandStyles: { ...prev.brandStyles, brandVoices: currentVoices }
      };
    });
  };

  const updateBrandStyleDifferentiator = (value: string) => {
    setFormData(prev => ({
      ...prev,
      brandStyles: { ...prev.brandStyles, differentiator: value }
    }));
  };

  const addBrandStyleMarketingMessage = () => {
    setFormData(prev => {
      if (prev.brandStyles.keyMarketingMessages.length < 5) {
        return {
          ...prev,
          brandStyles: {
            ...prev.brandStyles,
            keyMarketingMessages: [...prev.brandStyles.keyMarketingMessages, ""]
          }
        };
      }
      return prev;
    });
  };

  const removeBrandStyleMarketingMessage = (index: number) => {
    setFormData(prev => {
      const newMessages = [...prev.brandStyles.keyMarketingMessages];
      newMessages.splice(index, 1);
      return {
        ...prev,
        brandStyles: { ...prev.brandStyles, keyMarketingMessages: newMessages }
      };
    });
  };

  const updateBrandStyleMarketingMessage = (index: number, value: string) => {
    setFormData(prev => {
      const newMessages = [...prev.brandStyles.keyMarketingMessages];
      newMessages[index] = value;
      return {
        ...prev,
        brandStyles: { ...prev.brandStyles, keyMarketingMessages: newMessages }
      };
    });
  };

  const addBrandStyleCompetitor = () => {
    setFormData(prev => {
      if (prev.brandStyles.competitors.length < 5) {
        return {
          ...prev,
          brandStyles: {
            ...prev.brandStyles,
            competitors: [...prev.brandStyles.competitors, ""]
          }
        };
      }
      return prev;
    });
  };

  const removeBrandStyleCompetitor = (index: number) => {
    setFormData(prev => {
      const newCompetitors = [...prev.brandStyles.competitors];
      newCompetitors.splice(index, 1);
      return {
        ...prev,
        brandStyles: { ...prev.brandStyles, competitors: newCompetitors }
      };
    });
  };

  const updateBrandStyleCompetitor = (index: number, value: string) => {
    setFormData(prev => {
      const newCompetitors = [...prev.brandStyles.competitors];
      newCompetitors[index] = value;
      return {
        ...prev,
        brandStyles: { ...prev.brandStyles, competitors: newCompetitors }
      };
    });
  };

  const toggleCustomObjectiveExpanded = (id: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: {
        ...prev.businessGoals,
        expandedSections: {
          ...prev.businessGoals.expandedSections,
          [id]: !prev.businessGoals.expandedSections[id],
        }
      }
    }));
  };

  // --- Load saved progress ---
  const loadSavedProgress = useCallback(async () => {
    try {
      const response = await fetch('/api/onboarding/load-progress');
      if (response.ok) {
        const { data, currentStep } = await response.json();
        if (data) {
          setFormData(data);
          console.log(`Loaded saved progress from step: ${currentStep}`);
          return currentStep;
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
    return null;
  }, []);

  // --- Submission Handlers ---
  const prefillOnboardingDataFromApi = useCallback((apiResponse: WebhookResponseItem): void => {
    console.log("OnboardingContext: prefillOnboardingDataFromApi called with:", apiResponse);

    setFormData(prevFormData => {
      // Start with the existing data, especially user's initial input like full name, role, and the URLs
      const updatedData = { ...prevFormData };

      // Update fields from API response
      if (apiResponse.company_name) updatedData.companyName = apiResponse.company_name;
      // Keep user-entered companyLinkedInUrl and companyWebsiteUrl unless API provides a more canonical one (decision here is to keep user's)

      updatedData.companyOverview = {
        ...prevFormData.companyOverview,
        employees: apiResponse.employee_range || prevFormData.companyOverview.employees,
        industry: apiResponse.industry || prevFormData.companyOverview.industry,
        description: apiResponse.company_description || prevFormData.companyOverview.description,
      };

      updatedData.audience = {
        ...prevFormData.audience,
        targetAudience: apiResponse.target_audience || prevFormData.audience.targetAudience,
        geographicMarkets: apiResponse.geographic_markets && apiResponse.geographic_markets.length > 0 
                           ? apiResponse.geographic_markets 
                           : prevFormData.audience.geographicMarkets,
      };

      updatedData.brandStyles = {
        ...prevFormData.brandStyles,
        brandVoices: apiResponse.brand_voice && apiResponse.brand_voice.length > 0 
                       ? apiResponse.brand_voice 
                       : prevFormData.brandStyles.brandVoices,
        competitors: apiResponse.competitors && apiResponse.competitors.length > 0 
                       ? apiResponse.competitors 
                       : prevFormData.brandStyles.competitors,
        differentiator: apiResponse.differentiator || prevFormData.brandStyles.differentiator,
        keyMarketingMessages: apiResponse.key_marketing_messages && apiResponse.key_marketing_messages.length > 0 
                                ? apiResponse.key_marketing_messages 
                                : prevFormData.brandStyles.keyMarketingMessages,
      };

      // Handle objectives - this is more complex due to matching and updating descriptions
      // FIXED: selectedObjectives is an array of string IDs, not objects
      const newSelectedObjectives: string[] = [...prevFormData.businessGoals.selectedObjectives];
      const newCustomObjectives = [...prevFormData.businessGoals.customObjectives];
      const newObjectiveDescriptions: Record<string, string> = {
        ...prevFormData.businessGoals.objectiveDescriptions // Start with existing descriptions
      };

      // Process API objectives
      if (apiResponse.objectives && apiResponse.objectives.length > 0) {
        apiResponse.objectives.forEach(apiObj => {
          // Check if this objective exists in our list of standard objectives
          const standardObjMatch = allObjectives.find(obj => obj.id === apiObj.objective);

          if (standardObjMatch) {
            // If it's a standard objective we know about...

            // 1. Make sure it's in our selected list if not already
            if (!newSelectedObjectives.includes(apiObj.objective)) {
              newSelectedObjectives.push(apiObj.objective);
            }

            // 2. Update its description if provided
            if (apiObj.description) {
              newObjectiveDescriptions[apiObj.objective] = apiObj.description;
            } else if (!newObjectiveDescriptions[apiObj.objective]) {
              // If no description from API and none set yet, use the default
              newObjectiveDescriptions[apiObj.objective] = standardObjMatch.description;
            }
          } else {
            // It's not a standard objective - could create a custom objective here if needed
            // But we'll skip this for now as it's a more complex use case
            console.log(`Unknown objective from API: ${apiObj.objective}`);
          }
        });
      }

      // No need to rebuild objectiveDescriptions as we've been updating it directly above

      updatedData.businessGoals = {
        ...prevFormData.businessGoals, // Carry over other businessGoals properties if any
        selectedObjectives: newSelectedObjectives,
        customObjectives: newCustomObjectives, // Retain existing custom objectives
        objectiveDescriptions: newObjectiveDescriptions, // Assign the newly built descriptions map
      };

      console.log("OnboardingContext: formData updated after prefill:", updatedData);
      return updatedData;
    });
  }, [setFormData]);

  const saveStepProgress = async (currentStep: string) => {
    try {
      const response = await fetch('/api/onboarding/save-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentStep,
          onboardingData: formData
        }),
      });

      if (!response.ok) {
        console.error('Failed to save progress:', await response.text());
        // Don't block the user flow for save failures
      } else {
        console.log(`Progress saved for step: ${currentStep}`);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      // Don't block the user flow for save failures
    }
  };

  const handleStepSubmit = async (step: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Basic validation for demonstration
    // In a real app, validation would be more thorough and step-specific
    console.log(`Validating step: ${step}`, formData);

    // Navigate to the next step or summary
    // This logic needs to be robust based on the current step and overall flow
    if (step === 'initial') {
      // Validate essential initial fields
      if (!formData.companyName.trim() || 
          !formData.fullName.trim() || 
          !formData.role.trim() || 
          !formData.companyLinkedInUrl.trim()) {
        alert("Please fill in all required fields: Company Name, Your Name, Role, and Company LinkedIn URL.");
        return;
      }
      // Company Website URL is optional at this stage
      // Additional resources are optional

      try {
        // First, create the company and onboarding record
        const companyData = {
          name: formData.companyName,
          linkedin_url: formData.companyLinkedInUrl,
          website_url: formData.companyWebsiteUrl || null,
        };

        const response = await fetch('/api/onboarding/create-company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyData,
            initialData: {
              fullName: formData.fullName,
              role: formData.role,
              resources: formData.resources
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create company');
        }

        const result = await response.json();
        console.log('Company created successfully:', result.company);

        // Navigate to the loading page to initiate API call
        router.push('/onboarding/loading');
      } catch (error) {
        console.error('Error creating company:', error);
        alert(`Failed to create company: ${error instanceof Error ? error.message : 'Please try again.'}`);
      }
    } else if (step === 'company-overview') {
        if (!formData.companyOverview.employees || !formData.companyOverview.industry || !formData.companyOverview.description.trim()) {
            alert('Please fill all company overview fields.');
            return;
        }
        await saveStepProgress('company-overview');
        router.push('/onboarding/audience'); // Next step is Audience
    } else if (step === 'audience') {
      // Validate audience data if necessary (basic validation is in AudienceProvider)
      console.log("Audience data submitted:", formData.audience);
      await saveStepProgress('audience');
      router.push('/onboarding/brand-styles'); // Next step is Brand Styles
    } else if (step === 'brand-styles') {
      // Validate brand styles data if necessary
      console.log("Brand Styles data submitted:", formData.brandStyles);
      await saveStepProgress('brand-styles');
      router.push('/onboarding/business-goals'); // Next step is Business Goals
    } else if (step === 'business-goals') {
        if (formData.businessGoals.selectedObjectives.length === 0 && formData.businessGoals.customObjectives.length === 0) {
            alert('Please select at least one business objective or add a custom objective');
            return;
        }
        const missingDescriptions = formData.businessGoals.selectedObjectives.filter(
            id => !formData.businessGoals.objectiveDescriptions[id] || formData.businessGoals.objectiveDescriptions[id].trim() === ''
        );
        if (missingDescriptions.length > 0) {
            alert('Please provide descriptions for all selected objectives');
            return;
        }
        const invalidCustomObjectives = formData.businessGoals.customObjectives.filter(
            obj => !obj.name.trim() || !obj.description.trim()
        );
        if (invalidCustomObjectives.length > 0) {
            alert('Please provide both a name and description for all custom objectives');
            return;
        }
        await saveStepProgress('business-goals');
        router.push('/onboarding/summary');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Final Onboarding Data Submitted:', formData);

    try {
      // Complete the onboarding with final user data
      console.log('Completing onboarding with final data...');
      const completeResponse = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          onboardingData: formData
        }),
      });

      if (!completeResponse.ok) {
        const completeErrorData = await completeResponse.json();
        console.error('Error completing onboarding:', completeErrorData);
        throw new Error(completeErrorData.error || 'Failed to complete onboarding');
      } else {
        console.log('Onboarding completed successfully');
      }

      // Store form data in localStorage as backup
      try {
        localStorage.setItem('onboardingData', JSON.stringify({
          data: formData,
          completedAt: new Date().toISOString()
        }));
        console.log('Saved onboarding data to localStorage');
      } catch (err) {
        console.error('Error saving to localStorage:', err);
        // Continue even if localStorage fails
      }

      // Redirect to the dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('Unexpected error during onboarding submission:', error);
      alert(`An error occurred: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  // Provide the context value to children
  return (
    <OnboardingContext.Provider
      value={{
        formData,
        allObjectives,
        availableMarkets: AVAILABLE_MARKETS,
        brandVoiceOptions: BRAND_VOICE_OPTIONS,
        updateTextInput,
        updateCompanyLinkedInUrl,
        updateCompanyWebsiteUrl,
        updateResource,
        addResource,
        removeResource,
        updateCompanyOverviewField,
        toggleObjective,
        updateObjectiveDescription,
        toggleExpanded,
        addCustomObjective,
        removeCustomObjective,
        updateCustomObjectiveName,
        updateCustomObjectiveDescription,
        toggleCustomObjectiveExpanded,
        updateAudienceTargetAudience,
        toggleAudienceMarket,
        toggleBrandStyleVoice,
        updateBrandStyleDifferentiator,
        addBrandStyleMarketingMessage,
        removeBrandStyleMarketingMessage,
        updateBrandStyleMarketingMessage,
        addBrandStyleCompetitor,
        removeBrandStyleCompetitor,
        updateBrandStyleCompetitor,
        handleSubmit, // Final submit
        handleStepSubmit, // Step-specific submit/navigation
        prefillOnboardingDataFromApi, // Provide the new function
        loadSavedProgress // Provide the load progress function
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook for using the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};