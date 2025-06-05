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

interface TextInputProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  debounceMs?: number;
}

const TextInput = ({
  name,
  value,
  onChange,
  label,
  placeholder = "",
  required = false,
  className = "",
  debounceMs = 300
}: TextInputProps) => {
  // Internal state to track the input value
  const [inputValue, setInputValue] = useState(value);
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
    setInputValue(value);
  }, [value]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Update internal state immediately to maintain responsiveness
    setInputValue(newValue);
    
    // Debounce the update to the parent component
    debouncedOnChange(name, newValue);
  };
  
  // Handle blur event to ensure value is captured
  const handleBlur = () => {
    setIsActive(false);
    // Force update parent on blur without debounce
    onChange(name, inputValue);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-purple-200">{label}</label>
      )}
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
        required={required}
        className={`w-full px-4 py-3 bg-[#3a0a96] border ${isActive ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-400'} rounded-lg text-white placeholder-purple-300 focus:outline-none transition-all duration-200`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
