import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedNumberProps {
  value: number | string;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedNumber({ 
  value, 
  duration = 2000, 
  className = "", 
  prefix = "", 
  suffix = "",
  decimals = 0
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse value, handle strings like "4.2Cr" by just returning the string later
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;
    
    if (isNaN(numericValue)) {
      setCount(numericValue); // Fallback for pure strings
      return;
    }

    let startTime: number | null = null;
    
    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function: easeOutExpo
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(numericValue * easeOut);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        setCount(numericValue);
      }
    };
    
    requestAnimationFrame(animation);
  }, [value, duration, isInView]);

  // If the original value was a non-numeric string (or contains "Cr", "K", etc), we just render it directly after a small delay
  // Or handle the formatting if we parsed it
  const isStringWithText = typeof value === 'string' && /[a-zA-Z]/.test(value);
  
  const formattedCount = isStringWithText && count === parseFloat(value.replace(/[^0-9.-]+/g, "")) 
    ? value // Final state for strings like "4.2Cr"
    : isStringWithText && count > 0 
      ? count.toFixed(decimals) + value.replace(/[0-9.-]+/g, "") // Interpolating
      : count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}
