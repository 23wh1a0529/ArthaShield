import React from 'react';
import { motion } from 'framer-motion';

interface ShieldSVGProps {
  className?: string;
  size?: number;
}

export function ShieldSVG({ className = "", size = 120 }: ShieldSVGProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <motion.svg
        width={size}
        height={size * 1.16}
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotateY: [-20, 20, -20]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          filter: "drop-shadow(0 0 40px rgba(124,58,237,0.5))"
        }}
      >
        <defs>
          <linearGradient id="shield-grad" x1="60" y1="0" x2="60" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        <path
          d="M60 0L10.5 18V55.5C10.5 86.85 31.65 116.1 60 140C88.35 116.1 109.5 86.85 109.5 55.5V18L60 0ZM60 126.3C37.5 105.45 22.5 81.3 22.5 55.5V26.55L60 13.05L97.5 26.55V55.5C97.5 81.3 82.5 105.45 60 126.3Z"
          fill="url(#shield-grad)"
        />
        <path
          d="M60 105C78.4 87.6 90 68.4 90 48V30.6L60 19.8L30 30.6V48C30 68.4 41.6 87.6 60 105Z"
          fill="url(#shield-grad)"
          fillOpacity="0.4"
        />
        <path
          d="M51 72L39 60L43.2 55.8L51 63.6L76.8 37.8L81 42L51 72Z"
          fill="#00FFD1"
        />
      </motion.svg>
    </motion.div>
  );
}
