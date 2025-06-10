import { useEffect, useState } from "react";
import { Calendar, ChevronDown, LogOut } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MapSection from "@/components/Dashboard/GeographicInfoSystem/MapSection";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapViewGps from "@/components/MapViewGps";

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

export const GPSVehicleTracking: React.FC = () => {
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

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* HEADER */}
        <header className="flex justify-end items-center py-1 px-8">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm">Hi, {user.firstName}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-dashboard-accent border border-gray-700"
              >
                <DropdownMenuItem
                  className="text-gray-200 flex items-center space-x-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>

        {/* MAIN */}
        <main className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[70vh]">
              <MapViewGps />
            </div>

            <div className="rounded-lg border p-4 bg-dashboard-accent max-h-[70vh] overflow-y-auto">
              {selectedVehicle ? (
                <div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="text-sm text-white mb-4"
                    >
                      ← Kembali
                    </button>
                    <h3 className="font-semibold text-lg mb-2">
                      {selectedVehicle.name} - {selectedVehicle.plateNumber}
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-8 text-white p-4 rounded">
                    {/* Distance */}
                    <div className="text-center">
                      <div className="text-sm text-gray-400">
                        Approximate Distance
                      </div>
                      <div className="text-lg font-semibold">
                        {selectedVehicle.ApproximateDistance} km
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gray-600"></div>

                    {/* Speed */}
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Average Speed</div>
                      <div className="text-lg font-semibold">
                        {selectedVehicle.speed} Km/h
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 flex gap-2 justify-around">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="border border-white rounded-lg flex items-center px-4 py-2 bg-dashboard-accent text-xs">
                          <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                          <span>{endDate}</span>
                        </div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="relative">
                        <div className="border border-white rounded-lg flex items-center px-4 py-2 bg-dashboard-accent text-xs">
                          <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                          <span>{endDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-white text-black px-5 py-5 rounded"
                    >
                      Find
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-dashboard-accent px-2 py-1 rounded border border-gray-600 mb-4"
                  />
                  <div className="grid grid-cols-3 text-xs text-gray-400 border-b pb-2 mb-2">
                    <span>Time</span>
                    <span>Speed</span>
                    <span>Device</span>
                  </div>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 text-xs border-b border-gray-600 py-3"
                    >
                      <span>2025/06/05 09:14</span>
                      <span>0.00 Km/h</span>
                      <span>353201354700020</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-4 text-lg">List Vehicle</h3>
                  <div className="grid grid-cols-4 text-xs font-semibold mb-2 border-b pb-2">
                    <span className="text-center">#</span>
                    <span className="text-center">Nama</span>
                    <span className="text-center">Plat</span>
                    <span className="text-center">Speed</span>
                  </div>
                  {dummyVehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="grid grid-cols-4 text-xs border-b border-gray-600 py-2 cursor-pointer hover:bg-gray-800"
                    >
                      <img
                        src={vehicle.icon}
                        alt={vehicle.name}
                        className="text-center h-10 w-10 mx-auto"
                      />
                      <span className="text-center">{vehicle.name}</span>
                      <span className="text-center">{vehicle.plateNumber}</span>
                      <span className="text-center">
                        {vehicle.speed.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GPSVehicleTracking;
