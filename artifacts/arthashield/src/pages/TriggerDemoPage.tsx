import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientText } from '@/components/GradientText';

export function TriggerDemoPage() {
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [rainValue, setRainValue] = useState(12);
  const [aqiValue, setAqiValue] = useState(142);
  const [hubStatus, setHubStatus] = useState('ONLINE');
  const [fraudScore, setFraudScore] = useState(0.12);
  
  const [sequenceStep, setSequenceStep] = useState(0); // 0: ready, 1: breached, 2: verifying, 3: fraud check, 4: payout
  const [showOverlay, setShowOverlay] = useState(false);
  const [payouts, setPayouts] = useState<any[]>([]);

  // Add mock payout details
  const triggerConfig: any = {
    rain: { label: "Heavy Rainfall", amount: 120, tx: "AS-2026-00847" },
    aqi: { label: "Hazardous AQI", amount: 60, tx: "AS-2026-00848" },
    curfew: { label: "Section 144", amount: 240, tx: "AS-2026-00849" },
    hub: { label: "Hub Closure", amount: 180, tx: "AS-2026-00850" },
    soft: { label: "Soft Hold Cleared", amount: 240, tx: "AS-2026-00851" },
  };

  const handleTrigger = (type: string) => {
    if (activeTrigger) return; // one at a time
    setActiveTrigger(type);
    setSequenceStep(1);

    // Sequence timing logic
    if (type === 'rain') {
      // Step 1: animate gauge
      let r = 12;
      const int = setInterval(() => {
        r += 5;
        if (r >= 62) {
          r = 62;
          clearInterval(int);
        }
        setRainValue(r);
      }, 100);

      setTimeout(() => setSequenceStep(2), 1000);
      setTimeout(() => setSequenceStep(3), 2000);
      setTimeout(() => {
        setSequenceStep(4);
        setShowOverlay(true);
      }, 3000);
    } else if (type === 'aqi') {
      let a = 142;
      const int = setInterval(() => {
        a += 20;
        if (a >= 312) {
          a = 312;
          clearInterval(int);
        }
        setAqiValue(a);
      }, 80);

      setTimeout(() => setSequenceStep(2), 1000);
      setTimeout(() => setSequenceStep(3), 2000);
      setTimeout(() => {
        setSequenceStep(4);
        setShowOverlay(true);
      }, 3000);
    } else if (type === 'curfew') {
      setTimeout(() => setSequenceStep(2), 1000);
      setTimeout(() => setSequenceStep(3), 2000);
      setTimeout(() => {
        setSequenceStep(4);
        setShowOverlay(true);
      }, 3000);
    } else if (type === 'hub') {
      setHubStatus('OFFLINE');
      setTimeout(() => setSequenceStep(2), 1000);
      setTimeout(() => setSequenceStep(3), 2000);
      setTimeout(() => {
        setSequenceStep(4);
        setShowOverlay(true);
      }, 3000);
    } else if (type === 'soft') {
      let f = 0.12;
      const int = setInterval(() => {
        f += 0.05;
        if (f >= 0.65) {
          f = 0.65;
          clearInterval(int);
        }
        setFraudScore(Number(f.toFixed(2)));
      }, 100);

      setTimeout(() => setSequenceStep(2), 1500);
      // Let it hang on step 2 for countdown...
      setTimeout(() => {
        setSequenceStep(4);
        setShowOverlay(true);
      }, 6500); // 5 sec countdown
    }
  };

  // Close overlay and add to feed
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
        // Add to feed
        if (activeTrigger) {
          const cfg = triggerConfig[activeTrigger];
          setPayouts(prev => [{
            id: Date.now(),
            label: cfg.label,
            amount: cfg.amount,
            tx: cfg.tx,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }, ...prev]);
        }
        // Reset states
        setActiveTrigger(null);
        setSequenceStep(0);
        setRainValue(12);
        setAqiValue(142);
        setHubStatus('ONLINE');
        setFraudScore(0.12);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showOverlay, activeTrigger]);

  // Circle Gauge SVG path calculator
  const calculateArc = (value: number, max: number) => {
    const percent = Math.min(value / max, 1);
    const circumference = 2 * Math.PI * 40; // r=40
    const strokeDashoffset = circumference - percent * circumference;
    return { strokeDasharray: circumference, strokeDashoffset };
  };

  return (
    <div className="min-h-screen bg-[#06060F] pt-24 pb-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <GradientText as="h1" className="text-4xl md:text-5xl font-bold mb-4">🔬 Live Trigger Simulation</GradientText>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto mb-4">
            Simulate real disruption events and watch ArthaShield's AI respond in real time.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#94A3B8]">
            <span className="text-yellow-500">⚠️</span> All simulations use real API logic. Payouts go to demo wallet.
          </div>
        </div>

        {/* Current Conditions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0D0D1A] border border-white/10 rounded-xl p-4 flex justify-between items-center">
            <span className="text-white font-medium">🌧️ Current Rain: {rainValue}mm/hr</span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${rainValue > 50 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
              {rainValue > 50 ? 'BREACHED 🔴' : 'Normal 🟢'}
            </span>
          </div>
          <div className="bg-[#0D0D1A] border border-white/10 rounded-xl p-4 flex justify-between items-center">
            <span className="text-white font-medium">🌫️ AQI Index: {aqiValue}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${aqiValue > 300 ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
              {aqiValue > 300 ? 'HAZARDOUS 🔴' : 'Moderate 🟡'}
            </span>
          </div>
          <div className="bg-[#0D0D1A] border border-white/10 rounded-xl p-4 flex justify-between items-center">
            <span className="text-white font-medium">🏪 Hub Status</span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${hubStatus === 'OFFLINE' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
              {hubStatus} {hubStatus === 'OFFLINE' ? '🔴' : '🟢'}
            </span>
          </div>
        </div>

        {/* Dynamic Sequence Info Banner */}
        <AnimatePresence mode="wait">
          {activeTrigger && sequenceStep > 0 && !showOverlay && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#0D0D1A] border border-[#7C3AED]/40 rounded-xl p-4 mb-8 flex items-center justify-between"
            >
              <div className="flex-1">
                {sequenceStep === 1 && (
                  <div className="text-[#F43F5E] font-bold flex items-center gap-2">
                    <span className="animate-pulse">🔴</span> 🔍 Disruption detected — verifying zone level impact
                  </div>
                )}
                {sequenceStep === 2 && activeTrigger !== 'soft' && (
                  <div className="text-[#10B981] font-bold flex items-center gap-2">
                    ✅ 📊 Income impact confirmed (Zero deliveries in past 90 mins)
                  </div>
                )}
                {sequenceStep === 2 && activeTrigger === 'soft' && (
                  <div className="text-[#F59E0B] font-bold flex items-center gap-2">
                    ⚠️ SOFT HOLD activated — Auto-approving in: <Countdown from={5} />s
                  </div>
                )}
                {sequenceStep === 3 && (
                  <div className="text-[#14B8A6] font-bold flex items-center gap-2">
                    🤖 Running 6-signal fraud analysis... Score: {fraudScore} {fraudScore > 0.3 ? '⚠️' : '✅'}
                  </div>
                )}
              </div>
              <div className="w-6 h-6 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* RAIN */}
          <div className="bg-[#0D0D1A] border border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] rounded-2xl p-6 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">🌧️ Heavy Rainfall</h3>
              <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Most Common</span>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg text-blue-400 text-xs font-bold w-max mb-6">
              Threshold: &gt; 50mm/hr for 30 minutes
            </div>

            <div className="flex justify-center mb-8 relative">
              <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke={rainValue > 50 ? "#F43F5E" : "#3B82F6"} 
                  strokeWidth="8" fill="none" strokeLinecap="round"
                  style={{...calculateArc(rainValue, 100), transition: "stroke-dashoffset 0.5s ease"}}
                />
                {/* Threshold marker */}
                <line x1="50" y1="10" x2="50" y2="2" stroke="white" strokeWidth="2" transform="rotate(180 50 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-mono text-white">{rainValue}</span>
                <span className="text-[10px] text-[#94A3B8]">mm/hr</span>
              </div>
            </div>

            <button 
              disabled={!!activeTrigger}
              onClick={() => handleTrigger('rain')}
              className="mt-auto w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              🌧️ Trigger Rainstorm
            </button>
          </div>

          {/* AQI */}
          <div className="bg-[#0D0D1A] border border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-2xl p-6 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">🌫️ Hazardous AQI</h3>
              <span className="bg-[#7C3AED]/10 text-[#A855F7] border border-[#7C3AED]/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Unique Feature</span>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-500 text-xs font-bold w-max mb-6">
              Threshold: &gt; 300 AQI for 2 hours
            </div>

            <div className="flex justify-center mb-8 relative">
              <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke={aqiValue > 300 ? "#F43F5E" : "#F59E0B"} 
                  strokeWidth="8" fill="none" strokeLinecap="round"
                  style={{...calculateArc(aqiValue, 500), transition: "stroke-dashoffset 0.5s ease"}}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-mono text-white">{aqiValue}</span>
                <span className="text-[10px] text-[#94A3B8]">AQI</span>
              </div>
            </div>

            <button 
              disabled={!!activeTrigger}
              onClick={() => handleTrigger('aqi')}
              className="mt-auto w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              🌫️ Trigger Smog Event
            </button>
          </div>

          {/* CURFEW */}
          <div className="bg-[#0D0D1A] border border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)] rounded-2xl p-6 transition-all flex flex-col">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">🚫 Section 144 / Curfew</h3>
            
            <div className="flex-1 flex items-center justify-center mb-8 relative h-32">
              <div className={`w-32 h-32 rounded-full border-2 ${activeTrigger === 'curfew' && sequenceStep > 0 ? 'border-rose-500 bg-rose-500/20' : 'border-white/10 bg-white/5'} transition-colors flex items-center justify-center relative overflow-hidden`}>
                <span className="text-3xl opacity-50">📍</span>
                {activeTrigger === 'curfew' && sequenceStep > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-rose-500/80 backdrop-blur-sm font-bold text-white text-xs text-center p-2">
                    RESTRICTED ZONE
                  </div>
                )}
              </div>
            </div>

            <button 
              disabled={!!activeTrigger}
              onClick={() => handleTrigger('curfew')}
              className="mt-auto w-full py-4 bg-gradient-to-r from-rose-600 to-rose-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              🚫 Impose Curfew
            </button>
          </div>

          {/* HUB CLOSURE */}
          <div className="bg-[#0D0D1A] border border-purple-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] rounded-2xl p-6 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">🏪 Dark Store Offline</h3>
              <span className="bg-[#7C3AED]/10 text-[#A855F7] border border-[#7C3AED]/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Q-Commerce Only</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center mb-8 relative h-32">
               <div className={`text-center transition-all ${hubStatus === 'OFFLINE' ? 'scale-110 text-red-500' : 'scale-100 text-white'}`}>
                 <span className="text-5xl block mb-2">{hubStatus === 'OFFLINE' ? '🏬' : '🏪'}</span>
                 <span className="font-bold font-mono tracking-widest">{hubStatus}</span>
               </div>
            </div>

            <button 
              disabled={!!activeTrigger}
              onClick={() => handleTrigger('hub')}
              className="mt-auto w-full py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              🏪 Trigger Hub Failure
            </button>
          </div>

          {/* SOFT HOLD */}
          <div className="bg-[#0D0D1A] border border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-2xl p-6 transition-all flex flex-col md:col-span-2 max-w-2xl mx-auto w-full">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">🔍 Suspicious Claim Simulation</h3>
            <p className="text-[#94A3B8] text-sm mb-6">Fraud score &gt; 0.3 → Soft Hold activated (not rejected). Payout held while secondary checks run.</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex-1 w-full">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#94A3B8]">Fraud Confidence Score</span>
                  <span className="text-white font-mono">{fraudScore.toFixed(2)}</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${fraudScore > 0.6 ? 'bg-red-500' : fraudScore > 0.3 ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${fraudScore * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] mt-1 text-[#94A3B8]">
                  <span>0.0 (Clean)</span>
                  <span>1.0 (Fraud)</span>
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                 <button 
                  disabled={!!activeTrigger}
                  onClick={() => handleTrigger('soft')}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
                >
                  🔍 Trigger Fraud Signals
                </button>
              </div>
            </div>
            {activeTrigger === 'soft' && sequenceStep === 4 && (
              <div className="text-center text-sm text-[#10B981] font-bold border border-[#10B981]/20 bg-[#10B981]/10 py-2 rounded-lg">
                ✅ Auto-approved — signals stabilized. Honest workers never denied.
              </div>
            )}
          </div>
        </div>

        {/* Payouts Feed */}
        <div className="max-w-3xl mx-auto border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold text-white mb-6">Simulation payouts this session</h3>
          
          {payouts.length === 0 ? (
            <div className="text-center py-12 bg-[#0D0D1A] border border-white/5 rounded-xl border-dashed">
              <p className="text-[#94A3B8]">Fire a trigger above to see payouts appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {payouts.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    className="bg-[#12122A] border-l-4 border-l-[#14B8A6] border-y border-r border-white/10 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold text-white text-lg">{p.label} <span className="text-xs bg-[#14B8A6]/20 text-[#14B8A6] px-2 py-0.5 rounded ml-2 align-middle">PAID</span></div>
                      <div className="text-[#94A3B8] text-xs font-mono mt-1">TX: {p.tx} • {p.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#14B8A6] font-mono">+₹{p.amount}</div>
                      <div className="text-[10px] text-[#94A3B8]">Credited to Demo UPI</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Payout Overlay */}
      <AnimatePresence>
        {showOverlay && activeTrigger !== 'soft' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#06060F]/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center mb-8">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-32 h-32 border-2 border-[#14B8A6] rounded-full" 
              />
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute w-32 h-32 border-2 border-[#14B8A6] rounded-full" 
              />
              <div className="w-32 h-32 bg-[#14B8A6]/20 rounded-full flex items-center justify-center border border-[#14B8A6] shadow-[0_0_50px_rgba(20,184,166,0.5)] z-10">
                <span className="text-5xl">💸</span>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-bold text-[#14B8A6] font-mono mb-4 shadow-[#14B8A6]"
            >
              +₹{activeTrigger ? triggerConfig[activeTrigger].amount : 0}
            </motion.div>
            
            <p className="text-xl text-white font-medium mb-1">Credited to Demo Worker's UPI</p>
            <p className="text-[#94A3B8] font-mono mb-4">GPay • ****9999</p>
            
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded font-mono text-xs text-[#94A3B8]">
              Transaction ID: {activeTrigger ? triggerConfig[activeTrigger].tx : ''}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Countdown = ({ from }: { from: number }) => {
  const [count, setCount] = useState(from);
  useEffect(() => {
    if (count > 1) {
      const t = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [count]);
  return <span>{count}</span>;
};
