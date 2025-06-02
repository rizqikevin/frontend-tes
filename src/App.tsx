import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "leaflet/dist/leaflet.css";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Vlop from "./pages/Vlop";
import InputBusiness from "./pages/InputBusiness";
import CCTVList from "./pages/CctvList";
import VMS from "./pages/Vms";
import LogALPRTable from "./pages/Alpr";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vlop"
              element={
                <ProtectedRoute>
                  <Vlop />
                </ProtectedRoute>
              }
            />
            <Route
              path="input-business"
              element={
                <ProtectedRoute>
                  <InputBusiness />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cctv"
              element={
                <ProtectedRoute>
                  <CCTVList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vms"
              element={
                <ProtectedRoute>
                  <VMS />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alpr"
              element={
                <ProtectedRoute>
                  <LogALPRTable />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
