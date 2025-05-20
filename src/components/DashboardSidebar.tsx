import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DelamataBilanoLogo from "./DelamataBilanoLogo";
import {
  LayoutDashboard,
  BarChart,
  Lamp,
  Bell,
  Settings,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  PanelLeft,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  to?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  expanded = false,
  onClick,
  children,
  to = "#",
}) => {
  return (
    <div className="mb-1">
      <Link
        to={to}
        className={`flex items-center px-4 py-2 text-sm ${
          active
            ? "bg-gray-700 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        } rounded-md cursor-pointer`}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{text}</span>
        {hasSubmenu && (
          <span className="ml-auto">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </Link>

      {expanded && children && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "LalinHarian"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Update Dashboard component about sidebar state
  useEffect(() => {
    // Dispatch custom event when sidebar state changes
    window.dispatchEvent(
      new CustomEvent("sidebarStateChange", {
        detail: { collapsed: isSidebarCollapsed },
      })
    );

    // Apply theme class to document element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isSidebarCollapsed]);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isSidebarCollapsed) {
    return (
      <div className="dashboard-sidebar-collapsed">
        <div className="flex justify-center py-4">
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-700 p-2 rounded"
          >
            <PanelLeft size={22} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 px-2 py-4">
          <Link to="/dashboard" className="p-2 rounded hover:bg-gray-700">
            <LayoutDashboard size={22} className="text-gray-300" />
          </Link>
          <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            <BarChart size={22} className="text-gray-300" />
          </div>
          <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            <Lamp size={22} className="text-gray-300" />
          </div>
          <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            <Bell size={22} className="text-gray-300" />
          </div>
          <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            <Settings size={22} className="text-gray-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-sidebar">
      <div className="px-4 py-4 mb-6 flex items-center justify-between">
        <DelamataBilanoLogo />
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-gray-700 p-1 rounded"
        >
          <PanelLeft size={18} />
        </button>
      </div>

      <div className="px-3 mb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
          MAIN
        </div>
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          text="Dashboard"
          to="/dashboard"
        />
      </div>

      <div className="px-3 mb-6">
        <SidebarItem
          icon={<BarChart size={18} />}
          text="Lalin Harian"
          hasSubmenu={true}
          expanded={expandedItem === "LalinHarian"}
          onClick={() => toggleExpand("LalinHarian")}
        >
          <SidebarItem
            icon={<span className="w-2 h-2 bg-gray-400 rounded-full" />}
            text="Lalin Report"
            to="/dashboard/Lalin-report"
          />
          <SidebarItem
            icon={<span className="w-2 h-2 bg-gray-400 rounded-full" />}
            text="Lalin Portable Report"
            to="/dashboard/Lalin-portable-report"
          />
          <SidebarItem
            icon={<span className="w-2 h-2 bg-gray-400 rounded-full" />}
            text="Camera"
            to="/dashboard/camera"
          />
        </SidebarItem>
      </div>

      <div className="px-3 mb-6">
        <SidebarItem
          icon={<Lamp size={18} />}
          text="Street Light"
          hasSubmenu={true}
          expanded={expandedItem === "streetLight"}
          onClick={() => toggleExpand("streetLight")}
        />
      </div>

      <div className="px-3 mb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
          SETTINGS
        </div>
        <SidebarItem
          icon={<Bell size={18} />}
          text="Notification"
          to="/dashboard/notifications"
        />
        <SidebarItem
          icon={<Settings size={18} />}
          text="Settings"
          hasSubmenu={true}
          expanded={expandedItem === "settings"}
          onClick={() => toggleExpand("settings")}
        />
      </div>

      <div className="px-3 mt-auto absolute bottom-4 flex justify-between w-full pr-6">
        <button
          className={`flex items-center space-x-2 px-4 py-1 text-sm ${
            theme === "light"
              ? "bg-gray-700 text-white"
              : "text-white bg-transparent"
          } hover:bg-gray-700 rounded`}
          onClick={() => toggleTheme("light")}
        >
          <Sun size={16} />
          <span className="text-sm">Light</span>
        </button>

        <button
          className={`flex items-center space-x-2 px-4 py-1 text-sm ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "text-white bg-transparent"
          } hover:bg-gray-700 rounded`}
          onClick={() => toggleTheme("dark")}
        >
          <Moon size={16} />
          <span className="text-sm">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
