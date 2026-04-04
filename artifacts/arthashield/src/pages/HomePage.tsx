import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientText } from '@/components/GradientText';
import { ShieldSVG } from '@/components/ShieldSVG';

export function HomePage() {
  return (
    <div className="bg-[#06060F] min-h-screen text-white pt-16">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden py-12 px-4">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[100px] opacity-15"
            animate={{ x: [0, 50, -20, 0], y: [0, 30, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-[#14B8A6] rounded-full mix-blend-screen filter blur-[100px] opacity-10"
            animate={{ x: [0, -40, 20, 0], y: [0, -20, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center relative z-10">
          
          {/* Left Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start pt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 mb-8"
            >
              <span className="text-sm font-bold text-[#A855F7] uppercase tracking-wider">🏆 Guidewire DEVTrails 2026 — Unicorn Chase</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 w-full"
            >
              <h1 className="text-4xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
                <span className="block text-white">When rain stops</span>
                <span className="block text-white">your work —</span>
                <GradientText className="block pb-2">we don't stop your pay.</GradientText>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#94A3B8] max-w-[500px] leading-[1.7] mb-10"
            >
              ArthaShield is India's first AI-powered parametric income insurance for Zepto and Blinkit dark-store riders. Rain, smog, or curfew — 60 seconds to your UPI. Zero forms. Zero calls.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link to="/onboard" className="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold rounded-xl text-center hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2">
                <span className="text-xl">🛡️</span> Get Protected Free
              </Link>
              <Link to="/trigger-demo" className="px-8 py-4 bg-transparent border border-[#7C3AED]/50 text-white font-semibold rounded-xl text-center hover:bg-[#7C3AED]/10 hover:border-[#7C3AED] transition-all flex items-center justify-center gap-2">
                <span className="text-xl">▶</span> See Live Demo
              </Link>
            </motion.div>
          </div>

          {/* Right Visuals (Desktop only) */}
          <div className="hidden lg:flex w-[40%] relative justify-center items-center h-[500px]">
            <ShieldSVG size={220} className="z-10" />
            
            {/* Stat Chip 1 */}
            <motion.div 
              className="absolute top-[15%] right-[10%] bg-[#0D0D1A]/80 backdrop-blur-md border border-[#7C3AED] px-4 py-2 rounded-full z-20 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-bold text-[#14B8A6]">✅ ₹120 paid</span>
            </motion.div>
            
            {/* Stat Chip 2 */}
            <motion.div 
              className="absolute top-[45%] left-[-5%] bg-[#0D0D1A]/80 backdrop-blur-md border border-[#7C3AED] px-4 py-2 rounded-full z-20 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2"
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="font-bold text-[#A855F7]">⚡ 60 seconds</span>
            </motion.div>
            
            {/* Stat Chip 3 */}
            <motion.div 
              className="absolute bottom-[20%] right-[15%] bg-[#0D0D1A]/80 backdrop-blur-md border border-[#7C3AED] px-4 py-2 rounded-full z-20 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="font-bold text-white">📋 Zero forms</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS BAR */}
      <section className="bg-[#0D0D1A]/80 border-y border-[#7C3AED]/15 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-mono font-bold text-[#14B8A6] mb-2">₹4.2Cr</span>
            <span className="text-[#94A3B8] text-sm uppercase tracking-wider font-semibold">protected this week</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-mono font-bold text-[#A855F7] mb-2">12,400</span>
            <span className="text-[#94A3B8] text-sm uppercase tracking-wider font-semibold">riders covered</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-mono font-bold text-[#14B8A6] mb-2">60 sec</span>
            <span className="text-[#94A3B8] text-sm uppercase tracking-wider font-semibold">average payout time</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-mono font-bold text-[#A855F7] mb-2">99.2%</span>
            <span className="text-[#94A3B8] text-sm uppercase tracking-wider font-semibold">genuine claims approved</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-24 px-4 bg-[#06060F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GradientText as="h2" className="text-4xl md:text-5xl font-bold">How ArthaShield works</GradientText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line Desktop */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-[#7C3AED]/30 z-0" />
            
            {/* Step 1 */}
            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 0 30px rgba(124,58,237,0.2)" }}
              className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-8 relative z-10 transition-all"
            >
              <div className="absolute top-4 right-4 text-[#7C3AED] font-bold text-lg opacity-50 font-mono">01</div>
              <div className="w-16 h-16 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                🌧️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Disruption detected</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Our 5-sensor system detects rain, AQI spikes, curfews, or hub failures in real time — at your exact 3km zone.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 0 30px rgba(20,184,166,0.2)" }}
              className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-8 relative z-10 transition-all"
            >
              <div className="absolute top-4 right-4 text-[#14B8A6] font-bold text-lg opacity-50 font-mono">02</div>
              <div className="w-16 h-16 rounded-full bg-[#14B8A6]/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(20,184,166,0.3)] text-white">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Income impact verified</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                We confirm you were actively working when the disruption hit. Event ≠ Income Loss — we only pay when earning actually stopped.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 0 30px rgba(124,58,237,0.2)" }}
              className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-8 relative z-10 transition-all"
            >
              <div className="absolute top-4 right-4 text-[#7C3AED] font-bold text-lg opacity-50 font-mono">03</div>
              <div className="w-16 h-16 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                💸
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">₹120 to your UPI in 60s</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Zero forms. Zero calls. The payout reaches your GPay or PhonePe automatically before the rain even stops.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT WE COVER */}
      <section className="py-24 px-4 bg-[#080812] border-y border-[#7C3AED]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <GradientText as="h2" className="text-4xl md:text-5xl font-bold">5 disruptions we cover</GradientText>
          </div>
          <p className="text-center text-[#94A3B8] text-lg mb-16 max-w-2xl mx-auto">
            Designed specifically for Zepto and Blinkit dark-store riders. Not food delivery. Not generic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-7 hover:border-[#14B8A6]/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#14B8A6]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#14B8A6]/20 transition-all" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">🌧️</span>
                <span className="bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">&gt; 50mm/hr for 30 min</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Extreme Rainfall</h3>
              <p className="text-[#94A3B8] mb-6 line-clamp-3">Riding at 50mm/hr is physically impossible. This is when Zepto suspends zone operations.</p>
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider opacity-60">Most common trigger</div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-7 hover:border-[#F59E0B]/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F59E0B]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#F59E0B]/20 transition-all" />
              <div className="flex flex-col items-end mb-6 absolute top-7 right-7 gap-2">
                <span className="bg-[#F59E0B] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.5)]">🆕 New</span>
                <span className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">&gt; 300 AQI for 2 hrs</span>
              </div>
              <span className="text-4xl block mb-6">🌫️</span>
              <h3 className="text-2xl font-bold text-white mb-3">Hazardous AQI</h3>
              <p className="text-[#94A3B8]">Covers Diwali smog, Delhi winters, and industrial incidents. No other insurance covers this.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-7 hover:border-[#F43F5E]/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F43F5E]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#F43F5E]/20 transition-all" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">🚫</span>
                <span className="bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">Zone Overlap</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Civic Curfew</h3>
              <p className="text-[#94A3B8]">Sudden Section 144 events block the entire delivery zone with zero warning.</p>
            </div>

            {/* Card 4 - Spans 1.5 cols on desktop */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-7 hover:border-[#7C3AED]/70 transition-all group overflow-hidden relative lg:col-span-1 md:col-span-2">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#7C3AED]/30 transition-all" />
              <div className="flex flex-col items-end mb-6 absolute top-7 right-7 gap-2">
                <span className="bg-[#7C3AED]/20 text-[#A855F7] border border-[#7C3AED]/40 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">🆕 Q-Commerce Only</span>
                <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">Hub = Offline</span>
              </div>
              <span className="text-4xl block mb-6">🏪</span>
              <h3 className="text-2xl font-bold text-white mb-3">Dark Store Closure</h3>
              <p className="text-[#94A3B8] pr-10">If the Zepto hub goes offline, there is nowhere to pick up orders — even if roads are clear.</p>
            </div>

            {/* Card 5 - Spans 1.5 cols on desktop */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-7 hover:border-[#3B82F6]/50 transition-all group overflow-hidden relative lg:col-span-2 md:col-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3B82F6]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#3B82F6]/20 transition-all" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">🚧</span>
                <span className="bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">All routes blocked</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Route Blockage</h3>
              <p className="text-[#94A3B8] max-w-md">One flooded underpass blocks the entire 3km zone. City-level weather data completely misses this micro-disruption.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE */}
      <section className="py-24 px-4 bg-[#06060F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <GradientText as="h2" className="text-4xl md:text-5xl font-bold">Why ArthaShield is different</GradientText>
          </div>

          <div className="w-full bg-[#0D0D1A] rounded-2xl border border-[#7C3AED]/20 overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.05)]">
            
            {/* Header */}
            <div className="grid grid-cols-2 border-b border-[#7C3AED]/30 bg-black/40">
              <div className="p-6 text-center border-r border-[#7C3AED]/10">
                <span className="text-lg md:text-xl font-bold text-[#94A3B8] opacity-70 flex items-center justify-center gap-2">
                  <span className="text-red-500">❌</span> Generic Insurance
                </span>
              </div>
              <div className="p-6 text-center">
                <span className="text-lg md:text-xl font-bold flex items-center justify-center gap-2">
                  <span className="text-[#14B8A6]">✅</span> <GradientText as="span" className="font-bold">ArthaShield</GradientText>
                </span>
              </div>
            </div>

            {/* Rows */}
            {[
              ["City-level triggers", "3km dark-store zone precision"],
              ["GPS verification only", "6-signal behavior analysis"],
              ["Manual claim filing", "Zero-touch automation"],
              ["Days to weeks for payout", "Under 60 seconds to UPI"],
              ["Monthly flat premium", "Weekly ML-adjusted pricing"],
              ["Weather only", "Weather + AQI + Civic + Hub status"],
              ["Rejects suspicious claims", "Soft Hold — honest workers never denied"],
              ["No explanation for pricing", "SHAP explains every premium decision"]
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-2 border-b border-[#7C3AED]/10 hover:bg-[#7C3AED]/5 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                <div className="p-5 border-r border-[#7C3AED]/10 flex items-center justify-center text-center">
                  <span className="text-[#94A3B8] line-through decoration-red-500/50 opacity-60 text-sm md:text-base">{row[0]}</span>
                </div>
                <div className="p-5 flex items-center justify-center text-center">
                  <span className="text-white font-medium text-sm md:text-base flex items-center gap-2">
                    <span className="text-[#14B8A6] hidden sm:inline">✓</span> {row[1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA FOOTER */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#06060F] to-[#0D0D1A] border-t border-[#7C3AED]/20 relative overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#7C3AED]/20 to-[#14B8A6]/20 rounded-[100%] blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <GradientText as="h2" className="text-4xl md:text-6xl font-bold mb-6">Ready to protect your income?</GradientText>
          <p className="text-[#94A3B8] text-xl mb-12">₹49/week. Cancel anytime. No forms.</p>
          
          <Link 
            to="/onboard" 
            className="inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white text-xl font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all group"
          >
            Get Protected Now <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          
          <p className="mt-8 text-sm font-semibold text-[#94A3B8] tracking-wide uppercase">
            Join 12,400 riders already protected
          </p>
        </div>
      </section>
    </div>
  );
}
