import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the table
const mockTransactionData = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  date: "28/02/2025",
  time: "14:09:35 PM",
  status: "Open",
  gate: "Kuala Tanjung",
  booth: "03",
  transaction: "E-Toll Mndiri",
  class: "Gol-1",
  receipt: "910749",
  plate: "B2563KZM",
  uid: "6032982848939946",
  shift: "2",
}));

const Vlop: React.FC = () => {
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
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <header className="flex justify-end items-center py-1 px-8">
          <div className="flex items-center space-x-2">
            {user && (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                    <div className="mr-2">
                      <img src={user.image} className="h-8 w-8 rounded-full" />
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
              <div>
                <Button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                  Report
                </Button>
                <Button
                  className="bg-transparent border-white rounded-lg px-4 py-2 text-white hover:bg-gray-700 ml-2"
                  variant="outline"
                >
                  Camera
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{startDate}</span>
                </div>
              </div>

              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
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
              </div>

              <div className="relative">
                <div className="border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{endDate}</span>
                </div>
              </div>

              <Button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                Search
              </Button>
            </div>
          </div>

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-xl font-medium">Logs ALPR</h1>
                <p className="text-gray-400">Jumlah Aktifitas ALPR</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-dashboard-accent text-white">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Tanggal</th>
                    <th className="p-2">Waktu</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Gerbang</th>
                    <th className="p-2">Gardu</th>
                    <th className="p-2">Transaksi</th>
                    <th className="p-2">Golongan</th>
                    <th className="p-2">Resi</th>
                    <th className="p-2">Nomor Plat</th>
                    <th className="p-2">UID</th>
                    <th className="p-2">Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactionData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-700">
                      <td className="p-2">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="p-2">
                        {index === 0 ? (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Anjungan_JPO_Karet_Sudirman_Jakarta.jpg"
                            alt="img"
                            className="w-20 h-12 object-cover"
                          />
                        ) : (
                          <div className="w-20 h-12 bg-gray-600" />
                        )}
                      </td>
                      <td className="p-2">{row.date}</td>
                      <td className="p-2">{row.time}</td>
                      <td className="p-2">{row.status}</td>
                      <td className="p-2">{row.gate}</td>
                      <td className="p-2">{row.booth}</td>
                      <td className="p-2">{row.transaction}</td>
                      <td className="p-2">{row.class}</td>
                      <td className="p-2">{row.receipt}</td>
                      <td className="p-2">{row.plate}</td>
                      <td className="p-2">{row.uid}</td>
                      <td className="p-2">{row.shift}</td>
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
                  <option value="09">09</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
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

export default Vlop;
