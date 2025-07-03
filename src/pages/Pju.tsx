import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import EnergyChart from "@/components/rju/EnergiChart";
import Header from "@/components/Header";
import MapView from "@/components/rju/MapView";

export interface VehicleData {
  id: number;
  name: string;
  plateNumber: string;
  speed: number;
  ApproximateDistance: number;
  icon: string;
}

const dummyVehicles: VehicleData[] = [
  {
    id: 1,
    name: "Ambulance",
    plateNumber: "B 1285 FIX",
    speed: 0,
    ApproximateDistance: 55,
    icon: "/icons/ambulance.png",
  },
  {
    id: 2,
    name: "Rescue",
    plateNumber: "B 1285 FIX",
    speed: 0,
    ApproximateDistance: 55,
    icon: "/icons/rescue-boat.png",
  },
  {
    id: 3,
    name: "Patroli 210",
    plateNumber: "B 1285 FIX",
    speed: 0,
    ApproximateDistance: 55,
    icon: "/icons/sport-car.png",
  },
  {
    id: 4,
    name: "GAJAH 01",
    plateNumber: "B 1285 FIX",
    speed: 0,
    ApproximateDistance: 55,
    icon: "/icons/tow-truck.png",
  },
];

export const Pju: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [StartDate, setStartDate] = useState("27/07/2025");
  const [endDate, setEndDate] = useState("27/08/2025");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
    null
  );

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
            <div className="lg:col-span-2 h-[100vh]">
              <MapView />
            </div>

            <div className="rounded-lg border p-4 bg-dashboard-accent max-h-[100vh] overflow-y-auto">
              <div className="space-y-4">
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

                  <div className="flex justify-between mt-5 space-y-1 text-sm">
                    <p>
                      Average: <strong>499.0688 kWh</strong>
                    </p>
                    <p>
                      Actual Usage: <strong>3493.4817 kWh</strong>
                    </p>
                    <p>
                      Bill Estimate: <strong>Rp 5.047.033</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mt-4 mb-2">
                    Streetlight
                  </h3>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 py-1 text-black rounded"
                  />

                  <table className="w-full mt-2  text-xs">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-600">
                          <td className="py-3 px-3 text-center">819180203</td>
                          <td className="py-3 px-3 text-green-400 text-center">
                            connected
                          </td>
                          <td className="py-3 px-3 text-center">
                            2025-03-03 12:50
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pju;
