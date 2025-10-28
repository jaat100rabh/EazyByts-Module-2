
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import React from "react";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import Market from "./pages/Market";
import Stocks from "./pages/Stocks";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import WatchlistPage from "./components/watchlist/WatchlistPage";

// Create a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected route component that wraps content with layout
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  // Bypass authentication: always render layout and element
  return (
    <AppLayout>
      {element}
    </AppLayout>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<ProtectedRoute element={<Index />} />} />
      <Route path="/market" element={<ProtectedRoute element={<Market />} />} />
      <Route path="/stocks" element={<ProtectedRoute element={<Stocks />} />} />
      <Route path="/recommendations" element={<ProtectedRoute element={<Recommendations />} />} />
      <Route path="/portfolio" element={<ProtectedRoute element={<Portfolio />} />} />
      <Route path="/watchlist" element={<ProtectedRoute element={<WatchlistPage />} />} />
      <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
