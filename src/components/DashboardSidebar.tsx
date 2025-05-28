import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HmwLogo from "./HmwLogo";
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
  PencilLine,
  Video,
  RectangleHorizontal,
  BusFrontIcon,
  Car,
  CloudDownloadIcon,
  MapPinPlusIcon,
  MessageCircleMoreIcon,
  LucideCloudy,
  Cast,
  ChartNoAxesColumnIcon,
  ZapIcon,
  Wind,
  AlertCircle,
  Timer,
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
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "LalinHarian"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("sidebarStateChange", {
        detail: { collapsed: isSidebarCollapsed },
      })
    );

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
        <div className="px-4 py-4 mb-6 flex justify-center relative">
          <button
            onClick={toggleSidebar}
            className="absolute -bottom-96 left-full transform -translate-y-1/2 -translate-x-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-sidebar relative h-screen bg-gray-900 text-white">
      <div className="px-4 py-4 mb-6 flex justify-center relative">
        <HmwLogo />
        <button
          onClick={toggleSidebar}
          className="absolute -bottom-96 left-full transform -translate-y-1/2 -translate-x-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
        >
          &lt;
        </button>
      </div>

      <div className="overflow-y-auto max-h-[50vh] pr-1 scrollbar-hidden">
        <div className="px-3 mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
            MAIN
          </div>
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            text="Dashboard"
            to="/dashboard"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<PencilLine size={18} />}
            text="Input Business Plan"
            to="/business-plan"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<BarChart size={18} />}
            text="Lalin Harian"
            hasSubmenu
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

        <div className="px-3 mb-2">
          <SidebarItem icon={<Video size={18} />} text="CCTV" to="/cctv" />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<RectangleHorizontal size={18} />}
            text="VMS"
            to="/vms"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<BusFrontIcon size={18} />}
            text="ALPR"
            to="/alpr"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<Car size={18} />}
            text="Incident"
            to="/incident"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<CloudDownloadIcon size={18} />}
            text="Vlop"
            to="/vlop"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<MapPinPlusIcon size={18} />}
            text="GPS Vehicle Tracking"
            to="/gps-vehicle-tracking"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<MessageCircleMoreIcon size={18} />}
            text="Sosial Media"
            to="/sosial-media"
          />
        </div>
        <div className="px-3 mb-2">
          <SidebarItem
            icon={<LucideCloudy size={18} />}
            text="Weather"
            to="/weather"
          />
        </div>

        <div className="px-3 mt-auto mb-2">
          <SidebarItem icon={<Cast size={18} />} text="Floods" to="/floods" />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<Lamp size={18} />}
            text="Street Light"
            hasSubmenu
            expanded={expandedItem === "streetLight"}
            onClick={() => toggleExpand("streetLight")}
          />
          {expandedItem === "streetLight" && (
            <div className="ml-6 mt-1 space-y-1">
              <SidebarItem icon={<Cast size={18} />} text="RJU" to="/rju" />
              <SidebarItem
                icon={<Cast size={18} />}
                text="Lampu Hias"
                to="/lampu-hias"
              />
            </div>
          )}
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<ChartNoAxesColumnIcon size={18} />}
            text="PDB"
            to="/pdb"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem icon={<ZapIcon size={18} />} text="UPS" to="/ups" />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<Wind size={18} />}
            text="Air Quality"
            to="/air-quality"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<AlertCircle size={18} />}
            text="Genset"
            to="/genset"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<Timer size={18} />}
            text="Log History"
            to="/log-history"
          />
        </div>

        <div className="px-3 mb-2">
          <SidebarItem
            icon={<Settings size={18} />}
            text="Log Alat"
            to="/log-alat"
          />
        </div>
      </div>

      <div className="px-3 mt-auto absolute bottom-64 w-full">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 sticky top-0">
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
          hasSubmenu
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
