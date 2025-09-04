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

import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";

// Pages
import { Login } from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
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
import NotifSetting from "./pages/NotifSettings";
import DataUsers from "./pages/DataUsers";
import { useIncidentSpeech } from "./hooks/useIncidentSpeech";
import UsersLevel from "./pages/UsersLevel";
import Odol from "./pages/Odol";
import DetailOdol from "./components/DetailOdol";
import BebanRuas from "./pages/BebasRuas";
import { DataVehicle } from "./pages/MasterVehicle";
import { DataCctv } from "./pages/MasterCctv";
import { LogAlatPages } from "./pages/LogAlatPages";
import LogAlatDetail from "./components/logalat/LogAlatDetail";
import { Kecelakaan } from "./pages/Kecelakaan";
import LogReportViolation from "./pages/LogReportViolation";
import { LoginOdol } from "./pages/LoginOdol";
import { DashboardSupport } from "./pages/support/DashboardSupport";
const queryClient = new QueryClient();

// Component to safely call hooks that need AuthContext
const AppHooks = () => {
  useSocketNotifications();
  // useIncidentSpeech();
  return null; // This component renders nothing
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppHooks />
            <IncidentNotification />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login-wim" element={<LoginOdol />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
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
                path="/beban-ruas"
                element={
                  <ProtectedRoute>
                    <BebanRuas />
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
                path="/log-report-violation"
                element={
                  <ProtectedRoute>
                    <LogReportViolation />
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
                    <LogAlatPages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/log-alat/:gateId"
                element={
                  <ProtectedRoute>
                    <LogAlatDetail />
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
              <Route
                path="/data-users"
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <DataUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-level"
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <UsersLevel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/odol"
                element={
                  <ProtectedRoute>
                    <Odol />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detail-odol/:id"
                element={
                  <ProtectedRoute>
                    <DetailOdol />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/data-vehicle"
                element={
                  <ProtectedRoute>
                    <DataVehicle />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/data-cctv"
                element={
                  <ProtectedRoute>
                    <DataCctv />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kecelakaan"
                element={
                  <ProtectedRoute>
                    <Kecelakaan />
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
