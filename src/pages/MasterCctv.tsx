import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";
import { FormMasterDataCctv } from "@/components/dashboard/Admin/masterdataCctv/FormMasterDataCctv";

export const DataCctv: React.FC = () => {
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
          isSidebarCollapsed ? "ml-16" : "ml-64"
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
          <div className="flex justify-end mb-8"></div>
          <div className="grid lg:grid-cols-1 gap-6">
            <div className="lg:col-span-2 h-full">
              <FormMasterDataCctv />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
