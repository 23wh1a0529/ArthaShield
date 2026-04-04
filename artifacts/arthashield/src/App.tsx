import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";

import { SplashPage } from "@/pages/SplashPage";
import { HomePage } from "@/pages/HomePage";
import { OnboardPage } from "@/pages/OnboardPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { TriggerDemoPage } from "@/pages/TriggerDemoPage";
import { AdminPage } from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/splash" replace />} />
              <Route path="/splash" element={<SplashPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/onboard" element={<OnboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/trigger-demo" element={<TriggerDemoPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/splash" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
