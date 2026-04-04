import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { Search, Filter, AlertCircle, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { ADMIN_CLAIMS } from '@/data/mockData';
import { GradientText } from '@/components/GradientText';
import { AnimatedNumber } from '@/components/AnimatedNumber';

const chartData = [
  { name: 'Mon', actual: 240, forecast: 240 },
  { name: 'Tue', actual: 480, forecast: 480 },
  { name: 'Wed', actual: 360, forecast: 360 },
  { name: 'Thu', actual: 840, forecast: 840 },
  { name: 'Fri', actual: 600, forecast: 600 },
  { name: 'Sat', actual: null, forecast: 920 },
  { name: 'Sun', actual: null, forecast: 450 },
];

export function AdminPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [claims, setClaims] = useState(ADMIN_CLAIMS);

  const filteredClaims = claims.filter(c => {
    if (filter !== 'All' && c.status !== filter) return false;
    if (search && !c.worker.toLowerCase().includes(search.toLowerCase()) && !c.zone.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleAction = (id: number, newStatus: string) => {
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const renderFraudBar = (score: number) => {
    let color = 'bg-[#10B981]';
    if (score > 0.3) color = 'bg-[#F59E0B]';
    if (score > 0.7) color = 'bg-[#F43F5E]';
    
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${score * 100}%` }} />
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">{score.toFixed(2)}</span>
      </div>
    );
  };

  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'PAID': return <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#14B8A6]/20 text-[#14B8A6]">PAID</span>;
      case 'SOFT_HOLD': return <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B]">SOFT HOLD</span>;
      case 'MANUAL_REVIEW': return <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#F43F5E]/20 text-[#F43F5E]">REVIEW</span>;
      case 'REJECTED': return <span className="px-2 py-1 rounded text-[10px] font-bold bg-white/10 text-[#94A3B8]">REJECTED</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#06060F] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <GradientText as="h1" className="text-3xl md:text-4xl font-bold mb-2">ArthaShield — Insurer Command Center</GradientText>
          <p className="text-[#94A3B8] text-lg">Real-time risk intelligence and payout management</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="bg-[#0D0D1A] border border-[#14B8A6]/20 rounded-2xl p-5 hover:border-[#14B8A6]/50 transition-colors">
            <div className="text-3xl font-bold text-[#14B8A6] font-mono mb-1"><AnimatedNumber value="4.2Cr" prefix="₹" decimals={1} /></div>
            <div className="text-[#94A3B8] text-sm mb-2">Total protected this week</div>
            <div className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded inline-block">+12% vs last week</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-5 hover:border-[#7C3AED]/50 transition-colors">
            <div className="text-3xl font-bold text-[#A855F7] font-mono mb-1"><AnimatedNumber value="12,400" /></div>
            <div className="text-[#94A3B8] text-sm mb-2">Active policies</div>
            <div className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded inline-block">+340 today</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0D0D1A] border border-[#10B981]/20 rounded-2xl p-5 hover:border-[#10B981]/50 transition-colors">
            <div className="text-3xl font-bold text-[#10B981] font-mono mb-1"><AnimatedNumber value="98.7" suffix="%" decimals={1} /></div>
            <div className="text-[#94A3B8] text-sm mb-2">Genuine claim approval rate</div>
            <div className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded inline-block">↑ 0.3%</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0D0D1A] border border-[#F59E0B]/20 rounded-2xl p-5 hover:border-[#F59E0B]/50 transition-colors">
            <div className="text-3xl font-bold text-[#F59E0B] font-mono mb-1"><AnimatedNumber value="49" prefix="₹" /></div>
            <div className="text-[#94A3B8] text-sm mb-2">Average weekly premium</div>
            <div className="text-xs font-bold text-[#94A3B8] bg-white/5 px-2 py-1 rounded inline-block">stable</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Map & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* India Zone Map Card */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-6 relative">
              <h3 className="text-xl font-bold text-white mb-6">Live Risk Radar</h3>
              
              <div className="relative w-full h-[400px] flex items-center justify-center bg-black/20 rounded-xl overflow-hidden border border-white/5">
                <svg viewBox="0 0 100 100" className="w-[80%] h-auto fill-white opacity-5">
                  <path d="M40 10 Q60 5 80 20 Q90 40 85 60 Q70 90 45 95 Q20 90 10 65 Q5 40 20 20 Q30 15 40 10 Z" />
                </svg>
                
                {/* Dots */}
                <div className="absolute top-[70%] left-[58%] group cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 w-4 h-4 bg-[#F43F5E] rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping opacity-75" />
                    <div className="w-4 h-4 bg-[#F43F5E] rounded-full -translate-x-1/2 -translate-y-1/2 relative z-10 shadow-[0_0_15px_rgba(244,63,94,1)]" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-[#0D0D1A]/90 backdrop-blur-md border border-[#F43F5E]/50 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="font-bold text-white text-sm mb-1">Zepto Koramangala</div>
                    <div className="text-xs text-[#F43F5E] font-bold mb-2">HIGH RISK — RAIN</div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <div className="text-[#94A3B8]">Policies</div>
                        <div className="text-white font-bold">4,201</div>
                      </div>
                      <div>
                        <div className="text-[#94A3B8]">Fraud Rate</div>
                        <div className="text-white font-bold">1.2%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[72%] left-[65%] group cursor-pointer">
                  <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-[#0D0D1A]/90 backdrop-blur-md border border-[#10B981]/50 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="font-bold text-white text-sm mb-1">Zepto Whitefield</div>
                    <div className="text-xs text-[#10B981] font-bold mb-2">LOW RISK</div>
                  </div>
                </div>

                <div className="absolute top-[40%] left-[30%] group cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 w-5 h-5 bg-[#7F1D1D] rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping opacity-50" />
                    <div className="w-5 h-5 bg-[#991B1B] rounded-full -translate-x-1/2 -translate-y-1/2 relative z-10 shadow-[0_0_20px_rgba(153,27,27,1)]" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-[#0D0D1A]/90 backdrop-blur-md border border-[#991B1B]/50 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="font-bold text-white text-sm mb-1">Blinkit Kurla</div>
                    <div className="text-xs text-[#F43F5E] font-bold mb-2">EXTREME RISK — AQI</div>
                  </div>
                </div>

                <div className="absolute top-[38%] left-[28%] group cursor-pointer">
                  <div className="w-3 h-3 bg-[#F59E0B] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                </div>

                <div className="absolute top-[55%] left-[45%] group cursor-pointer">
                  <div className="w-2 h-2 rounded-full border border-dashed border-[#94A3B8] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] text-[#94A3B8] whitespace-nowrap">Hyderabad (Soon)</div>
                </div>

              </div>
            </div>

            {/* Analytics Chart */}
            <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-1">Payout trends + next week forecast</h3>
              <p className="text-[#94A3B8] text-sm mb-8">Koramangala zone — AI predicts 72% probability of 2+ trigger events next week</p>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0D0D1A', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="actual" stroke="#14B8A6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                    <Line type="monotone" dataKey="forecast" stroke="#A855F7" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Right Column: Fraud Queue & Filters */}
          <div className="space-y-8">
            
            {/* Fraud Queue */}
            <div className="bg-[#0D0D1A] border border-[#F43F5E]/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F43F5E]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F43F5E] rounded-full animate-ping opacity-50" />
                  <div className="w-3 h-3 bg-[#F43F5E] rounded-full relative z-10" />
                </div>
                <h3 className="text-lg font-bold text-[#F43F5E]">Fraud Queue</h3>
                <span className="ml-auto bg-[#F43F5E]/20 text-[#F43F5E] text-xs font-bold px-2 py-1 rounded">2 REVIEWS</span>
              </div>

              <div className="space-y-4">
                {/* Flagged Claim 1 */}
                <div className="bg-black/40 border border-[#F59E0B]/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-white text-sm">VK-0233</div>
                      <div className="text-xs text-[#94A3B8]">Kurla • Curfew • ₹240</div>
                    </div>
                    <div className="bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30 px-2 py-1 rounded text-[10px] font-bold">
                      0.71 HIGH RISK
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <XCircle size={14} className="text-[#F43F5E] shrink-0 mt-0.5" />
                      <span>GPS decimal precision mismatch (spoofed coordinates detected)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <XCircle size={14} className="text-[#F43F5E] shrink-0 mt-0.5" />
                      <span>3 workers within 200m filed simultaneously</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <XCircle size={14} className="text-[#F43F5E] shrink-0 mt-0.5" />
                      <span>Delivery app was in background (not active)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                      <span>Accelerometer consistent with riding</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(3, 'PAID')}
                      className="flex-1 py-1.5 bg-[#14B8A6]/10 hover:bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 rounded-lg text-xs font-bold transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(3, 'REJECTED')}
                      className="flex-1 py-1.5 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30 rounded-lg text-xs font-bold transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Flagged Claim 2 */}
                <div className="bg-black/40 border border-[#F59E0B]/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-white text-sm">PD-0078</div>
                      <div className="text-xs text-[#94A3B8]">Koramangala • Route Block • ₹180</div>
                    </div>
                    <div className="bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-1 rounded text-[10px] font-bold">
                      0.68 RISK
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <XCircle size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <span>Speed &gt; 60km/h inside flooded zone (improbable)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                      <span>App active in foreground</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(6, 'PAID')}
                      className="flex-1 py-1.5 bg-[#14B8A6]/10 hover:bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 rounded-lg text-xs font-bold transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(6, 'REJECTED')}
                      className="flex-1 py-1.5 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30 rounded-lg text-xs font-bold transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-[#0D0D1A] border border-[#7C3AED]/20 rounded-2xl p-6 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white">All claims — live view</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <input 
                  type="text" 
                  placeholder="Search worker ID or zone..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                />
              </div>
              <div className="flex bg-black/40 rounded-lg p-1 border border-white/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
                {['All', 'PAID', 'SOFT_HOLD', 'MANUAL_REVIEW', 'REJECTED'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-[#7C3AED]/20 text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}
                  >
                    {f === 'All' ? 'All' : f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/60 border-b border-white/10 text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="p-4 font-medium">Worker ID</th>
                  <th className="p-4 font-medium">Zone</th>
                  <th className="p-4 font-medium">Trigger</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Fraud Score</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={claim.id} 
                    className={`border-b border-white/5 hover:bg-[#7C3AED]/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
                  >
                    <td className="p-4 text-sm font-bold text-white">{claim.worker}</td>
                    <td className="p-4 text-sm text-[#94A3B8]">{claim.zone}</td>
                    <td className="p-4 text-sm text-white">{claim.trigger}</td>
                    <td className="p-4 text-sm font-mono text-[#14B8A6] font-bold">₹{claim.amount}</td>
                    <td className="p-4">{renderFraudBar(claim.fraudScore)}</td>
                    <td className="p-4">{renderStatusBadge(claim.status)}</td>
                  </motion.tr>
                ))}
                {filteredClaims.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#94A3B8]">No claims found matching filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
