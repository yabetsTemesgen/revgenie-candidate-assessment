"use client"

import React from 'react';
import { ArrowLeft, Check, Target, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import Link from "next/link";
import CheckboxGroup from '../../checkbox-group';
import { useBusinessGoals } from '../../../contexts/Onboarding/business-goals-context';

/**
 * BusinessGoalsForm - Presentational component for the business goals form
 * Responsible only for rendering the UI based on props
 */
const BusinessGoalsForm: React.FC = () => {
  // Get all data and handlers from context
  const { 
    businessGoalsData,
    allObjectives,
    toggleObjective,
    updateObjectiveDescription,
    toggleExpanded,
    addCustomObjective,
    removeCustomObjective,
    updateCustomObjectiveName,
    updateCustomObjectiveDescription,
    toggleCustomObjectiveExpanded,
    handleSubmit 
  } = useBusinessGoals();

  const { selectedObjectives, expandedSections, customObjectives } = businessGoalsData;
  
  // Convert predefined objectives to checkbox options
  const objectiveOptions = allObjectives.map(objective => ({
    value: objective.id,
    label: objective.label
  }));

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/onboarding/brand-styles" className="inline-flex items-center text-purple-200 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to brand styles
        </Link>

        <div className="bg-[#4512b0] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-green-400 font-medium">AI Analysis Complete</p>
          </div>

          <h1 className="text-3xl font-bold mb-6">Business Goals</h1>
          <p className="text-xl text-purple-200 mb-8">
            We've identified potential business objectives based on your profile. Please select the ones that align with your goals.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-purple-300 mr-2" />
                <label className="block text-sm font-medium text-purple-200">Select Your Objectives</label>
              </div>

              <CheckboxGroup
                options={objectiveOptions}
                selectedValues={selectedObjectives}
                onChange={toggleObjective}
                columns={2}
                className="mb-2"
              />
              
             
            </div>



            {(selectedObjectives.length > 0 || customObjectives.length > 0) && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Describe Your Objectives</h3>
                <p className="text-sm text-purple-200 mb-4">
                  Please provide more details about each of your objectives.
                </p>

                {/* Standard Objectives */}
                {selectedObjectives.map((objectiveId) => {
                  const objective = allObjectives.find((o) => o.id === objectiveId)
                  if (!objective) return null

                  return (
                    <div key={objectiveId} className="bg-[#3a0a96] border border-purple-400 rounded-lg p-4">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleExpanded(objectiveId)}
                      >
                        <h4 className="font-medium">{objective.label}</h4>
                        <button
                          type="button"
                          className="text-purple-300 hover:text-white"
                          aria-label={expandedSections[objectiveId] ? "Collapse section" : "Expand section"}
                        >
                          {expandedSections[objectiveId] ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {expandedSections[objectiveId] && (
                        <div className="mt-3">
                          <textarea
                            value={businessGoalsData.objectiveDescriptions[objectiveId] || ""}
                            onChange={(e) => updateObjectiveDescription(objectiveId, e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#2f0880] border border-purple-400 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            placeholder={`Describe your ${objective.label.toLowerCase()} objective...`}
                            required
                          ></textarea>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Custom Objectives */}
                {customObjectives.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium ">Your Custom Objectives</h3>

                    {customObjectives.map((customObj) => (
                      <div key={customObj.id} className="bg-[#3a0a96] border border-purple-400 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={customObj.name}
                              onChange={(e) => updateCustomObjectiveName(customObj.id, e.target.value)}
                              className="w-full px-4 py-2 bg-[#2f0880] border border-purple-400 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                              placeholder="Enter a name for your objective..."
                              required
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCustomObjective(customObj.id)}
                            className="ml-2 p-2 text-purple-300 hover:text-white focus:outline-none"
                            aria-label="Remove custom objective"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="mt-3">
                          <textarea
                            value={customObj.description}
                            onChange={(e) => updateCustomObjectiveDescription(customObj.id, e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#2f0880] border border-purple-400 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            placeholder="Describe your objective in detail..."
                            required
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Custom Objective Button */}
            <div className="flex justify-between items-center mt-6">

            <button
              type="button"
              onClick={addCustomObjective}
              className="text-sm bg-[#5a17d6] text-white px-3 py-1 rounded-lg hover:bg-[#4512b0] transition-colors ml-auto"
            >
              + Add Custom Objective
            </button>
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

export default BusinessGoalsForm;
