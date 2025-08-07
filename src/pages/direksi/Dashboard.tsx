import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeographicInfoSystem from "@/components/dashboard/GeographicInfoSystem/GeographicInfoSystem";
import TransactionOverview2 from "@/components/dashboard/TransactionOverview2/Bagian1";
import { OverloadOverDimention } from "@/components/dashboard/OverloadOverDimention/OverloadOverDimention";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { subDays } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import DatePicker from "react-datepicker";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { Bagian1 } from "@/components/dashboard/TransactionOverview2/Bagian1";
import { Bagian2 } from "@/components/dashboard/TransactionOverview2/Bagian2";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState<Date>(subDays(new Date(), 1));
  const [selectedTab, setSelectedTab] = useState<"bagian1" | "bagian2">(
    "bagian1"
  );
  const [selectedView, setSelectedView] = useState("transaction");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const { setDateRange } = useDateFilterStore();

  const handleSearch = () => {
    setDateRange(startDate, endDate);
  };

  const renderTab = () => {
    if (selectedView !== "transaction") return null;

    return (
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setSelectedTab("bagian1")}
            className={`${
              selectedTab === "bagian1"
                ? "bg-gray-50 text-gray-900"
                : "bg-transparent text-white border border-white"
            }`}
          >
            Bagian 1
          </Button>

          <Button
            variant="outline"
            onClick={() => setSelectedTab("bagian2")}
            className={`${
              selectedTab === "bagian2"
                ? "bg-gray-50 text-gray-900"
                : "bg-transparent text-white border border-white"
            }`}
          >
            Bagian 2
          </Button>
        </div>
      </div>
    );
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

  useEffect(() => {
    if (selectedView !== "transaction") {
      setSelectedTab(null);
    } else if (selectedTab === null) {
      setSelectedTab("bagian1");
    }
  }, [selectedView]);

  const getViewTitle = () => {
    switch (selectedView) {
      case "geographic":
        return "Geographic Informasi Sistem";
      case "transaction":
        return "Transaction Overview";
      case "overload":
        return "Overload - Over Dimention";
      default:
        return "Transaction Overview";
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
        return "Pantau setiap detail transaksi";
    }
  };
  const renderContent = () => {
    switch (selectedView) {
      case "geographic":
        return <GeographicInfoSystem />;
      case "transaction":
        return selectedTab === "bagian1" ? (
          <Bagian1 selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        ) : (
          <Bagian2 selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        );
      case "overload":
        return <OverloadOverDimention />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex min-h-screen bg-dashboard-dark text-white ${
        isDark ? "bg-dashboard-dark text-white" : "bg-gray-50 text-gray-900"
      } transition-all duration-300`}
    >
      <DashboardSidebar />
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-0" : "ml-64"}`}>
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
                  {getViewTitle()}
                </h1>
                <p className="text-gray-400">{getViewDescription()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger
                      className={`w-64 bg-dashboard-accent text-white px-4 py-2 border border-gray-700 rounded flex items-center ${
                        isDark
                          ? "bg-dashboard-accent text-white"
                          : "bg-gray-50 text-gray-900"
                      } `}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      className={`${
                        isDark
                          ? "bg-dashboard-accent text-white"
                          : "bg-gray-50 text-gray-900"
                      } `}
                    >
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
                  <div
                    className={`border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent ${
                      isDark
                        ? "bg-dashboard-accent text-white"
                        : "bg-gray-50 text-gray-900"
                    } `}
                  >
                    <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="bg-transparent w-24 outline-none text-white"
                    />
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
                    <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="bg-transparent w-24 outline-none text-white"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSearch}
                className="px-4 py-2 bg-white border text-black rounded hover:bg-gray-200"
              >
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
