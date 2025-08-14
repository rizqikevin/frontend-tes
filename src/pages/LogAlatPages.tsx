import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import LogAlat from "@/components/logalat/LogAlat";
import StatusAlat from "@/components/logalat/StatusAlat";
import { UserRole } from "@/types";

export const LogAlatPages: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("status");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  if (!user) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;

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
      case "status":
        return <StatusAlat />;
      case "log":
        return <LogAlat />;
      default:
        return <StatusAlat />;
    }
  };

  return (
    <div
      className={`flex min-h-screen bg-dashboard-dark text-white  ${
        isDark ? "bg-dashboard-dark text-white" : "bg-gray-500 text-gray-900"
      } transition-all duration-300`}
    >
      <DashboardSidebar />
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
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

        <main
          className={`p-8 ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setSelectedTab("status")}
                className={`${
                  selectedTab === "status"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Status Alat
              </Button>
              {isAdmin && (
                <Button
                  onClick={() => setSelectedTab("log")}
                  className={`${
                    selectedTab === "log"
                      ? "bg-gray-50 text-gray-900"
                      : "bg-dashboard-accent text-white"
                  }`}
                >
                  Log
                </Button>
              )}
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
