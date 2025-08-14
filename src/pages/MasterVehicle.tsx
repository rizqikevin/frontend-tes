import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { FormMasterDataVehicle } from "@/components/dashboard/Admin/masterdataVehicle/FormMasterDataVehicle";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

export const DataVehicle: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
      >
        {/* HEADER */}
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
        {/* MAIN */}
        <main className="p-8">
          <div className="flex justify-end mb-8">
            <div className="flex justify-center items-center space-x-4">
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
                  className="bg-transparent w-24 outline-none text-white"
                />
              </div>
              <Button
                // onClick={fetchData}
                className="bg-white text-black rounded hover:bg-gray-200"
              >
                Search
              </Button>
            </div>
          </div>
          <div className="grid lg:grid-cols-1 gap-6">
            <div className="lg:col-span-2 h-full">
              <FormMasterDataVehicle />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
