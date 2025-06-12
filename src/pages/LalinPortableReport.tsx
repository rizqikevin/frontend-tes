import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Daily } from "@/components/lalinharian/LalinPortableReport/Daily/Daily";
import { Summary } from "@/components/lalinharian/LalinPortableReport/Summary/Summary";
import { Monthly } from "@/components/lalinharian/LalinPortableReport/Monthly/Monthly";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";

export const LalinPortableReport: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("summary");
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
      case "summary":
        return <Summary />;
      case "daily":
        return <Daily />;
      case "monthly":
        return <Monthly />;
      default:
        return <Summary />;
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
        <header
          className={`flex justify-end items-center py-1 px-8 ${
            isDark ? "border-gray-700" : "border-gray-200 text-black"
          }`}
        >
          <div className="flex items-center space-x-2">
            {user && (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                    <div className="mr-2">
                      <img src={user.image} className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="text-sm">Hi, {user.name}</div>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <DropdownMenuItem
                      className={`${
                        isDark
                          ? "text-gray-200 hover:bg-gray-700"
                          : "text-gray-900 hover:bg-gray-100"
                      } flex items-center space-x-2`}
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

        <main
          className={`p-8 ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setSelectedTab("summary")}
                className={`${
                  selectedTab === "summary"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Summary
              </Button>
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
              <Button
                onClick={() => setSelectedTab("monthly")}
                className={`${
                  selectedTab === "monthly"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Monthly
              </Button>
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
