import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api"; // Pastikan API ini sudah sesuai
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { ImageCard } from "./dashboard/OverloadOverDimention/ImageCard";
import { VehicleInfo } from "./dashboard/OverloadOverDimention/VehicleInfo";

interface OdolDetail {
  id: string;
  gerbang: string;
  gardu: string;
  noresi: number;
  platnomor: string;
  tanggal: string;
  jam: string;
  kartu: string;
  golongan: string;
  berat: string;
  dimensi: string;
  url1: string;
  url2: string;
}

export const DetailOdol: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { id } = useParams();
  const [data, setData] = useState<OdolDetail | null>(null);

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
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/odol/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error("Gagal fetch detail:", err);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Header
          isDark={isDark}
          user={user ? { name: user.name, role: String(user.role) } : null}
          logout={logout}
        />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center px-0">
            <div>
              <h1 className="text-2xl font-medium">
                Detail Overload & Over Dimension
              </h1>
              <p className="text-gray-400">Pantau setiap detail</p>
            </div>
          </div>

          {data ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-4 max-w-xl">
                <ImageCard title="Gambar Transaksi" imageUrl={data.url1} />
                <ImageCard title="Plat Nomor (ANPR)" imageUrl={data.url2} />
              </div>
              <div className="space-y-4">
                <VehicleInfo
                  platnomor={data.platnomor}
                  gerbang={data.gerbang}
                  gardu={data.gardu}
                  noresi={data.noresi}
                  kartu={data.kartu}
                  tanggal={data.tanggal}
                  jam={data.jam}
                  golongan={data.golongan}
                  berat={data.berat}
                  dimensi={data.dimensi}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Memuat data detail...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DetailOdol;
