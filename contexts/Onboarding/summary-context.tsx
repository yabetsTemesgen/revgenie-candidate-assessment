"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our summary data
interface SummaryData {
  company: {
    name: string;
    employees: string;
    industry: string;
    description: string;
  };
  personal: {
    name: string;
    role: string;
  };
  resources: string[];
  audience: {
    targetAudience: string;
    geographicMarkets: string[];
  };
  brand: {
    brandVoice: string[];
    competitors: string[];
    differentiator: string;
    keyMarketingMessages: string[];
  };
  goals: {
    objective: string;
    description: string;
  }[];
}

// Define the context shape
interface SummaryContextType {
  summaryData: SummaryData;
  handleComplete: () => void;
}

// Create the context with a default value
const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

// Provider component
export const SummaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real application, this data would be fetched from a database or state management
  // Here we're using mock data to simulate what was collected during onboarding
  const [summaryData] = useState<SummaryData>({
    company: {
      name: "TechGrowth Solutions",
      employees: "50-100",
      industry: "Software & Technology",
      description:
        "A cutting-edge technology company specializing in AI-powered solutions for business growth and marketing automation. The company was founded in 2019 and has shown significant growth in the SaaS sector, particularly focusing on small to medium-sized businesses.",
    },
    personal: {
      name: "Alex Johnson",
      role: "Chief Marketing Officer",
    },
    resources: [
      "https://techgrowthsolutions.com",
      "https://linkedin.com/company/techgrowth-solutions",
      "https://twitter.com/techgrowth",
    ],
    audience: {
      targetAudience:
        "Small to medium-sized businesses (10-500 employees) in the technology sector, particularly SaaS companies and digital agencies looking to scale their operations and improve marketing efficiency.",
      geographicMarkets: ["North America", "Europe", "Australia"],
    },
    brand: {
      brandVoice: ["Technical", "Trustworthy"],
      competitors: ["TechGrowth.io", "MarketingAI Solutions", "GrowthGenius"],
      differentiator:
        "Our proprietary AI algorithms provide more accurate growth predictions and actionable recommendations than competitors, with a focus on practical implementation rather than just data analytics. We also offer personalized coaching from industry experts alongside our AI tools.",
      keyMarketingMessages: [
        "AI-powered growth without the complexity",
        "Expert coaching meets cutting-edge technology",
        "Actionable insights, not just data reports",
        "Scale your business without scaling your team"
      ]
    },
    goals: [
      {
        objective: "Increase Leads",
        description:
          "Aiming to increase qualified lead generation by 30% in the next quarter through improved targeting and conversion optimization.",
      },
      {
        objective: "Boost Revenue",
        description:
          "Looking to increase monthly recurring revenue by 25% within the next 6 months by optimizing pricing strategy and reducing churn.",
      },
      {
        objective: "Grow Brand",
        description:
          "Focused on increasing brand awareness and recognition in the technology sector, particularly among decision-makers at mid-sized companies.",
      },
      {
        objective: "Optimize Funnel",
        description:
          "Working to improve conversion rates throughout the sales funnel, particularly focusing on the demo-to-paid conversion which is currently at 15%.",
      },
    ],
  });

  const handleComplete = () => {
    // In a real application, you would save all the data here
    console.log("Onboarding complete:", summaryData);
    // Navigate to the dashboard
    window.location.href = "/dashboard";
  };

  // Provide the context value to children
  return (
    <SummaryContext.Provider 
      value={{ 
        summaryData,
        handleComplete
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

// Custom hook for using the summary context
export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (context === undefined) {
    throw new Error('useSummary must be used within a SummaryProvider');
  }
  return context;
};
