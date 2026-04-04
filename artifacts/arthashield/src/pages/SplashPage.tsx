import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldSVG } from '@/components/ShieldSVG';
import { GradientText } from '@/components/GradientText';

export function SplashPage() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const fullText = "Protect your livelihood, not just your life";

  useEffect(() => {
    // Typewriter effect
    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }, 1000);

    // Auto redirect
    const redirectTimeout = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, fullText]);

  return (
    <div className="relative min-h-screen bg-[#06060F] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Blobs */}
      <motion.div 
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[80px] opacity-15"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] bg-[#14B8A6] rounded-full mix-blend-screen filter blur-[100px] opacity-10"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[60px] opacity-10"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="z-10 flex flex-col items-center">
        <ShieldSVG size={140} />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6"
        >
          <GradientText as="h1" className="text-5xl font-bold tracking-tight">
            ArthaShield
          </GradientText>
        </motion.div>

        <div className="h-6 mt-4">
          <p className="text-[#94A3B8] text-lg font-medium">
            {typedText}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8"
        >
          <p className="text-[#94A3B8]/60 text-sm italic">
            Artha (अर्थ) — Sanskrit for livelihood
          </p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#14B8A6]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => navigate('/home')}
        className="absolute bottom-6 right-6 text-white/70 hover:text-white text-sm font-medium transition-colors"
      >
        Skip &rarr;
      </button>
    </div>
  );
}
