import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, Image, Video, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import api from "@/services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useIncidentStore } from "@/stores/useIncidentStore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface IncidentRow {
  id: string;
  time_logging: string;
  date_logging: string;
  url_image: string;
  url_video: string;
  cam_loc: string;
  description: string;
  cam_merk: string;
  name: string;
}

export const Incident: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [data, setData] = useState<IncidentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const { selectedDate, setSelectedDate, page, limit, setPage, setLimit } =
    useIncidentStore();

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/incident", {
        params: { page, limit, date_logging: formattedDate },
      });

      setData(res.data.data.rows);
      setTotal(Number(res.data.data.total));
      setSelectedItems(new Set()); // Reset selected items saat data berubah
      setSelectAll(false);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
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

  const toggleItem = (id: string) => {
    const updated = new Set(selectedItems);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedItems(updated);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedItems(new Set(allIds));
    }
    setSelectAll(!selectAll);
  };

  const handleExport = () => {
    const selectedData = data.filter((item) => selectedItems.has(item.id));
    const rows = selectedData.map((item) => ({
      Tanggal: item.date_logging,
      Waktu: item.time_logging,
      Nama: item.name,
      "Merk Kamera": item.cam_merk,
      "Lokasi Kamera": item.cam_loc,
      Deskripsi: item.description,
      Gambar: item.url_image,
      Video: item.url_video,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Log Insiden");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "log_insiden.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />

      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <Header
          isDark={theme === "dark"}
          user={user ? { name: user.name, role: String(user.role) } : null}
          logout={logout}
        />

        <main className="p-8">
          <div className="flex justify-between mb-8 items-center">
            <div className="flex items-center gap-2">
              <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
              <span>Pilih Semua</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg text-white">
                <Calendar className="h-5 w-5 mr-2" />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  className="bg-transparent focus:outline-none text-white"
                />
              </div>
              <Button className="bg-white text-black" onClick={fetchData}>
                Terapkan
              </Button>
              <Button
                onClick={handleExport}
                disabled={selectedItems.size === 0}
                className="bg-green-500 text-white"
              >
                Export ke Excel
              </Button>
            </div>
          </div>

          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <h1 className="text-xl font-medium mb-1">Log Insiden</h1>
            <p className="text-gray-400 mb-4">Jumlah Aktivitas Log Insiden</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="pl-20">#</th>
                    <th className="px-4">Gambar</th>
                    <th className="px-4">Tanggal</th>
                    <th className="px-4">Waktu</th>
                    <th className="px-4">Nama</th>
                    <th className="px-4">Merk Kamera</th>
                    <th className="px-4">Lokasi Kamera</th>
                    <th className="px-4">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    data.map((row, index) => (
                      <tr key={row.id} className="border-b border-gray-700">
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              onClick={() => setExpandedImage(row.url_image)}
                            >
                              <Image size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => setExpandedVideo(row.url_video)}
                            >
                              <Video size={16} />
                            </Button>
                            <Checkbox
                              checked={selectedItems.has(row.id)}
                              onCheckedChange={() => toggleItem(row.id)}
                              className="rounded-none"
                            />
                            <span className="ml-2">
                              {index + 1 + (page - 1) * limit}
                            </span>
                          </div>
                        </td>
                        <td>
                          <img
                            src={row.url_image}
                            alt="preview"
                            className="w-20 h-12 object-cover"
                          />
                        </td>
                        <td className="px-4">
                          {new Date(row.date_logging).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-4">
                          {new Date(row.time_logging).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4">{row.name}</td>
                        <td className="px-4">{row.cam_merk}</td>
                        <td className="px-4">{row.cam_loc}</td>
                        <td className="px-4">{row.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end items-center mt-4 text-sm">
              <div>
                Rows per page:
                <select
                  className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1"
                  value={limit}
                  onChange={(e) => {
                    setPage(1);
                    setLimit(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 100].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center ml-5">
                <span className="mr-4">
                  {Math.min((page - 1) * limit + 1, total)}-
                  {Math.min(page * limit, total)} of {total}
                </span>
                <div className="inline-flex">
                  <button
                    className="px-2 py-1"
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    disabled={page === 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M12.5 15L7.5 10L12.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="px-2 py-1"
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Gambar */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setExpandedImage(null)}
          >
            <X size={24} />
          </button>
          <img
            src={expandedImage}
            alt="Expanded"
            className="max-h-[80vh] rounded-lg"
          />
        </div>
      )}

      {/* Modal Video */}
      {expandedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setExpandedVideo(null)}
          >
            <X size={24} />
          </button>
          <video
            src={expandedVideo}
            controls
            autoPlay
            className="w-[90%] max-w-4xl rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
