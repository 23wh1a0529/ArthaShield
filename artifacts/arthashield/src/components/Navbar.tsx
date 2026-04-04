import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { GradientText } from './GradientText';
import { ShieldSVG } from './ShieldSVG';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, logout } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Home', path: '/home' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Simulate', path: '/trigger-demo' },
    { label: 'Admin', path: '/admin' },
  ];

  // Don't show navbar on splash screen
  if (location.pathname === '/splash' || location.pathname === '/') return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#06060F]/80 backdrop-blur-xl border-b border-[#7C3AED]/20 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <ShieldSVG size={28} />
            <GradientText as="span" className="font-bold text-xl tracking-tight">ArthaShield</GradientText>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${isActive ? 'text-[#14B8A6]' : 'text-white hover:text-[#14B8A6]'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#14B8A6]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {state.loggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D1A] border border-[#14B8A6]/30">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-semibold text-[#14B8A6]">ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-[#94A3B8]">
                  <User size={16} />
                  <span className="text-sm font-medium">{state.workerName || 'Ravi Kumar'}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/home');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#F43F5E] border border-[#F43F5E]/30 rounded-lg hover:bg-[#F43F5E]/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/onboard"
                className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
              >
                Get Protected
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-[#0D0D1A] border-b border-[#7C3AED]/20 p-4 z-40 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`p-3 rounded-xl font-medium ${location.pathname === link.path ? 'bg-[#7C3AED]/10 text-[#14B8A6]' : 'text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-[1px] bg-white/10 my-2" />
              
              {state.loggedIn ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#06060F] rounded-xl border border-white/5">
                    <User size={20} className="text-[#94A3B8]" />
                    <span className="text-white font-medium">{state.workerName || 'Ravi Kumar'}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs font-semibold text-[#14B8A6]">ACTIVE</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/home');
                    }}
                    className="w-full py-3 text-sm font-semibold text-[#F43F5E] border border-[#F43F5E]/30 rounded-xl hover:bg-[#F43F5E]/10"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/onboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6]"
                >
                  Get Protected
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
