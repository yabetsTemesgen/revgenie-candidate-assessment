"use client"

import React from 'react';
import { X } from "lucide-react";

interface SelectedTagsProps {
  items: string[];
  onRemove: (item: string) => void;
  className?: string;
}

const SelectedTags: React.FC<SelectedTagsProps> = ({
  items,
  onRemove,
  className = ""
}) => {
  if (items.length === 0) return null;
  
  return (
    <div className={`flex flex-wrap gap-2 mb-3 ${className}`}>
      {items.map((item) => (
        <div key={item} className="bg-[#6b28e7] px-3 py-1 rounded-full flex items-center text-sm">
          {item}
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="ml-2 text-purple-200 hover:text-white"
            aria-label={`Remove ${item}`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedTags;
