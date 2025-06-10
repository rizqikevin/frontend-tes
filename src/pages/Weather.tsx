import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Cloud, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the table
const mockTransactionData = [
  {
    id: "01",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "02",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "03",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "04",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "05",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "06",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
  {
    id: "07",
    date: "28/02/2025",
    jam: "15:00:00",
    lokasi: "Kuala Tanjung",
    windDirection: "318",
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humadity: "00:10:66%",
    atmospherePressure: "1009 hPa",
    rainfallHours: "0 mm",
  },
];

const weatherData = [
  {
    id: 1,
    tanggal: "28/02/2025",
    jam: "15:30:32 PM",
    lokasi: "Kuala Tanjung",
    windDirection: 318,
    windSpeed: "2.22 m/sec",
    temperature: 30,
    humidity: "66%",
    pressure: "1009 hPa",
    rainfall: "0 mm",
  },
];

const Weather: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState("01 - Januari - 2024");
  const [endDate, setEndDate] = useState("31 - Desember - 2024");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Listen for theme changes and sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    // Initial theme check
    checkTheme();

    // Listen for theme changes
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
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <header className="flex justify-between items-center py-1 px-8">
          <div></div>

          <div className="flex items-center space-x-2">
            {user && (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                    <div className="mr-2">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div className="text-sm">Hi, {user.firstName}</div>
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
              </div>
            )}
          </div>
        </header>

        <main className="p-8">
          {/* Date filters */}
          <div className="flex justify-between mb-8">
            <div className="flex justify-between items-center px-0">
              <div className="bg-[#082d72] rounded-lg p-4 mb-0 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Kuala Tanjung</h2>
                  <p className="text-sm text-gray-400">20/02/2025, 10:00 WIB</p>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Cloud className="text-yellow-400 text-4xl" />
                  <div>
                    <p className="text-3xl font-bold">32°</p>
                    <p className="text-sm text-gray-400">Sunny Cloudy</p>
                  </div>
                </div>
                <div className="mt-4 text-sm grid grid-cols-2 gap-y-2 gap-x-4 text-gray-300">
                  <p>
                    Wind Direction: <span className="text-white">303</span>
                  </p>
                  <p>
                    Wind Speed: <span className="text-white">30 Rpm</span>
                  </p>
                  <p>
                    Temperature: <span className="text-white">32°</span>
                  </p>
                  <p>
                    Humidity: <span className="text-white">64%</span>
                  </p>
                  <p>
                    Atmospheric Pressure:{" "}
                    <span className="text-white">1008 hPa</span>
                  </p>
                  <p>
                    Rainfall/Hour: <span className="text-white">0 mm</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-xl font-medium">Logs</h1>
                <p className="text-gray-400">Jumlah Aktifitas Weather</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-white">#</th>
                    <th className="px-4 py-3 text-white">Tanggal</th>
                    <th className="px-4 py-3 text-white">Jam</th>
                    <th className="px-4 py-3 text-white">Lokasi</th>
                    <th className="px-4 py-3 text-white">Wind Direction</th>
                    <th className="px-4 py-3 text-white">Wind Speed</th>
                    <th className="px-4 py-3 text-white">Temperature</th>
                    <th className="px-4 py-3 text-white">Humadity</th>
                    <th className="px-4 py-3 text-white">
                      Atmopheric Pressure
                    </th>
                    <th className="px-4 py-3 text-white">Rainfall/Hour</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactionData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-5 py-5">{item.id}</td>
                      <td className="px-5 py-5">{item.date}</td>
                      <td className="px-5 py-5">{item.jam}</td>
                      <td className="px-5 py-5">{item.lokasi}</td>
                      <td className="px-5 py-5">{item.windDirection}</td>
                      <td className="px-5 py-5">{item.windSpeed}</td>
                      <td className="px-5 py-5">{item.temperature}</td>
                      <td className="px-5 py-5">{item.humadity}</td>
                      <td className="px-5 py-5">{item.atmospherePressure}</td>
                      <td className="px-5 py-5">{item.rainfallHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 text-sm">
              <div>
                Rows per page:
                <select className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1">
                  <option>09</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center ml-5">
                <span className="mr-4">1-09 of 100</span>
                <div className="inline-flex">
                  <button className="px-2 py-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M12.5 15L7.5 10L12.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="px-2 py-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Weather;
