import SearchHeader from "../components/sosialmedia/SearchHeader";
import StatCard from "../components/sosialmedia/StatCard";
import MediaGrid from "../components/sosialmedia/MediaGrid";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";

const respondens = [
  { label: "Positive", value: 900, percentage: 90, color: "#22c55e" },
  { label: "Neutral", value: 50, percentage: 5, color: "#facc15" },
  { label: "Negative", value: 50, percentage: 5, color: "#ef4444" },
];

const networks = [
  { label: "Facebook", value: 900, percentage: 50, color: "#22c55e" },
  { label: "Instagram", value: 50, percentage: 2, color: "#f97316" },
  { label: "Youtube", value: 50, percentage: 20, color: "#dc2626" },
  { label: "Website", value: 900, percentage: 3, color: "#84cc16" },
  { label: "Twitter", value: 50, percentage: 25, color: "#f59e0b" },
];

const types = [
  { label: "Link", value: 900, percentage: 10, color: "#10b981" },
  { label: "Photo", value: 50, percentage: 30, color: "#f59e0b" },
  { label: "Status", value: 50, percentage: 50, color: "#ef4444" },
  { label: "Video", value: 900, percentage: 10, color: "#22c55e" },
];

const SosialMedia: React.FC = () => {
  const { user, logout } = useAuth();
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

        <div className="min-h-screen text-white p-4 space-y-6">
          <SearchHeader />
          <div className="flex flex-wrap gap-4">
            <StatCard title="Responden" stats={respondens} />
            <StatCard title="Network" stats={networks} />
            <StatCard title="Type" stats={types} />
          </div>
          <MediaGrid />
        </div>
      </div>
    </div>
  );
};

export default SosialMedia;
