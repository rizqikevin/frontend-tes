import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeographicInfoSystem from "@/components/Dashboard/GeographicInfoSystem/GeographicInfoSystem";
import TransactionOverview from "@/components/Dashboard/TransactionOverview/TransactionOverview";
import { OverloadOverDimention } from "@/components/Dashboard/OverloadOverDimention/OverloadOverDimention";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate] = useState("27 - February - 2025");
  const [endDate] = useState("27 - February - 2025");
  const [selectedView, setSelectedView] = useState("geographic");
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

  const getViewTitle = () => {
    switch (selectedView) {
      case "geographic":
        return "Geographic Informasi Sistem";
      case "transaction":
        return "Transaction Overview";
      case "overload":
        return "Overload - Over Dimention";
      default:
        return "Geographic Informasi Sistem";
    }
  };

  const getViewDescription = () => {
    switch (selectedView) {
      case "geographic":
        return "Pantau detail dari setiap kejadian";
      case "transaction":
        return "Pantau setiap detail transaksi";
      case "overload":
        return "Monitoring kendaraan berlebih muatan dan dimensi";
      default:
        return "Pantau detail dari setiap kejadian";
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case "geographic":
        return <GeographicInfoSystem />;
      case "transaction":
        return <TransactionOverview />;
      case "overload":
        return <OverloadOverDimention />;
      default:
        return <GeographicInfoSystem />;
    }
  };

  return (
    <div
      className={`flex min-h-screen bg-dashboard-dark text-white ${
        isDark ? "bg-dashboard-dark text-white" : "bg-gray-50 text-gray-900"
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

        <main className="p-8">
          <div className="flex justify-between mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1
                  className={`text-2xl font-semibold ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {getViewTitle()}
                </h1>
                <p className="text-gray-400">{getViewDescription()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger className="w-64 bg-dashboard-accent text-white px-4 py-2 border border-gray-700 rounded flex items-center">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geographic">
                        Geographic Informasi Sistem
                      </SelectItem>
                      <SelectItem value="transaction">
                        Transaction Overview
                      </SelectItem>
                      <SelectItem value="overload">
                        Overload - Over Dimention
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>
              <Button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                Search
              </Button>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
