import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HUBS, PLAN_TIERS } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';
import { GradientText } from '@/components/GradientText';

// Simulated OTP step
const PhoneStep = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      // Auto fill
      setTimeout(() => {
        setOtp(['1', '2', '3', '4']);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <GradientText as="h2" className="text-3xl font-bold mb-2">Enter your number</GradientText>
      <p className="text-[#94A3B8] mb-8 text-center">No email. No password. Just your phone.</p>

      {!otpSent ? (
        <div className="w-full max-w-sm space-y-6">
          <div className="relative flex items-center">
            <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-4 bg-[#7C3AED] text-white font-bold rounded-l-xl">
              +91
            </div>
            <input 
              type="tel" 
              placeholder="98765 43210"
              className="w-full h-14 bg-[#0D0D1A] border border-[#7C3AED]/30 rounded-xl pl-20 pr-4 text-white text-lg focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
          >
            {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm space-y-6 flex flex-col items-center">
          <div className="p-3 bg-[#10B981]/20 border border-[#10B981]/30 rounded-lg text-[#10B981] text-sm font-medium w-full text-center">
            ✅ OTP sent to +91 98765 43210
          </div>
          <div className="flex gap-4 justify-center w-full">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                value={digit}
                readOnly
                className="w-14 h-14 bg-[#0D0D1A] border border-[#7C3AED] rounded-xl text-center text-2xl font-bold text-[#14B8A6] focus:outline-none focus:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all"
              />
            ))}
          </div>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="w-full h-14 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all mt-4"
          >
            Verify OTP
          </motion.button>
        </div>
      )}
    </div>
  );
};

