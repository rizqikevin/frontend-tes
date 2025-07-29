import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { ImageCard } from "./dashboard/OverloadOverDimention/ImageCard";
import { VehicleInfo } from "./dashboard/OverloadOverDimention/VehicleInfo";

interface RawData {
  id: number;
  GateID: number;
  VehicleLength: number;
  GrossWeight: number;
  AxlesCount: number;
  Golongan: number;
  Overload: boolean;
  BoothNumber: number;
  AxleWeight: number[];
  LeftRightWeight: number[][];
  Direction: number;
  Speed: number;
  WheelBase: number;
  StandarJBI: number;
  OverWeight: number;
}

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
  status: string;
  raw: RawData;
}

const gardanImageMap: Record<string, string> = {
  "2-1-false": "/gardan/Green/4.svg",
  "2-1-true": "/gardan/Red/4.svg",
  "2-2-false": "/gardan/Green/6.svg",
  "2-2-true": "/gardan/Red/6.svg",
  "3-2-false": "/gardan/Green/9.svg",
  "3-2-true": "/gardan/Red/9.svg",
  "3-3-false": "/gardan/Green/10.svg",
  "3-3-true": "/gardan/Red/10.svg",
};

export const DetailOdol: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { id } = useParams();
  const [data, setData] = useState<OdolDetail | null>(null);
  const [parsedRaw, setParsedRaw] = useState<RawData | null>(null);

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
        const odolData: OdolDetail = res.data.data;
        setData(odolData);

        if (odolData.raw) {
          setParsedRaw(odolData.raw);
        }
      } catch (err) {
        console.error("Gagal fetch detail:", err);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const isDark = theme === "dark";

  const gardanKey =
    parsedRaw != null
      ? `${parsedRaw.AxlesCount}-${parsedRaw.Golongan}-${parsedRaw.Overload}`
      : "";

  const gardanImageUrl = gardanImageMap[gardanKey] || "/gardan/Normal/4.svg";

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
            <div className="grid grid-cols-2 md:grid-cols-2 w-full gap-5">
              <div className="space-y-4 max-w-4xl w-full">
                <ImageCard title="Gambar Transaksi" imageUrl={data.url2} />

                <div className="overflow-auto mt-4 bg-dashboard-accent rounded-sm p-5">
                  <ImageCard title="Gardan" imageUrl={gardanImageUrl} />

                  <table className="min-w-full table-auto text-sm text-left text-gray-300 border border-gray-600">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="px-4 py-2 border border-gray-600">
                          Posisi Roda
                        </th>
                        {(() => {
                          const maxAxleCount = Math.max(
                            parsedRaw?.LeftRightWeight?.[0]?.length || 0,
                            parsedRaw?.LeftRightWeight?.[1]?.length || 0
                          );
                          return Array.from({ length: maxAxleCount }).map(
                            (_, index) => (
                              <th
                                key={index}
                                className="px-4 py-2 border border-gray-600"
                              >
                                {index === 0 ? "Depan" : `Belakang ${index}`}
                              </th>
                            )
                          );
                        })()}
                      </tr>
                    </thead>
                    <tbody>
                      {["Kiri", "Kanan"].map((label, rowIndex) => {
                        const row =
                          parsedRaw?.LeftRightWeight?.[rowIndex] || [];
                        const maxAxleCount = Math.max(
                          parsedRaw?.LeftRightWeight?.[0]?.length || 0,
                          parsedRaw?.LeftRightWeight?.[1]?.length || 0
                        );

                        return (
                          <tr key={label} className="bg-dashboard-accent">
                            <td className="px-4 py-2 border border-gray-600 font-medium">
                              {label}
                            </td>
                            {Array.from({ length: maxAxleCount }).map(
                              (_, colIndex) => (
                                <td
                                  key={colIndex}
                                  className="px-4 py-2 border border-gray-600"
                                >
                                  {typeof row[colIndex] === "number"
                                    ? `${row[colIndex]} kg`
                                    : "--"}
                                </td>
                              )
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
                  dimensi={data.dimensi.replace("x", "  ")}
                  status={data.status}
                  StandarJBI={data.raw?.StandarJBI?.toString() || "N/A"}
                  OverWeight={data.raw?.OverWeight?.toString() || "N/A"}
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
