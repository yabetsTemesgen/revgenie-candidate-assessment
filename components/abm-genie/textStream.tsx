"use client"
import { useEffect, useState } from "react";

export const TextStream: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 50); // adjust the delay as needed for streaming speed
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};