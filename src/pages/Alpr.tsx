import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import api from "@/services/api";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

interface AlprData {
  jentrn: string;
  srlnum: string;
  resi: string;
  gerbang: string;
  gardu: string;
  gol: string;
  waktu: string;
  tgl: string;
  id_kartu: string;
  plat_number: string;
  status: string;
  pict_url: string;
  gerbang_masuk: string;
}

const Vlop: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [data, setData] = useState<AlprData[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Listen for theme changes and sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    // Initial theme check
    checkTheme();

    // Listen for theme changes
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/alpr", {
        params: { limit, page },
      });
      const filtered = response.data.data
        .filter((log: AlprData) => {
          const created = dayjs(log.tgl);
          return (
            created.isAfter(
              dayjs(startDate).startOf("day").subtract(1, "second")
            ) && created.isBefore(dayjs(endDate).endOf("day").add(1, "second"))
          );
        })
        .sort((a: AlprData, b: AlprData) =>
          dayjs(a.tgl).isAfter(dayjs(b.tgl)) ? 1 : -1
        );
      setData(filtered);
      setTotal(response.data.total);
    } catch (error) {
      toast.error("Gagal memuat data alpr");
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
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

        <main className="p-8">
          {/* Date filters */}
          <div className="flex justify-between mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <Button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                  Report
                </Button>
                <Button
                  className="bg-transparent border-white rounded-lg px-4 py-2 text-white hover:bg-gray-700 ml-2"
                  variant="outline"
                >
                  Camera
                </Button>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className="bg-dashboard-accent border border-white flex rounded px-0 py-2 text-white">
                <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent outline-none text-white"
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
                  className="bg-transparent outline-none text-white"
                />
              </div>
              <Button
                onClick={fetchData}
                className="bg-white text-black rounded hover:bg-gray-200"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-xl font-medium">Logs ALPR</h1>
                <p className="text-gray-400">Jumlah Aktifitas ALPR</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-dashboard-accent text-white">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Tanggal</th>
                    <th className="p-2">Waktu</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Gerbang</th>
                    <th className="p-2">Gardu</th>
                    <th className="p-2">Transaksi</th>
                    <th className="p-2">Golongan</th>
                    <th className="p-2">Resi</th>
                    <th className="p-2">Nomor Plat</th>
                    <th className="p-2">UID</th>
                    <th className="p-2">Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={13} className="p-2 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <React.Fragment key={item.resi}>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">
                            {String((page - 1) * limit + index + 1).padStart(
                              2,
                              "0"
                            )}
                          </td>
                          <td className="p-2">
                            <img
                              src={item.pict_url
                                .replace("(", "")
                                .replace(")", "")}
                              alt="snapshot"
                              className="w-20 h-12 object-cover cursor-pointer"
                              onClick={() =>
                                setExpandedImage((prev) =>
                                  prev === item.pict_url ? null : item.pict_url
                                )
                              }
                            />
                          </td>
                          <td className="p-2">
                            {dayjs(item.tgl).format("DD/MM/YYYY")}
                          </td>
                          <td className="p-2">
                            {dayjs(item.waktu).format("HH:mm:ss A")}
                          </td>
                          <td className="p-2">
                            {item.status === "1" ? "Open" : "Close"}
                          </td>
                          <td className="p-2">{item.gerbang}</td>
                          <td className="p-2">{item.gardu}</td>
                          <td className="p-2">{item.jentrn}</td>
                          <td className="p-2">{`Gol-${item.gol}`}</td>
                          <td className="p-2">{item.resi}</td>
                          <td className="p-2">{item.plat_number}</td>
                          <td className="p-2">{item.id_kartu}</td>
                          <td className="p-2">{item.gerbang_masuk}</td>
                        </tr>
                        {expandedImage === item.pict_url && (
                          <tr className="bg-black/30">
                            <td colSpan={13} className="p-0">
                              <img
                                src={item.pict_url
                                  .replace("(", "")
                                  .replace(")", "")}
                                alt="expanded"
                                className="w-full max-h-[500px]  object-contain rounded-lg"
                                onClick={() => setExpandedImage(null)}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="100">100</option>
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
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
    </div>
  );
};

export default Vlop;
