import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserRole } from "./types";
import IncidentNotification from "./components/IncidentNotification";
import { useSocketNotifications } from "./hooks/useSocketNotifications";

import "leaflet/dist/leaflet.css";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/direksi/Dashboard";
import NotFound from "./pages/NotFound";
import Voip from "./pages/Voip";
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
import SosialMedia from "./pages/SosialMedia";
import { Floods } from "./pages/Floods";
import { Pju } from "./pages/Pju";
import { Pdb } from "./pages/Pdb";
import { Ups } from "./pages/Ups";
import { AirQuality } from "./pages/AirQuality";
import { Genset } from "./pages/Genset";
import { InputPrognosa } from "./pages/InputPrognosa";
import IncidentNotificationSettings from "./pages/IncidentNotificationSettings";
import NotifSetting from "./pages/NotifSettings";

const queryClient = new QueryClient();

const App = () => {
  useSocketNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <IncidentNotification />
            <Routes>
              <Route path="/" element={<Login />} />
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
                path="/input-prognosa"
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <InputPrognosa />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/voip"
                element={
                  <ProtectedRoute>
                    <Voip />
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
              <Route
                path="/sosial-media"
                element={
                  <ProtectedRoute>
                    <SosialMedia />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/floods"
                element={
                  <ProtectedRoute>
                    <Floods />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pju"
                element={
                  <ProtectedRoute>
                    <Pju />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pdb"
                element={
                  <ProtectedRoute>
                    <Pdb />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ups"
                element={
                  <ProtectedRoute>
                    <Ups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/air-quality"
                element={
                  <ProtectedRoute>
                    <AirQuality />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/genset"
                element={
                  <ProtectedRoute>
                    <Genset />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/incident-notification"
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <NotifSetting />
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
};

export default App;
