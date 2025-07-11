import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import UserTable from "@/components/users/usersdata/UserTable";
import { OverloadOverDimention } from "./dashboard/OverloadOverDimention/OverloadOverDimention";
import { ImageCard } from "./dashboard/OverloadOverDimention/ImageCard";
import { VehicleInfo } from "./dashboard/OverloadOverDimention/VehicleInfo";
import { VehichleDougnut } from "./dashboard/OverloadOverDimention/VehicleDougnut";

export const DetailOdol: React.FC = () => {
  const { user, logout } = useAuth();
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
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center px-0">
            <div>
              <h1 className="text-2xl font-medium">Overload Over Dimention</h1>
              <p className="text-gray-400">Pantau setiap detail</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Kolom gambar */}
            <div className="space-y-4 max-w-xl">
              <ImageCard
                title="Gambar Transaksi"
                imageUrl="https://imgx.gridoto.com/crop/3x34:891x460/750x500/photo/2018/12/29/129762105.jpg"
              />
              <ImageCard
                title="Gambar Plat Nomor (ANPR)"
                imageUrl="https://imgx.gridoto.com/crop/0x0:700x393/700x465/photo/gridoto/2018/05/21/2594849356.jpg"
              />
            </div>
            <div className="space-y-4">
              <VehicleInfo />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailOdol;
