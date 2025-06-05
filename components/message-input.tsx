"use client"

import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";

interface MessageInputProps {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const MessageInput = ({
  value,
  index,
  onChange,
  onRemove,
  showRemoveButton = false,
  placeholder = "Enter your message",
  className = "",
  required = false
}: MessageInputProps) => {
  // Internal state to track the input value
  const [inputValue, setInputValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  
  // Update internal state when parent value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Update internal state immediately to maintain responsiveness
    setInputValue(newValue);
    
    // Update parent component
    onChange(index, newValue);
  };
  
  // Handle blur event to ensure value is captured
  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
        required={required}
        className={`flex-1 px-4 py-3 bg-[#3a0a96] border ${isActive ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-400'} rounded-lg text-white placeholder-purple-300 focus:outline-none transition-all duration-200`}
        placeholder={placeholder}
      />
      
      {showRemoveButton && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-purple-300 hover:text-white focus:outline-none"
          aria-label="Remove message"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default MessageInput;
