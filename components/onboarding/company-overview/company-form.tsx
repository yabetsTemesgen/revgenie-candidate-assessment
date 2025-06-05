"use client"

import React from 'react';
import { ArrowLeft, Check, Users, Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import SelectInput from '../../select-input';
import TextareaInput from '../../textarea-input';
import { useOnboarding } from '../../../contexts/Onboarding/onboarding-context';

/**
 * CompanyForm - Presentational component for the company overview form
 * Responsible only for rendering the UI based on props
 */
const CompanyForm: React.FC = () => {
  // Get all data and handlers from the global onboarding context
  const { formData, updateCompanyOverviewField, handleStepSubmit } = useOnboarding();
  
  // Extract company data and create handler functions
  const companyData = formData.companyOverview;
  
  // Create a wrapper for the update function to match the expected API of the form components
  const updateField = (name: string, value: string) => {
    updateCompanyOverviewField(name as keyof typeof companyData, value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    handleStepSubmit('company-overview', e);
  };

  // Employee count options
  const employeeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "50-100", label: "50-100 employees" },
    { value: "101-250", label: "101-250 employees" },
    { value: "251-500", label: "251-500 employees" },
    { value: "501+", label: "501+ employees" }
  ];

  // Industry options
  const industryOptions = [
    { value: "Software & Technology", label: "Software & Technology" },
    { value: "Finance & Banking", label: "Finance & Banking" },
    { value: "Healthcare & Medical", label: "Healthcare & Medical" },
    { value: "Education & E-learning", label: "Education & E-learning" },
    { value: "Retail & E-commerce", label: "Retail & E-commerce" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Marketing & Advertising", label: "Marketing & Advertising" },
    { value: "Other", label: "Other" }
  ];

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/onboarding" className="inline-flex items-center text-purple-200 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to previous step
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-green-400 font-medium">AI Analysis Complete</p>
          </div>

          <h1 className="text-3xl font-bold mb-6">Company Overview</h1>
          <p className="text-xl text-purple-200 mb-8">
            We've analyzed your company resources and pre-filled the information below. Please review and edit if
            needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectInput
              name="employees"
              value={companyData.employees}
              onChange={updateField}
              options={employeeOptions}
              label="Number of Employees"
              icon={<Users className="h-5 w-5 text-purple-300" />}
              required
            />
            
            <SelectInput
              name="industry"
              value={companyData.industry}
              onChange={updateField}
              options={industryOptions}
              label="Industry"
              icon={<Briefcase className="h-5 w-5 text-purple-300" />}
              required
            />
            
            <TextareaInput
              name="description"
              value={companyData.description}
              onChange={updateField}
              label="Company Description"
              icon={<FileText className="h-5 w-5 text-purple-300" />}
              placeholder="Enter a brief description of your company"
              required
              helpText="This description will help us tailor our recommendations to your specific business needs."
            />

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

export default CompanyForm;
