"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X } from "lucide-react";

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

interface UrlInputProps {
  value: string;
  index?: number;
  onChange: (index: number | undefined, value: string) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  protocol?: string;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  required?: boolean;
}

const UrlInput = ({
  value,
  index,
  onChange,
  onRemove,
  showRemoveButton = false,
  protocol = "https://",
  placeholder = "example.com",
  className = "",
  debounceMs = 800,
  required = false
}: UrlInputProps) => {
  // Internal state to track the input value
  const [inputValue, setInputValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  
  // Create a debounced version of the onChange handler
  const debouncedOnChange = useCallback(
    debounce((newValue: string) => {
      onChange(index, newValue);
    }, debounceMs),
    [onChange, index, debounceMs]
  );
  
  // Update internal state when parent value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // Process input value to remove protocol prefixes
  const processValue = (val: string): string => {
    if (val.toLowerCase().startsWith('http://')) {
      return val.substring(7);
    } else if (val.toLowerCase().startsWith('https://')) {
      return val.substring(8);
    }
    return val;
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = processValue(e.target.value);
    
    // Update internal state immediately to maintain responsiveness
    setInputValue(newValue);
    
    // Debounce the update to the parent component
    debouncedOnChange(newValue);
  };
  
  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    
    // If pasted text starts with a protocol, handle it specially
    if (pastedText.toLowerCase().startsWith('http://') || 
        pastedText.toLowerCase().startsWith('https://')) {
      e.preventDefault();
      const newValue = processValue(pastedText);
      
      // Update internal state immediately
      setInputValue(newValue);
      
      // Debounce the update to the parent component
      debouncedOnChange(newValue);
    }
  };
  
  // Handle blur event to ensure value is captured
  const handleBlur = () => {
    setIsActive(false);
    // Force update parent on blur without debounce
    onChange(index, inputValue);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`flex flex-1 overflow-hidden rounded-lg border ${isActive ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-400'} transition-all duration-200`}>
        {/* Fixed protocol prefix */}
        <div className="bg-[#3a0a96] text-purple-300 px-4 py-3 border-r border-purple-400 flex items-center">
          {protocol}
        </div>
        
        {/* URL input field - fully controlled but with debounced parent updates */}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={() => setIsActive(true)}
          onBlur={handleBlur}
          className="flex-1 px-4 py-3 bg-[#3a0a96] text-white placeholder-purple-300 focus:outline-none w-full"
          placeholder={placeholder}
          aria-label="URL without protocol"
          required={required}
        />
      </div>
      
      {showRemoveButton && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-purple-300 hover:text-white focus:outline-none"
          aria-label="Remove resource"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default UrlInput;
