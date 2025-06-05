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

interface TextareaInputProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  helpText?: string;
  debounceMs?: number;
}

const TextareaInput = ({
  name,
  value,
  onChange,
  label,
  icon,
  placeholder = "",
  required = false,
  rows = 5,
  className = "",
  helpText,
  debounceMs = 300
}: TextareaInputProps) => {
  // Internal state to track the textarea value
  const [textareaValue, setTextareaValue] = useState(value);
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
    setTextareaValue(value);
  }, [value]);
  
  // Handle textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Update internal state immediately to maintain responsiveness
    setTextareaValue(newValue);
    
    // Debounce the update to the parent component
    debouncedOnChange(name, newValue);
  };
  
  // Handle blur event to ensure value is captured
  const handleBlur = () => {
    setIsActive(false);
    // Force update parent on blur without debounce
    onChange(name, textareaValue);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <label className="block text-sm font-medium text-purple-200">{label}</label>
        </div>
      )}
      <textarea
        name={name}
        value={textareaValue}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#3a0a96] border ${isActive ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-400'} rounded-lg text-white placeholder-purple-300 focus:outline-none transition-all duration-200`}
      />
      {helpText && (
        <p className="text-xs text-purple-300">{helpText}</p>
      )}
    </div>
  );
};

export default TextareaInput;
