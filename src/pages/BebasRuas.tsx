import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { PetaBebanRuas } from "@/components/bebanRuas/peta/petaBebanRuas";

export const BebanRuas: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedTab, setSelectedTab] = useState("peta");

  const renderContent = () => {
    switch (selectedTab) {
      case "peta":
        return <PetaBebanRuas />;
      default:
        return "Masih dalam tahap pengembangan";
    }
  };

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
                onClick={() => setSelectedTab("peta")}
                className={`${
                  selectedTab === "peta"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Peta
              </Button>

              {/* <Button
                onClick={() => setSelectedTab("riwayat")}
                className={`${
                  selectedTab === "riwayat"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-dashboard-accent text-white"
                }`}
              >
                Riwayat
              </Button> */}
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default BebanRuas;
