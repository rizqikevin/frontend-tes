import React, { useState, useEffect, useRef } from "react";
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
  BookOpenTextIcon,
  Database,
  Truck,
  CameraIcon,
  VideoIcon,
  VideoOffIcon,
  Videotape,
  Dot,
  ChartAreaIcon,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useMenuStore, MenuItem } from "@/stores/useMenuStore";

export const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const { menuItems, loading, error, fetchMenuItems } = useMenuStore();

  const [expandedItem, setExpandedItem] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMenuItems();
    };
    fetchData();
  }, [fetchMenuItems]);

  useEffect(() => {
    if (user?.role === UserRole.SUPPORT) {
      setIsSidebarCollapsed(true);
    }
  }, [user]);

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

  const toggleExpand = (item: string) => {
    setExpandedItem((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!user) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;

  const iconMap: { [key: string]: React.ReactNode } = {
    Dashboard: <LayoutDashboard size={18} />,
    "Lalin Harian": <BarChart size={18} />,
    "Lalin Report": <ChartAreaIcon size={18} />,
    Camera: <CameraIcon size={18} />,
    CCTV: <Video size={18} />,
    VMS: <RectangleHorizontal size={18} />,
    ALPR: <BusFrontIcon size={18} />,
    Incident: <Car size={18} />,
    Kecelakaan: <AlertCircle size={18} />,
    Voip: <CloudDownloadIcon size={18} />,
    ODOL: <Truck size={18} />,
    "Beban Ruas": <BookOpenTextIcon size={18} />,
    "GPS Vehicle Tracking": <MapPinPlusIcon size={18} />,
    "Log Report Violation": <MessageCircleMoreIcon size={18} />,
    "Street Light": <Lamp size={18} />,
    PJU: <LucideCloudy size={18} />,
    PDB: <ChartNoAxesColumnIcon size={18} />,
    "Air Quality": <Wind size={18} />,
    "Log Alat": <Timer size={18} />,
    "Master Data": <Database size={18} />,
    Vehicle: <Truck size={18} />,
    "CCTV Data": <Videotape size={18} />,
    Account: <UserCircle size={18} />,
    "Data Users": <User size={18} />,
    "User Level": <UsersRoundIcon size={18} />,
    "User Menu": <UserX2Icon size={18} />,
    Settings: <Settings size={18} />,
    "Incident Notif": <Bell size={18} />,
    default: <Dot size={18} />,
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      return (
        <SidebarItem
          key={item.name + item.route}
          text={item.name}
          to={!hasChildren ? item.route : undefined}
          icon={iconMap[item.name] || iconMap["default"]}
          hasSubmenu={hasChildren}
          expanded={expandedItem.includes(item.name)}
          onClick={hasChildren ? () => toggleExpand(item.name) : undefined}
        >
          {hasChildren && renderMenuItems(item.children)}
        </SidebarItem>
      );
    });
  };

  const mainMenuItems = menuItems.filter(
    (item) => !["Master Data", "Account", "Settings"].includes(item.name)
  );
  const settingsMenuItems = menuItems.filter((item) =>
    ["Master Data", "Account", "Settings"].includes(item.name)
  );

  if (isSidebarCollapsed) {
    return (
      <div
        className={`fixed left-0 z-10 min-h-screen w-2 flex flex-col ${
          theme === "dark"
            ? "bg-transparent text-white"
            : "bg-white text-gray-900 border-r border-gray-200"
        }`}
      >
        <div className="flex-1 flex items-center justify-center">
          {user?.role !== UserRole.SUPPORT && (
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
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {user?.role !== UserRole.SUPPORT && (
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
              <div className="flex-1 flex items-center justify-center">
                {user?.role !== UserRole.SUPPORT && (
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
                )}
              </div>
            </div>
            <div className="px-4 py-4 mb-6 flex justify-center relative">
              <HmwLogo />
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto max-h-[calc(100vh-150px)] pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {loading && (
                <div className="p-4 text-center">Loading Menu...</div>
              )}
              {error && (
                <div className="p-4 text-center text-red-500">
                  Error: {error}
                </div>
              )}
              {!loading && !error && (
                <>
                  <div className="px-3 mb-3">
                    <div
                      className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      MAIN
                    </div>
                    {renderMenuItems(mainMenuItems)}
                  </div>

                  {isAdmin && settingsMenuItems.length > 0 && (
                    <div className="mt-10 mb-auto px-3 space-y-2">
                      <div
                        className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        SETTINGS
                      </div>
                      {renderMenuItems(settingsMenuItems)}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardSidebar;
