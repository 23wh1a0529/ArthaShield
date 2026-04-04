import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Map as MapIcon, 
  Zap, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { DEMO_CLAIMS } from '@/data/mockData';
import { GradientText } from '@/components/GradientText';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { ShieldSVG } from '@/components/ShieldSVG';

export function DashboardPage() {
  const { state, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.loggedIn) {
      navigate('/onboard');
    }
  }, [state.loggedIn, navigate]);

  if (!state.loggedIn) return null;

  return (
    <div className="min-h-screen bg-[#06060F] pt-16 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-[#0D0D1A] border-r border-[#7C3AED]/20 flex-col h-[calc(100vh-64px)] sticky top-16">
        <div className="p-6 flex flex-col items-center border-b border-white/5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] p-[2px] mb-4">
            <div className="w-full h-full bg-[#0D0D1A] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">RK</span>
            </div>
          </div>
          <h3 className="font-bold text-white text-lg">{state.workerName}</h3>
          <p className="text-sm text-[#94A3B8] text-center">{state.hubName}</p>
          
          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-bold text-[#10B981]">ACTIVE</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#7C3AED]/10 text-white font-medium border-l-4 border-[#7C3AED]">
            <span className="opacity-80">🏠</span> Dashboard
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] font-medium hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
            <span className="opacity-80">🛡️</span> My Coverage
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] font-medium hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
            <span className="opacity-80">📋</span> Claim History
          </div>
          <Link to="/trigger-demo" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] font-medium hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
            <span className="opacity-80">🔬</span> Simulate Triggers
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => {
              logout();
              navigate('/home');
            }}
            className="w-full flex justify-center py-2 text-sm font-semibold text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full pb-24 md:pb-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <GradientText as="h1" className="text-3xl font-bold mb-1">Good morning, Ravi 👋</GradientText>
            <p className="text-[#94A3B8]">Your income is protected for the next 5 days.</p>
          </div>
          <div className="px-4 py-2 bg-[#0D0D1A] border border-[#14B8A6]/40 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.15)] flex items-center gap-2">
            <ShieldCheck className="text-[#14B8A6]" size={20} />
            <span className="text-white font-bold">ACTIVE — 5 days left</span>
          </div>
        </div>

        {/* Alert Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#F43F5E]/20 rounded-lg text-[#F43F5E] mt-1 shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">⚠️ Heavy rain forecast for Koramangala at 3 PM</h4>
              <p className="text-[#94A3B8] text-sm">Your coverage is active. Payout will trigger automatically if thresholds are breached.</p>
            </div>
          </div>
          <Link to="/trigger-demo" className="shrink-0 px-4 py-2 bg-[#F43F5E]/20 hover:bg-[#F43F5E]/30 text-[#F43F5E] text-sm font-bold rounded-lg transition-colors whitespace-nowrap">
            View Simulation &rarr;
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-5 flex flex-col hover:border-[#7C3AED]/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#14B8A6]/20 flex items-center justify-center text-xl mb-4">💸</div>
            <div className="text-[#94A3B8] text-sm mb-1">Income protected this week</div>
            <div className="text-2xl font-bold text-[#14B8A6] font-mono mt-auto flex items-center gap-2">
              <AnimatedNumber value={360} prefix="₹" />
            </div>
            <div className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded mt-2 self-start">+₹120 today</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-5 flex flex-col hover:border-[#7C3AED]/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-xl mb-4">🛡️</div>
            <div className="text-[#94A3B8] text-sm mb-1">Payouts received</div>
            <div className="text-2xl font-bold text-white font-mono mt-auto">
              <AnimatedNumber value={3} />
            </div>
            <div className="text-[10px] text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded mt-2 self-start">this week</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-5 flex flex-col hover:border-[#7C3AED]/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-xl mb-4">⚡</div>
            <div className="text-[#94A3B8] text-sm mb-1">Avg seconds to payout</div>
            <div className="text-2xl font-bold text-white font-mono mt-auto">
              <AnimatedNumber value={60} />
            </div>
            <div className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded mt-2 self-start">industry best</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-5 flex flex-col hover:border-[#7C3AED]/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-xl mb-4">📅</div>
            <div className="text-[#94A3B8] text-sm mb-1">Days remaining</div>
            <div className="text-2xl font-bold text-white font-mono mt-auto">
              <AnimatedNumber value={5} />
            </div>
            <div className="text-[10px] text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded mt-2 self-start">Renews Sunday</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Zone Map */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-6">
              <h3 className="font-bold text-white text-lg mb-6">Your 3km protection zone — Koramangala</h3>
              
              <div className="flex flex-col sm:flex-row gap-8 items-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#7C3AED]/30" />
                  
                  {/* Sonar Rings */}
                  <div className="absolute inset-0 rounded-full border border-[#7C3AED]/40 animate-sonar" style={{ animationDelay: '0s' }} />
                  <div className="absolute inset-0 rounded-full border border-[#7C3AED]/30 animate-sonar" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute inset-0 rounded-full border border-[#7C3AED]/20 animate-sonar" style={{ animationDelay: '1.2s' }} />
                  
                  {/* Center Dot */}
                  <div className="absolute w-4 h-4 bg-[#7C3AED] rounded-full shadow-[0_0_20px_rgba(124,58,237,1)] z-10" />
                  <div className="absolute top-[calc(50%+12px)] text-xs text-white font-bold bg-[#06060F] px-2 py-1 rounded">Zepto Hub</div>

                  {/* Tiny delivery dots */}
                  <div className="absolute w-2 h-2 bg-[#14B8A6] rounded-full top-[30%] left-[30%]" />
                  <div className="absolute w-2 h-2 bg-[#14B8A6] rounded-full top-[60%] left-[70%]" />
                  <div className="absolute w-1.5 h-1.5 bg-[#94A3B8] rounded-full top-[20%] left-[60%]" />
                  <div className="absolute w-2 h-2 bg-[#14B8A6] rounded-full top-[75%] left-[40%]" />
                  <div className="absolute w-1.5 h-1.5 bg-[#94A3B8] rounded-full top-[45%] left-[80%]" />
                  
                  {/* Label */}
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                    <div className="text-xs text-[#7C3AED] font-bold flex items-center gap-1">
                      <TrendingUp size={12} /> 3km radius
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-3">
                  <h4 className="text-sm font-bold text-[#94A3B8] mb-2 uppercase tracking-wider">Active Triggers</h4>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-white">🌧️ Rainfall</span>
                    <span className="text-[#10B981] text-xs font-bold">ACTIVE ✅</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-white">🌫️ AQI</span>
                    <span className="text-[#10B981] text-xs font-bold">ACTIVE ✅</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-white">🚫 Curfew</span>
                    <span className="text-[#10B981] text-xs font-bold">ACTIVE ✅</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-white">🏪 Hub Status</span>
                    <span className="text-[#10B981] text-xs font-bold">ACTIVE ✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payouts Feed */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Recent Payouts</h3>
                <span className="text-[#14B8A6] text-sm font-medium cursor-pointer hover:underline">See all &rarr;</span>
              </div>
              
              <div className="space-y-3">
                {DEMO_CLAIMS.map((claim, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    key={claim.id}
                    className={`bg-[#0D0D1A] rounded-xl p-4 flex items-center gap-4 border-l-4 transition-all hover:bg-[#12122A] ${
                      claim.status === 'PAID' ? 'border-l-[#14B8A6] border-y border-r border-[#14B8A6]/20' : 
                      'border-l-[#F59E0B] border-y border-r border-[#F59E0B]/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl shrink-0">
                      {claim.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white truncate">{claim.label}</span>
                        {claim.status === 'PAID' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14B8A6]/20 text-[#14B8A6]">PAID</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B]">SOFT HOLD</span>
                        )}
                      </div>
                      <div className="text-xs text-[#94A3B8]">{claim.time}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold font-mono text-[#14B8A6]">+₹{claim.amount}</div>
                      <div className="text-[10px] text-[#94A3B8]">Credited to UPI</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Premium Breakdown SHAP */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-6 relative overflow-hidden">
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7C3AED]/20 to-transparent rounded-bl-full pointer-events-none" />
              
              <h3 className="font-bold text-white text-lg mb-6">Why your premium is ₹{state.weeklyPremium}</h3>
              
              <div className="space-y-4">
                {/* Base rate */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94A3B8]">Base Rate</span>
                    <span className="text-white">₹35</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#94A3B8]" />
                  </div>
                </div>

                {/* Zone Risk */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94A3B8]">Zone Risk ({state.hubName})</span>
                    <span className="text-[#F43F5E]">+₹14</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                    <div className="w-[40%] bg-transparent" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#F43F5E]" />
                  </div>
                </div>

                {/* Season */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94A3B8]">Season (Monsoon)</span>
                    <span className="text-[#F43F5E]">+₹5</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                    <div className="w-[60%] bg-transparent" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-[#F43F5E]/70" />
                  </div>
                </div>

                {/* Loyalty */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94A3B8]">Loyalty (0 claims)</span>
                    <span className="text-[#10B981]">-₹5</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex relative">
                    <div className="absolute h-full w-[70%] bg-transparent" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '10%', x: '-100%' }} transition={{ duration: 1, delay: 0.8 }} className="absolute h-full bg-[#10B981] left-[70%]" />
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-white">Final</span>
                  <span className="text-2xl font-bold text-[#14B8A6] font-mono">₹{state.weeklyPremium}<span className="text-sm font-sans font-normal text-[#94A3B8]">/week</span></span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-[#7C3AED]/10 rounded-xl border border-[#7C3AED]/20 flex gap-3 items-start">
                <span className="text-xl">🧠</span>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Calculated by XGBoost AI model using zone flood history, AQI data, and elevation.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#06060F]/90 backdrop-blur-lg border-t border-[#7C3AED]/20 z-40 p-2 flex justify-around">
        <Link to="/dashboard" className="p-2 flex flex-col items-center text-[#7C3AED]">
          <span className="text-xl mb-1">🏠</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <div className="p-2 flex flex-col items-center text-[#94A3B8]">
          <span className="text-xl mb-1">🛡️</span>
          <span className="text-[10px] font-medium">Cover</span>
        </div>
        <Link to="/trigger-demo" className="p-2 flex flex-col items-center text-[#94A3B8]">
          <span className="text-xl mb-1">🔬</span>
          <span className="text-[10px] font-medium">Demo</span>
        </Link>
      </div>
    </div>
  );
}
