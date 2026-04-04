import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppState {
  loggedIn: boolean;
  workerName: string;
  hubId: number;
  hubName: string;
  weeklyEarnings: number;
  planTier: string;
  weeklyPremium: number;
  coverageStart: string;
  coverageEnd: string;
}

interface AppContextType {
  state: AppState;
  login: (data: Partial<AppState>) => void;
  logout: () => void;
}

const defaultState: AppState = {
  loggedIn: false,
  workerName: "",
  hubId: 0,
  hubName: "",
  weeklyEarnings: 4500,
  planTier: "",
  weeklyPremium: 0,
  coverageStart: "",
  coverageEnd: ""
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem('artha_state');
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error("Failed to load state from localStorage");
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('artha_state', JSON.stringify(state));
  }, [state]);

  const login = (data: Partial<AppState>) => {
    setState(prev => ({
      ...prev,
      ...data,
      loggedIn: true
    }));
  };

  const logout = () => {
    setState(defaultState);
    localStorage.removeItem('artha_state');
  };

  return (
    <AppContext.Provider value={{ state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
