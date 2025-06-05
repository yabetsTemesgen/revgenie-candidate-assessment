"use client"

import React, { useState, useCallback, useEffect } from 'react';

// Debounce helper function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: SelectOption[];
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
  className?: string;
  debounceMs?: number;
}

const SelectInput = ({
  name,
  value,
  onChange,
  options,
  label,
  icon,
  required = false,
  className = "",
  debounceMs = 800
}: SelectInputProps) => {
  // Internal state to track the select value
  const [selectValue, setSelectValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  
  // Create a debounced version of the onChange handler
  const debouncedOnChange = useCallback(
    debounce((name: string, newValue: string) => {
      onChange(name, newValue);
    }, debounceMs),
    [onChange, debounceMs]
  );
  
  // Update internal state when parent value changes
  useEffect(() => {
    setSelectValue(value);
  }, [value]);
  
  // Handle select changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    
    // Update internal state immediately to maintain responsiveness
    setSelectValue(newValue);
    
    // Debounce the update to the parent component
    debouncedOnChange(name, newValue);
  };
  
  // Handle blur event to ensure value is captured
  const handleBlur = () => {
    setIsActive(false);
    // Force update parent on blur without debounce
    onChange(name, selectValue);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <label className="block text-sm font-medium text-purple-200">{label}</label>
        </div>
      )}
      <select
        name={name}
        value={selectValue}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
        required={required}
        className={`w-full px-4 py-3 bg-[#3a0a96] border ${isActive ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-400'} rounded-lg text-white focus:outline-none transition-all duration-200`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
