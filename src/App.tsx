import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserRole } from "./types";
import "leaflet/dist/leaflet.css";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/direksi/Dashboard";
import NotFound from "./pages/NotFound";
import Vlop from "./pages/Vlop";
import InputBusiness from "./pages/InputBusiness";
import CCTVList from "./pages/CctvList";
import VMS from "./pages/Vms";
import LogALPRTable from "./pages/Alpr";
import Camera from "./pages/Camera";
import { Incident } from "./pages/Incident";
import { GPSVehicleTracking } from "./pages/GPSVehicleTracking";
import Weather from "./pages/Weather";
import LogAlat from "./pages/LogAlat";
import LogHistory from "./pages/LogHistory";
import { LalinReport } from "./pages/LalinReport";
import { LalinPortableReport } from "./pages/LalinPortableReport";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/direksi"
              element={
                <ProtectedRoute requiredRole={UserRole.DIREKSI}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <DashboardAdmin />
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
            <Route
              path="/camera"
              element={
                <ProtectedRoute>
                  <Camera />
                </ProtectedRoute>
              }
            />
            <Route
              path="/incident"
              element={
                <ProtectedRoute>
                  <Incident />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gps-vehicle-tracking"
              element={
                <ProtectedRoute>
                  <GPSVehicleTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <Weather />
                </ProtectedRoute>
              }
            />
            <Route
              path="/log-alat"
              element={
                <ProtectedRoute>
                  <LogAlat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/log-history"
              element={
                <ProtectedRoute>
                  <LogHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lalin-report"
              element={
                <ProtectedRoute>
                  <LalinReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lalin-portable-report"
              element={
                <ProtectedRoute>
                  <LalinPortableReport />
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
