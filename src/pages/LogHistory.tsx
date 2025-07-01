import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";

// Mock data for the table
const mockTransactionData = [
  {
    id: "01",
    date: "28/02/2025",
    userName: "Kamera",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "02",
    date: "28/02/2025",
    userName: "UPS",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "03",
    date: "28/02/2025",
    userName: "CCTV",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "04",
    date: "28/02/2025",
    userName: "Kamera",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "05",
    date: "28/02/2025",
    userName: "UPS",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "06",
    date: "28/02/2025",
    userName: "CCTV",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "07",
    date: "28/02/2025",
    userName: "Kamera",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "08",
    date: "28/02/2025",
    userName: "UPS",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "09",
    date: "28/02/2025",
    userName: "CCTV",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
  {
    id: "10",
    date: "28/02/2025",
    userName: "Kamera",
    newGate: "-",
    oldGate: "-",
    deskripsi: "Open Menu>>Log History",
  },
];

const LogHistory: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState("01 - Januari - 2024");
  const [endDate, setEndDate] = useState("31 - Desember - 2024");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLog, setFilterLog] = useState("");
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

        <main className="p-8">
          {/* Date filters */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8 flex-wrap">
            <div className="flex justify-between items-center px-0">
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-[800px]  bg-dashboard-accent"
                />
                <Select value={filterLog} onValueChange={setFilterLog}>
                  <SelectTrigger className="w-full lg:w-[180px]  bg-dashboard-accent">
                    <SelectValue placeholder="ALL" />
                  </SelectTrigger>
                  <SelectContent className="bg-dashboard-accent">
                    <SelectItem value="rkap">ALL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="border border-gray-700 rounded-lg flex items-center px-4 py-2 bg-dashboard-accent w-full lg:w-auto">
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
                  <div className="border border-gray-700 rounded-lg flex items-center px-4 py-2 bg-dashboard-accent">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{endDate}</span>
                  </div>
                </div>
              </div>

              <Button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                Search
              </Button>
            </div>
          </div>

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-xl font-medium">Logs Alat</h1>
              </div>
            </div>
            <div className="overflow-x-auto mt-5 w-full">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-white">#</th>
                    <th className="px-4 py-3 text-white">Time</th>
                    <th className="px-4 py-3 text-white">User Name</th>
                    <th className="px-4 py-3 text-white">New Gate</th>
                    <th className="px-4 py-3 text-white">Old Gate</th>
                    <th className="px-4 py-3 text-white">Description</th>
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
                      <td className="px-5 py-5">{item.userName}</td>
                      <td className="px-5 py-5">{item.newGate}</td>
                      <td className="px-5 py-5">{item.oldGate}</td>
                      <td className="px-5 py-5">{item.deskripsi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-end items-center mt-4 text-sm">
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

export default LogHistory;
