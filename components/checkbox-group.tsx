"use client"

import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  columns?: number;
  className?: string;
  required?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  icon,
  columns = 3,
  className = "",
  required = false
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <label className="block text-sm font-medium text-purple-200">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        </div>
      )}
      
      <div className="bg-[#3a0a96] border border-purple-400 rounded-lg p-4">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-2`}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`checkbox-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 rounded border-purple-400 text-[#5a17d6] focus:ring-purple-500"
                required={required && selectedValues.length === 0}
              />
              <label htmlFor={`checkbox-${option.value}`} className="ml-2 text-sm text-white">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxGroup;
