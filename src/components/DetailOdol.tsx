import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
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
  raw: string;
}

const gardanImageMap: Record<string, string> = {
  "2-1-false": "/gardan/Green/4.svg",
  "2-1-true": "/gardan/Red/2.svg",
  "2-2-false": "/gardan/Green/6.svg",
  "2-2-true": "/gardan/Red/6.svg",
  "3-3-false": "/gardan/Green/9.svg",
  "3-3-true": "/gardan/Red/9.svg",
};

function parseCustomRaw(raw: string | null | undefined): any {
  if (!raw) return null;

  try {
    const obj: any = {};
    const cleaned = raw.replace(/^{|}$/g, ""); // hapus kurung kurawal pembuka dan penutup

    const entries = cleaned.split(/,(?=\w+:)/); // pisahkan berdasarkan koma, tapi hanya yang bukan bagian dari array

    entries.forEach((entry) => {
      const [keyRaw, ...rest] = entry.split(":");
      const key = keyRaw.trim();
      const valueRaw = rest.join(":").trim();

      if (!key || valueRaw === undefined) return;

      // Deteksi array manual
      if (valueRaw.startsWith("[[") || valueRaw.startsWith("[")) {
        try {
          // Tambahkan tanda kutip agar bisa diparsing sebagai JSON
          const fixedArray = valueRaw
            .replace(/\[/g, "[")
            .replace(/\]/g, "]")
            .replace(/(\d+)(\s*,\s*)(\d+)/g, "$1,$3");

          obj[key] = JSON.parse(fixedArray);
        } catch (e) {
          console.warn("Gagal parsing array:", key, valueRaw);
          obj[key] = valueRaw;
        }
      } else {
        const trimmed = valueRaw.trim();

        obj[key] =
          trimmed === "true"
            ? true
            : trimmed === "false"
            ? false
            : isNaN(Number(trimmed))
            ? trimmed
            : Number(trimmed);
      }
    });

    return obj;
  } catch (error) {
    console.error("Parsing raw string error:", error);
    return null;
  }
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
        console.log(res.data.data);
      } catch (err) {
        console.error("Gagal fetch detail:", err);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const isDark = theme === "dark";

  const parsedRaw = parseCustomRaw(data?.raw);
  const gardanKey = parsedRaw
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
                        {(Array.isArray(parsedRaw?.LeftRightWeight) &&
                        parsedRaw.LeftRightWeight.length > 0
                          ? parsedRaw.LeftRightWeight
                          : [[], [], []]
                        ).map((_, index: number) => (
                          <th
                            key={index}
                            className="px-4 py-2 border border-gray-600"
                          >
                            {index === 0 ? "Depan" : `Belakang ${index}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {["Kanan", "Kiri"].map((posisi, rowIndex) => (
                        <tr key={posisi} className="bg-dashboard-accent">
                          <td className="px-4 py-2 border border-gray-600 font-medium">
                            {posisi}
                          </td>
                          {(Array.isArray(parsedRaw?.LeftRightWeight) &&
                          parsedRaw.LeftRightWeight.length > 0
                            ? parsedRaw.LeftRightWeight
                            : [[], [], []]
                          ) // fallback kosong
                            .map((axle: number[], colIndex: number) => (
                              <td
                                key={`${rowIndex}-${colIndex}`}
                                className="px-4 py-2 border border-gray-600"
                              >
                                {typeof axle?.[rowIndex] === "number"
                                  ? `${axle[rowIndex]} kg`
                                  : "--"}
                              </td>
                            ))}
                        </tr>
                      ))}
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
                  dimensi={data.dimensi}
                  raw={data.raw}
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
