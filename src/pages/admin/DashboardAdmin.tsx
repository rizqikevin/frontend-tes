import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Dashboard from "@/components/dashboard/Admin/Dashboard";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";

const DashboardAdmin: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState("27 - February - 2025");
  const [endDate, setEndDate] = useState("27 - February - 2025");
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
    <div
      className={`flex min-h-screen bg-dashboard-dark text-white ${
        isDark ? "bg-dashboard-dark text-white" : "bg-gray-50 text-gray-900"
      } transition-all duration-300`}
    >
      <DashboardSidebar />
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <Header isDark={isDark} user={user} logout={logout} />

        <main
          className={`p-8 ${
            isDark ? "bg-dashboard-dark text-white" : "bg-gray-50 text-gray-900"
          } transition-all duration-300`}
        >
          <div className="flex justify-between mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1
                  className={`text-2xl font-semibold ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Dashboard
                </h1>
                <p className="text-gray-400">
                  Pantau detail dari setiap kejadian
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent ${
                      isDark
                        ? "bg-dashboard-accent text-white"
                        : "bg-gray-50 text-gray-900"
                    } `}
                  >
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
                  <div
                    className={`border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent ${
                      isDark
                        ? "bg-dashboard-accent text-white"
                        : "bg-gray-50 text-gray-900"
                    } `}
                  >
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{endDate}</span>
                  </div>
                </div>
              </div>
              <Button className="px-4 py-2 bg-white border text-black rounded hover:bg-gray-200">
                Search
              </Button>
            </div>
          </div>

          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
