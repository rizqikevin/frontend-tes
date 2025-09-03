import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import SeksiCard from "@/components/bebanRuas/SeksiCard";
import Legend from "@/components/bebanRuas/Legend";
import { api2 } from "@/services/api";
import { useRuasStore } from "@/stores/useBebanRuasStore";
import { Button } from "@/components/ui/button";

export const BebanRuas: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState("peta");
  const ruasInternal = useRuasStore((state) => state.ruasInternal);
  const ruasExternal = useRuasStore((state) => state.ruasExternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    checkTheme();
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

  useEffect(() => {
    const fetchAll = async () => {
      await fetchRuasData();
      await fetchRuasData("external");
    };
    fetchAll();
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark relative overflow-hidden ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
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

        <main className="p-10 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setSelectedTab("status")}
                className={`${
                  selectedTab === "status"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Peta
              </Button>

              <Button
                onClick={() => setSelectedTab("log")}
                className={`${
                  selectedTab === "log"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Riwayat
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">
                Beban Ruas Tahun 2025
              </h1>
              <p className="text-xs font-semibold text-gray-400">
                Pantau Detail dari setiap ruas
              </p>
            </div>
            {/* <div className="flex items-center gap-2 mt-2 p-3 md:mt-0">
              <div className="bg-dashboard-accent border border-white flex rounded px-0 py-2 text-white">
                <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent w-24 outline-none text-white"
                />
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
              <div className="bg-dashboard-accent border border-white flex rounded px-0 py-2 text-white">
                <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent  w-24 outline-none text-white"
                />
              </div>
              <Button
                onClick={fetchRuasData}
                className="bg-white text-black rounded hover:bg-gray-200"
              >
                Search
              </Button>
            </div> */}
          </div>

          <div className="relative w-full h-[90vh] bg-dashboard-accent rounded-lg">
            <img
              src="/gate/tolgatemap.svg"
              alt="Gate Mapping"
              className="absolute w-full h-full object-contain pointer-events-none select-none"
            />

            {ruasInternal.map((ruas) => (
              <div
                key={ruas.id}
                className="absolute"
                style={{
                  top: ruas.posisi.top,
                  left: ruas.posisi.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <SeksiCard
                  name={ruas.name}
                  persen={ruas.persen}
                  binisPlanLhr={ruas.binisPlanLhr}
                  realisasiLhr={ruas.realisasiLhr}
                />
              </div>
            ))}

            <Legend />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BebanRuas;
