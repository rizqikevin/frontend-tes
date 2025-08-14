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
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user?.role === UserRole.SUPPORT) {
      setIsSidebarCollapsed(true);
    }
  }, [user]);

  const isAdmin = user.role === UserRole.ADMIN;
  const isDireksi = user.role === UserRole.DIREKSI;
  const isSupport = user.role === UserRole.SUPPORT;

  const [expandedItem, setExpandedItem] = useState<string[] | null>([
    "LalinHarian",
    // "Incident",
    // "settings",
    // "account",
  ]);
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
    if (expandedItem.includes(item)) {
      setExpandedItem(expandedItem.filter((i) => i !== item));
    } else {
      setExpandedItem([...expandedItem, item]);
    }
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
              {/* Centered arrow button to expand sidebar */}
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
              className="overflow-y-auto max-h-[60vh] pr-1  scrollbar-thumb-gray-700 scrollbar-track-gray-700"
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
                  expanded={expandedItem.includes("LalinHarian")}
                  onClick={() => toggleExpand("LalinHarian")}
                >
                  {expandedItem.includes("LalinHarian") && (
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
                  {expandedItem.includes("LalinHarian") && (
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
                <SidebarItem
                  icon={<Video size={18} />}
                  text="CCTV"
                  to="/cctv"
                />
              </div>
              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<RectangleHorizontal size={18} />}
                  text="VMS"
                  to="/vms"
                />
              </div>

              {isAdmin && (
                <div className="px-3 mb-2">
                  <SidebarItem
                    icon={<BusFrontIcon size={18} />}
                    text="ALPR"
                    to="/alpr"
                  />
                </div>
              )}
              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<Car size={18} />}
                  text="Incident"
                  hasSubmenu
                  expanded={expandedItem.includes("Incident")}
                  onClick={() => toggleExpand("Incident")}
                >
                  {expandedItem.includes("Incident") && (
                    <div className=" mt-1 space-y-1">
                      <SidebarItem
                        icon={<DotIcon size={18} />}
                        text="Incident"
                        to="/incident"
                      />
                    </div>
                  )}
                  {expandedItem.includes("Incident") && (
                    <div className=" mt-1 space-y-1">
                      <SidebarItem
                        icon={<DotIcon size={18} />}
                        text="Kecelakaan"
                        to="/kecelakaan"
                      />
                    </div>
                  )}
                </SidebarItem>
              </div>

              {isAdmin && (
                <div className="px-3 mb-2">
                  <SidebarItem
                    icon={<CloudDownloadIcon size={18} />}
                    text="Voip"
                    to="/voip"
                  />
                </div>
              )}

              {isAdmin && (
                <div className="px-3 mb-2">
                  <SidebarItem
                    icon={<PencilLine size={18} />}
                    text="ODOL"
                    to="/odol"
                  />
                </div>
              )}

              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<BookOpenTextIcon size={18} />}
                  text="Beban Ruas"
                  to="/beban-ruas"
                />
              </div>
              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<MapPinPlusIcon size={18} />}
                  text="GPS Vehicle Tracking"
                  hasSubmenu
                  expanded={expandedItem.includes("gps")}
                  onClick={() => toggleExpand("gps")}
                />
                {expandedItem.includes("gps") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <SidebarItem
                      icon={<Dot size={18} />}
                      text="GPS Vehicle Tracking"
                      to="/gps-vehicle-tracking"
                    />
                  </div>
                )}
                {expandedItem.includes("gps") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <SidebarItem
                      icon={<Dot size={18} />}
                      text="Log Report Violation"
                      to="/log-report-violation"
                    />
                  </div>
                )}
              </div>
              {/* <div className="px-3 mb-2">
                <SidebarItem
                  icon={<MessageCircleMoreIcon size={18} />}
                  text="Sosial Media"
                  to="/sosial-media"
                />
              </div> */}
              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<LucideCloudy size={18} />}
                  text="Weather"
                  to="/weather"
                />
              </div>

              {isAdmin && (
                <div className="px-3 mt-auto mb-2">
                  <SidebarItem
                    icon={<Cast size={18} />}
                    text="Floods"
                    to="/floods"
                  />
                </div>
              )}

              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<Lamp size={18} />}
                  text="Street Light"
                  hasSubmenu
                  expanded={expandedItem.includes("streetLight")}
                  onClick={() => toggleExpand("streetLight")}
                />
                {expandedItem.includes("streetLight") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <SidebarItem
                      icon={<Cast size={18} />}
                      text="PJU"
                      to="/pju"
                    />
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="px-3 mb-2">
                  <SidebarItem
                    icon={<ChartNoAxesColumnIcon size={18} />}
                    text="PDB"
                    to="/pdb"
                  />
                </div>
              )}

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
                  icon={<Settings size={18} />}
                  text="Log Alat"
                  to="/log-alat"
                />
              </div>
            </div>

            {/* {isAdmin && (
              <div className="px-3 mb-2">
                <SidebarItem
                  icon={<Timer size={18} />}
                  text="Log History"
                  to="/log-history"
                />
              </div>
            )} */}

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

                  <div className="mb-2">
                    <SidebarItem
                      icon={<Database size={18} />}
                      text="Master Data"
                      hasSubmenu
                      expanded={expandedItem.includes("masterData")}
                      onClick={() => toggleExpand("masterData")}
                    >
                      {expandedItem.includes("masterData") && (
                        <div className="m-1 space-y-1">
                          <SidebarItem
                            icon={<Truck size={18} />}
                            text="Vehicle"
                            to="/data-vehicle"
                          />
                        </div>
                      )}
                      {expandedItem.includes("masterData") && (
                        <div className="m-1 space-y-1">
                          <SidebarItem
                            icon={<Videotape size={18} />}
                            text="CCTV"
                            to="/data-cctv"
                          />
                        </div>
                      )}
                    </SidebarItem>
                  </div>

                  {/* Account Menu */}
                  <div className=" mb-2">
                    <SidebarItem
                      icon={<UserCircle size={18} />}
                      text="Account"
                      hasSubmenu
                      expanded={expandedItem.includes("account")}
                      onClick={() => toggleExpand("account")}
                    >
                      {expandedItem.includes("account") && (
                        <div className="m-1 space-y-1">
                          <SidebarItem
                            icon={<User size={18} />}
                            text="Data Users"
                            to="/data-users"
                          />
                        </div>
                      )}
                      {expandedItem.includes("account") && (
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
                      expanded={expandedItem.includes("settings")}
                      onClick={() => toggleExpand("settings")}
                    >
                      {expandedItem.includes("settings") && (
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
      )}
    </>
  );
};

export default DashboardSidebar;
