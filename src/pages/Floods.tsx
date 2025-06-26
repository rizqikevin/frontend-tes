import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Chart } from "@/components/floods/chart/Chart";
import { Daily } from "@/components/floods/daily/Daily";
import { Monthly } from "@/components/floods/monthly/Monthly";
import { Yearly } from "@/components/floods/yearly/Yearly";
import Header from "@/components/Header";

export const Floods: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("daily");
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState("27 - February - 2025");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

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
    const commonProps = {
      location: selectedOption,
      searchTrigger,
    };

    switch (selectedTab) {
      case "chart":
        return <Daily {...commonProps} />;
      case "daily":
        return <Daily {...commonProps} />;
      case "monthly":
        return <Monthly {...commonProps} />;
      case "yearly":
        return <Yearly {...commonProps} />;
      default:
        return <Daily {...commonProps} />;
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
              </Button>
              <Button
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
            <div className=" rounded-lg p-1 flex items-center space-x-2 px-2">
              {/* <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="bg-transparent text-white border border-white focus:outline-none focus:border-dashboard-600 rounded px-3 py-2"
              >
                <option value="">Pilih Lokasi</option>
                <option value="kuala-tanjung">Offramp Kuala Tanjung</option>
                <option value="tj-morawa">Offramp Tj. Morawa</option>
                <option value="medan-mainroad">Mainroad Tol Medan</option>
              </select> */}
              {/* <Button
                className="bg-dashboard-accent text-white"
                onClick={handleSearch}
              >
                Search
              </Button> */}
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
