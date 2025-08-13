import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import EnergyChart from "@/components/rju/EnergiChart";
import Header from "@/components/Header";
import MapView from "@/components/rju/MapView";
import { Button } from "@/components/ui/button";
import { OperationalHourModal } from "@/components/rju/ScheduleModal";
import { useStreetLightStore } from "@/stores/useStreetlightStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";
import EnergiCard from "@/components/EnergiCard";

export const Pju: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isModalOpen, setJadwalKanModalOpen] = useState(false);
  const {
    lights,
    gateways,
    selectedGateway,
    setSelectedGateway,
    fetchGateways,
    searchTerm,
    setSearchTerm,
  } = useStreetLightStore();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [dataPju, setDataPju] = useState({
    total_active: "0",
    total_inactive: "0",
  });

  const fetchTotalLights = async () => {
    const res = await api.get("/sensor/pju/total");
    const { total_active, total_inactive } = res.data.data[0];
    setDataPju({ total_active, total_inactive });
  };

  useEffect(() => {
    fetchTotalLights();
  }, []);

  // console.log(dataPju);

  useEffect(() => {
    fetchGateways();
    return () => {
      setSearchTerm("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchTerm) {
        setSearchTerm(localSearch);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, searchTerm, setSearchTerm]);

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    checkTheme();
    const themeInterval = setInterval(checkTheme, 100);
    window.addEventListener(
      "sidebarStateChange",
      handleSidebarChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarChange as EventListener
      );
      clearInterval(themeInterval);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* HEADER */}
        <Header
          isDark={isDark}
          user={
            user
              ? {
                  name: user.name,
                  role: String(user.role),
                }
              : null
          }
          logout={logout}
        />
        {/* MAIN */}
        <main className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[90vh]">
              <MapView />
            </div>

            <div className="border p-4 bg-dashboard-accent h-full max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setJadwalKanModalOpen(true)}
                    className="mr-2 bg-dashboard-dark shadow-lg hover:bg-dashboard-accent"
                    variant="outline"
                  >
                    Jadwalkan
                  </Button>
                </div>
                {/* <hr className="my-3 border-gray-600" /> */}

                <div>
                  <h2 className="text-lg font-semibold">Energy (kWh)</h2>
                  <EnergyChart />
                </div>

                <hr className="my-3 border-gray-600" />

                <EnergiCard />

                <div>{/* <StreetlightTable /> */}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <OperationalHourModal
        isOpen={isModalOpen}
        onClose={() => setJadwalKanModalOpen(false)}
      />
    </div>
  );
};

export default Pju;