const HubStep = ({ onNext, selectedHub, setSelectedHub }: any) => {
  return (
    <div className="flex flex-col w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Which dark store do you work from?</h2>
      <p className="text-[#94A3B8] mb-6 text-center">Your 3km delivery zone is linked to this hub.</p>

      <div className="relative w-full h-[200px] bg-[#0D0D1A] rounded-xl border border-white/5 mb-6 overflow-hidden flex items-center justify-center">
        {/* Abstract map */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-[80%] h-auto fill-white">
            <path d="M40 10 Q60 5 80 20 Q90 40 85 60 Q70 90 45 95 Q20 90 10 65 Q5 40 20 20 Q30 15 40 10 Z" />
          </svg>
        </div>
        
        {/* Nodes */}
        <div className="absolute inset-0">
          {HUBS.map((hub, i) => {
            const isMumbai = hub.city === "Mumbai";
            const top = isMumbai ? "40%" : "70%";
            const left = isMumbai ? "30%" : "60%";
            const offsetTop = isMumbai ? i * 10 : (i - 3) * 10;
            const offsetLeft = isMumbai ? i * 15 : (i - 3) * 15;
            
            const color = isMumbai ? "#14B8A6" : "#7C3AED";
            const isSelected = selectedHub === hub.id;
            
            return (
              <div 
                key={hub.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: `calc(${top} + ${offsetTop}px)`, left: `calc(${left} + ${offsetLeft}px)` }}
                onClick={() => setSelectedHub(hub.id)}
              >
                <div className={`w-3 h-3 rounded-full relative z-10 transition-all ${isSelected ? 'scale-150' : 'group-hover:scale-125'}`} style={{ backgroundColor: color }}>
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: color }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {HUBS.map(hub => {
          const isSelected = selectedHub === hub.id;
          const riskColor = 
            hub.riskLevel === 'EXTREME' ? 'bg-[#F43F5E]/20 text-[#F43F5E]' :
            hub.riskLevel === 'HIGH' ? 'bg-[#F43F5E]/20 text-[#F43F5E]' :
            hub.riskLevel === 'MEDIUM' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
            'bg-[#10B981]/20 text-[#10B981]';
            
          return (
            <div 
              key={hub.id}
              onClick={() => setSelectedHub(hub.id)}
              className={`p-4 rounded-xl border cursor-pointer flex items-center transition-all ${
                isSelected 
                  ? 'border-[#7C3AED] bg-[#7C3AED]/10 border-l-[4px]' 
                  : 'border-[#7C3AED]/20 bg-[#0D0D1A] hover:border-[#7C3AED]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl mr-4 shrink-0">
                {hub.city === 'Mumbai' ? '🏪' : '🏬'}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm md:text-base">{hub.name}</div>
                <div className="text-xs text-[#94A3B8]">{hub.city}</div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${riskColor}`}>
                  {hub.riskLevel} RISK
                </div>
              </div>
              <div className="text-right ml-2 shrink-0">
                <div className="text-lg md:text-xl font-bold text-[#14B8A6] font-mono">₹{hub.premium}</div>
                <div className="text-xs text-[#94A3B8]">/week</div>
              </div>
              {isSelected && (
                <div className="ml-3 text-[#14B8A6]">
                  ✅
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedHub && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={onNext}
            className="w-full h-14 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all mt-6 shrink-0"
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const EarningsStep = ({ onNext, earnings, setEarnings }: any) => {
  const maxCoverage = earnings * 0.8;
  const hourlyRate = (earnings / 60) * 0.8;

  const brackets = [2000, 3500, 4500, 6000, 8000];

  return (
    <div className="flex flex-col w-full max-w-lg items-center">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">What do you earn per week?</h2>
      <p className="text-[#94A3B8] mb-10 text-center">Used to calculate your maximum coverage amount.</p>

      <div className="text-5xl font-bold text-[#14B8A6] font-mono mb-2">₹{earnings.toLocaleString()}</div>
      <div className="text-[#94A3B8] mb-10">/week</div>

      <div className="w-full px-4 mb-10 relative">
        <input 
          type="range" 
          min="1000" 
          max="10000" 
          step="500" 
          value={earnings}
          onChange={(e) => setEarnings(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer outline-none z-10 relative [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#7C3AED] [&::-webkit-slider-thumb]:to-[#14B8A6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(20,184,166,0.5)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-125"
          style={{
            background: `linear-gradient(to right, #7C3AED 0%, #14B8A6 ${((earnings - 1000) / 9000) * 100}%, rgba(255,255,255,0.1) ${((earnings - 1000) / 9000) * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-10">
        {brackets.map(val => (
          <button
            key={val}
            onClick={() => setEarnings(val)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${earnings === val ? 'bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/50' : 'bg-white/5 text-[#94A3B8] border border-white/10 hover:bg-white/10'}`}
          >
            ₹{val.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
        <div className="flex-1 bg-[#0D0D1A] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-[#14B8A6] font-mono mb-1">₹{Math.round(maxCoverage).toLocaleString()}</div>
          <div className="text-xs text-[#94A3B8] text-center">Max weekly coverage (80%)</div>
        </div>
        <div className="flex-1 bg-[#0D0D1A] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-[#7C3AED] font-mono mb-1">₹{Math.round(hourlyRate)}/hr</div>
          <div className="text-xs text-[#94A3B8] text-center">Hourly protection rate</div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full h-14 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
      >
        Continue
      </button>
    </div>
  );
};

const PlanStep = ({ onNext, hub, selectedPlan, setSelectedPlan }: any) => {
  const standardPrice = hub.premium;
  const basicPrice = Math.round(standardPrice * 0.6);
  const fullPrice = Math.round(standardPrice * 1.6);

  return (
    <div className="flex flex-col w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Your personalised plan</h2>
      <p className="text-[#94A3B8] mb-2 text-center">Based on {hub.name} — <span className="text-[#F43F5E]">{hub.riskLevel} Risk</span></p>
      
      <div className="flex justify-center items-center gap-2 mb-8">
        <span className="text-xs text-[#94A3B8] bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center">
          🤖 AI-calculated premium for your zone <span className="ml-1 cursor-help opacity-70">ⓘ</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-center">
        {/* Basic Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          onClick={() => setSelectedPlan('BASIC')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col h-full ${selectedPlan === 'BASIC' ? 'border-white scale-105 bg-[#12122A]' : 'border-white/10 bg-[#0D0D1A] hover:border-white/30'}`}
        >
          <div className="text-lg font-bold text-white mb-4">Basic</div>
          <div className="mb-6 flex items-end">
            <span className="text-3xl font-mono font-bold text-white">₹{basicPrice}</span>
            <span className="text-sm text-[#94A3B8] ml-1 mb-1">/week</span>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 opacity-50">✓</span> Extreme Rain</li>
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 opacity-50">✓</span> Civic Curfew</li>
            <li className="flex items-start text-sm text-white/30"><span className="mr-2">✗</span> AQI Spikes</li>
            <li className="flex items-start text-sm text-white/30"><span className="mr-2">✗</span> Hub Closure</li>
          </ul>
          <div className="mt-auto pt-4 border-t border-white/10 text-center">
            <span className="text-xs text-[#94A3B8]">For part-time riders</span>
          </div>
        </motion.div>

        {/* Standard Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setSelectedPlan('STANDARD')}
          className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col relative z-10 ${selectedPlan === 'STANDARD' ? 'border-[#7C3AED] shadow-[0_0_40px_rgba(124,58,237,0.2)] bg-[#7C3AED]/10 scale-105' : 'border-[#7C3AED]/50 bg-[#0D0D1A] hover:border-[#7C3AED]'}`}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Recommended
          </div>
          <GradientText as="div" className="text-xl font-bold mb-4">Standard</GradientText>
          <div className="mb-6 flex items-end">
            <span className="text-4xl font-mono font-bold text-[#14B8A6]">₹{standardPrice}</span>
            <span className="text-sm text-[#94A3B8] ml-1 mb-1.5">/week</span>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start text-sm text-white"><span className="mr-2 text-[#14B8A6]">✓</span> Extreme Rain</li>
            <li className="flex items-start text-sm text-white"><span className="mr-2 text-[#14B8A6]">✓</span> Civic Curfew</li>
            <li className="flex items-start text-sm text-white"><span className="mr-2 text-[#14B8A6]">✓</span> AQI Spikes</li>
            <li className="flex items-start text-sm text-white"><span className="mr-2 text-[#14B8A6]">✓</span> Hub Closure</li>
            <li className="flex items-start text-sm text-white"><span className="mr-2 text-[#14B8A6]">✓</span> Route Blockage</li>
          </ul>
          <div className="mt-auto pt-4 border-t border-white/10 text-center">
            <span className="text-xs text-[#14B8A6] font-medium">Best for Koramangala zone</span>
          </div>
        </motion.div>

        {/* Full Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setSelectedPlan('FULL')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col h-full ${selectedPlan === 'FULL' ? 'border-[#7C3AED] scale-105 bg-[#12122A]' : 'border-[#7C3AED]/30 bg-[#0D0D1A] hover:border-[#7C3AED]/60'}`}
        >
          <div className="text-lg font-bold text-white mb-4">Full Cover</div>
          <div className="mb-6 flex items-end">
            <span className="text-3xl font-mono font-bold text-[#7C3AED]">₹{fullPrice}</span>
            <span className="text-sm text-[#94A3B8] ml-1 mb-1">/week</span>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 text-[#7C3AED]">✓</span> All Standard Triggers</li>
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 text-[#7C3AED]">✓</span> Lower Thresholds</li>
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 text-[#7C3AED]">✓</span> Priority Queue</li>
            <li className="flex items-start text-sm text-[#94A3B8]"><span className="mr-2 text-[#7C3AED]">✓</span> 100% Earnings Cover</li>
          </ul>
          <div className="mt-auto pt-4 border-t border-white/10 text-center">
            <span className="text-xs text-[#94A3B8]">For full-time pros</span>
          </div>
        </motion.div>
      </div>

      <button 
        onClick={onNext}
        className="w-full h-14 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
      >
        Continue to Payment
      </button>
    </div>
  );
};

const ActivateStep = ({ hub, planId, earnings }: any) => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedUpi, setSelectedUpi] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const standardPrice = hub.premium;
  const premium = planId === 'BASIC' ? Math.round(standardPrice * 0.6) : planId === 'FULL' ? Math.round(standardPrice * 1.6) : standardPrice;
  const maxPayout = Math.round(earnings * (planId === 'BASIC' ? 0.6 : planId === 'FULL' ? 1.0 : 0.8));

  const handleActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        login({
          workerName: "Ravi Kumar",
          hubId: hub.id,
          hubName: hub.name,
          weeklyEarnings: earnings,
          planTier: planId,
          weeklyPremium: premium,
          coverageStart: "Today",
          coverageEnd: "Sunday midnight"
        });
        navigate('/dashboard');
      }, 2500);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-[#06060F]/95 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <svg className="w-32 h-32 text-[#10B981]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" />
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              d="M30 50 L45 65 L70 35" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>
        
        <GradientText as="h2" className="text-4xl font-bold mb-4 text-center">You're covered! ✅</GradientText>
        <p className="text-xl text-white text-center mb-2">ArthaShield is active.</p>
        <p className="text-[#94A3B8] text-center mb-8">Ravi, we'll pay you automatically when disruptions hit.</p>
        
        <div className="flex items-center gap-2 text-[#14B8A6]">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" style={{ animationDelay: "0.4s" }} />
          <span className="ml-2 text-sm">Redirecting to dashboard</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-lg items-center">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Activate your coverage</h2>

      <div className="w-full bg-[#0D0D1A]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-[#94A3B8]">Plan</span>
            <span className="text-[#14B8A6] font-bold">{PLAN_TIERS[planId as keyof typeof PLAN_TIERS].name}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-[#94A3B8]">Zone</span>
            <span className="text-white font-medium">{hub.name}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-[#94A3B8]">Coverage period</span>
            <span className="text-white">Today → Sunday midnight</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-[#94A3B8]">Max payout</span>
            <span className="text-white font-mono">₹{maxPayout}/week</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[#94A3B8] font-medium text-lg">Weekly cost</span>
            <span className="text-[#14B8A6] font-bold text-3xl font-mono">₹{premium}</span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[#94A3B8] text-sm mb-3">Payout & Payment method</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'gpay', name: 'G Pay' },
              { id: 'phonepe', name: 'PhonePe' },
              { id: 'bhim', name: 'BHIM' }
            ].map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedUpi(method.id)}
                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border ${
                  selectedUpi === method.id 
                    ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-white' 
                    : 'border-white/10 bg-white/5 text-[#94A3B8] hover:border-white/30 hover:scale-105'
                }`}
              >
                {method.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleActivate}
        disabled={isProcessing}
        className="w-full h-16 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-xl text-white font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 border-2 border-white/20 rounded-xl animate-pulse" />
        {isProcessing ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <span>Pay ₹{premium} & Activate</span>
        )}
      </button>
    </div>
  );
};

export function OnboardPage() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  
  const [step, setStep] = useState(1);
  const [selectedHub, setSelectedHub] = useState<number | null>(null);
  const [earnings, setEarnings] = useState(4500);
  const [selectedPlan, setSelectedPlan] = useState('STANDARD');

  // Redirect if already logged in
  useEffect(() => {
    if (state.loggedIn) {
      navigate('/dashboard');
    }
  }, [state.loggedIn, navigate]);

  if (state.loggedIn) return null;

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));

  const getStepContent = () => {
    switch(step) {
      case 1: return <PhoneStep onNext={nextStep} />;
      case 2: return <HubStep onNext={nextStep} selectedHub={selectedHub} setSelectedHub={setSelectedHub} />;
      case 3: return <EarningsStep onNext={nextStep} earnings={earnings} setEarnings={setEarnings} />;
      case 4: return <PlanStep onNext={nextStep} hub={HUBS.find(h => h.id === selectedHub)} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />;
      case 5: return <ActivateStep hub={HUBS.find(h => h.id === selectedHub)} planId={selectedPlan} earnings={earnings} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#06060F] pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-end mb-2 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
          Step {step} of 5
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#14B8A6]"
            initial={{ width: `${((step - 1) / 5) * 100}%` }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            {getStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
