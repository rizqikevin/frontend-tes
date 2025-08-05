import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import EnergyChart from "@/components/rju/EnergiChart";
import Header from "@/components/Header";
import MapView from "@/components/rju/MapView";
import StreetlightTable from "@/components/streetlights/StreetlightTable";
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
    fetchLights,
    toggleLights,
    addLight,
  } = useStreetLightStore();

  useEffect(() => {
    fetchGateways();
  }, []);

  useEffect(() => {
    if (selectedGateway) {
      fetchLights();
    }
  }, [selectedGateway]);

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

                <div>
                  <h3 className="text-md font-semibold mt-5 mb-2">
                    Energy Summary
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-sm">⚡ 483 Streetlight Connect</p>
                    <p className="text-sm text-red-400">
                      🔴 1 Street disconnected
                    </p>
                  </div>

                  <div className="flex justify-evenly mt-5 space-y-1 text-sm">
                    <p>
                      Average: <strong>499.0688 kWh</strong>
                    </p>
                    <p>
                      Actual Usage: <strong>3493.4817 kWh</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mt-4 mb-2">
                    Streetlight
                  </h3>
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <input
                        type="text"
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-2 py-1 text-black rounded"
                      />
                    </div>
                    <div>
                      <Select
                        onValueChange={(value) => setSelectedGateway(value)}
                        value={selectedGateway}
                      >
                        <SelectTrigger className="w-48 bg-dashboard-accent">
                          <SelectValue placeholder="Semua Gerbang" />
                        </SelectTrigger>
                        <SelectContent className="z-[9999] bg-dashboard-accent">
                          {gateways.map((gateway) => (
                            <SelectItem key={gateway.id} value={gateway.id}>
                              {gateway.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <table className="w-full mt-2  text-xs">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lights.map((light) => (
                        <tr key={light.id} className="border-b border-gray-600">
                          <td className="py-3 px-3 text-center">
                            {light.sensor_name}
                          </td>
                          {light.status === 0 ? (
                            <td className="py-3 px-3 text-red-400 text-center">
                              disconnected
                            </td>
                          ) : (
                            <td className="py-3 px-3 text-green-400 text-center">
                              connected
                            </td>
                          )}

                          <td className="py-3 px-3 text-center">
                            {new Date(light.updated_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
