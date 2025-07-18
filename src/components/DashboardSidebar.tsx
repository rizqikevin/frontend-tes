import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import HmwLogo from "./HmwLogo";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import {
  LayoutDashboard,
  BarChart,
  Lamp,
  Bell,
  Settings,
  ChevronRight,
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
  ChevronLeft,
  User,
  AlertCircleIcon,
  UserCircle,
  User2,
  UserCircle2,
  UserX2Icon,
  UsersRoundIcon,
  DotIcon,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;
  const isDireksi = user.role === UserRole.DIREKSI;

  const [expandedItem, setExpandedItem] = useState<string | null>(
    "LalinHarian"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") ?? "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("sidebar-scroll");
    if (scrollRef.current && savedPosition) {
      scrollRef.current.scrollTop = parseInt(savedPosition);
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(
        "sidebar-scroll",
        scrollRef.current.scrollTop.toString()
      );
    }
  };

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.style.backgroundColor = "#1E1E1E";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("sidebarStateChange", {
        detail: { collapsed: isSidebarCollapsed },
      })
    );
  }, [isSidebarCollapsed]);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isSidebarCollapsed) {
    return (
      <div
        className={`fixed left-0 z-10 min-h-screen w-2 flex flex-col ${
          theme === "dark"
            ? "bg-transparent text-white"
            : "bg-white text-gray-900 border-r border-gray-200"
        }`}
      >
        {/* Centered arrow button to expand sidebar */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={toggleSidebar}
            className={`p-3 rounded-full transition-colors  ${
              theme === "dark"
                ? "text-white hover:bg-gray-700 bg-gray-700"
                : "text-gray-900 hover:bg-gray-100 bg-gray-100"
            }`}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed left-0 z-50 min-h-screen transition-all duration-500 ease-in-out md:overflow-auto  md:w-64  ${
          isSidebarCollapsed ? "w-8" : "w-64"
        } ${
          theme === "dark"
            ? "bg-dashboard-sidebar text-white"
            : "bg-gray-50 text-black border-r border-gray-200"
        }`}
      >
        <div
          className={`fixed left-60 z-10 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-64" : "w-8"
          } ${
            theme === "dark"
              ? "bg-transparent text-white"
              : "bg-white text-gray-900 border-r border-gray-200"
          }`}
        >
          {/* Centered arrow button to expand sidebar */}
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={toggleSidebar}
              className={`p-3 rounded-full transition-color ${
                theme === "dark"
                  ? "text-white hover:bg-gray-700 bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100 bg-gray-100"
              }`}
            >
              <ChevronLeft size={15} />
            </button>
          </div>
        </div>
        <div className="px-4 py-4 mb-6 flex justify-center relative">
          <HmwLogo />
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-y-auto max-h-[56vh] pr-1 scrollbar-hidden"
        >
          <div className="px-3 mb-3">
            <div
              className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              MAIN
            </div>
            {isDireksi && (
              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
                to="/dashboard/direksi"
              />
            )}

            {isAdmin && (
              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                text="Dashboard Admin"
                to="/dashboard/admin"
              />
            )}
          </div>

          {/* <div className="px-3 mb-2">
            <SidebarItem
              icon={<PencilLine size={18} />}
              text="Input Business Plan"
              to="/input-business"
            />
          </div> */}

          {/* {isAdmin && (
            <div className="px-3 mb-2">
              <SidebarItem
                icon={<PencilLine size={18} />}
                text="Input Prognosa"
                to="/input-prognosa"
              />
            </div>
          )} */}

          <div className="px-3 mb-2">
            <SidebarItem
              icon={<BarChart size={18} />}
              text="Lalin Harian"
              hasSubmenu
              expanded={expandedItem === "LalinHarian"}
              onClick={() => toggleExpand("LalinHarian")}
            >
              {expandedItem === "LalinHarian" && (
                <div className=" mt-1 space-y-1">
                  <SidebarItem
                    icon={<DotIcon size={18} />}
                    text="Lalin Report"
                    to="/lalin-report"
                  />
                </div>
              )}
              {/* <NavLink
      to="/lalin-portable-report"
      className={`flex items-center px-4 py-2 text-sm rounded-md cursor-pointer ${
        theme === "dark"
          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
          : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span
        className={`mr-3 w-2 h-2 rounded-full ${
          theme === "dark" ? "bg-gray-400" : "bg-gray-600"
        }`}
      />
      <span>Lain Portable Report</span>
    </NavLink> */}
              {expandedItem === "LalinHarian" && (
                <div className=" mt-1 space-y-1">
                  <SidebarItem
                    icon={<DotIcon size={18} />}
                    text="Camera"
                    to="/camera"
                  />
                </div>
              )}
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
              text="Voip"
              to="/voip"
            />
          </div>
          <div className="px-3 mb-2">
            <SidebarItem
              icon={<PencilLine size={18} />}
              text="ODOL"
              to="/odol"
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
                <SidebarItem icon={<Cast size={18} />} text="PJU" to="/pju" />
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

          {/* <div className="px-3 mb-2">
      <SidebarItem icon={<ZapIcon size={18} />} text="UPS" to="/ups" />
    </div> */}

          <div className="px-3 mb-2">
            <SidebarItem
              icon={<Wind size={18} />}
              text="Air Quality"
              to="/air-quality"
            />
          </div>

          {/* <div className="px-3 mb-2">
      <SidebarItem
        icon={<AlertCircle size={18} />}
        text="Genset"
        to="/genset"
      />
    </div> */}

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

        {isAdmin && (
          <div className="mt-10 mb-auto px-3 space-y-4">
            <div>
              <div
                className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                SETTINGS
              </div>

              {/* Account Menu */}
              <div className=" mb-2">
                <SidebarItem
                  icon={<UserCircle size={18} />}
                  text="Account"
                  hasSubmenu
                  expanded={expandedItem === "account"}
                  onClick={() => toggleExpand("account")}
                >
                  {expandedItem === "account" && (
                    <div className="m-1 space-y-1">
                      <SidebarItem
                        icon={<User size={18} />}
                        text="Data Users"
                        to="/data-users"
                      />
                    </div>
                  )}
                  {expandedItem === "account" && (
                    <div className="m-1 space-y-1">
                      <SidebarItem
                        icon={<UsersRoundIcon size={18} />}
                        text="User Level"
                        to="/user-level"
                      />
                    </div>
                  )}
                </SidebarItem>
              </div>

              {/* Settings Menu */}
              <div className=" mb-2">
                <SidebarItem
                  icon={<Settings size={18} />}
                  text="Settings"
                  hasSubmenu
                  expanded={expandedItem === "settings"}
                  onClick={() => toggleExpand("settings")}
                >
                  {expandedItem === "settings" && (
                    <div className="m-1 space-y-1">
                      <SidebarItem
                        icon={<User size={18} />}
                        text="Incident Notif"
                        to="/incident-notification"
                      />
                    </div>
                  )}
                </SidebarItem>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto pt-4">
        <div className="px-3 mt-auto absolute bottom-4 flex justify-between w-full pr-6">
          {/* <button
      className={`flex items-center space-x-2 px-4 py-1 text-sm transition-colors ${
        theme === "light"
          ? "bg-blue-500 text-white"
          : "text-gray-300 bg-transparent"
      } hover:bg-gray-700 rounded`}
      onClick={() => toggleTheme("light")}
    >
      <Sun size={16} />
      <span className="text-sm">Light</span>
    </button> */}

          {/* <button
      className={`flex items-center space-x-2 px-4 py-1 text-sm transition-colors ${
        theme === "dark"
          ? "bg-blue-500 text-white"
          : "text-gray-600 bg-transparent"
      } hover:bg-gray-100 rounded`}
      onClick={() => toggleTheme("dark")}
    >
      <Moon size={16} />
      <span className="text-sm">Dark</span>
    </button> */}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
