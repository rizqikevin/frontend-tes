import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Chart } from "@/components/pdb/chart/Chart";
import { Daily } from "@/components/pdb/daily/Daily";
import { Monthly } from "@/components/pdb/monthly/Monthly";
import { Yearly } from "@/components/pdb/yearly/Yearly";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Search } from "lucide-react";
import Header from "@/components/Header";

export const Pdb: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("daily");
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState("27 - February - 2025");
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

  const renderContent = () => {
    switch (selectedTab) {
      case "chart":
        return <Chart />;
      case "daily":
        return <Daily />;
      case "monthly":
        return <Monthly />;
      case "yearly":
        return <Yearly />;
      default:
        return <Daily />;
    }
  };

  return (
    <div
      className={`flex min-h-screen bg-dashboard-dark text-white  ${
        isDark ? "bg-dashboard-dark text-white" : "bg-gray-500 text-gray-900"
      } transition-all duration-300`}
    >
      <DashboardSidebar />
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
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

        <main
          className={`p-8 ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {/* <Button
                onClick={() => setSelectedTab("chart")}
                className={`${
                  selectedTab === "chart"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Chart
              </Button> */}
              <Button
                onClick={() => setSelectedTab("daily")}
                className={`${
                  selectedTab === "daily"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Daily
              </Button>
              {/* <Button
                onClick={() => setSelectedTab("monthly")}
                className={`${
                  selectedTab === "monthly"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Monthly
              </Button> */}
              {/* <Button
                onClick={() => setSelectedTab("yearly")}
                className={`${
                  selectedTab === "yearly"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Yearly
              </Button> */}
            </div>
            {/* <div className="bg-dashboard-accent rounded-lg p-1 flex items-center">
              <Button className="bg-dashboard-accent text-white">Search</Button>
            </div> */}
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
