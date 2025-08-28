import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";
import api from "@/services/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import DatePicker from "react-datepicker";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface LogReportViolation {
  id: number;
  radio_id: string;
  area: string;
  updated_at: string;
  created_at: string;
  status: string;
  reason: string;
  vehicle_number: string;
  vehicle_name: string;
  duration_minutes: string;
  time_in: string;
  time_out: string;
}

const LogReportViolation: React.FC = () => {
  const { user, logout } = useAuth();
  const [allLogs, setAllLogs] = useState<LogReportViolation[]>([]); // All logs from API
  const [logs, setLogs] = useState<LogReportViolation[]>([]); // Paginated logs
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
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

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/violation/vehicle", {
        params: {
          start_date: startDate
            ? dayjs(startDate).format("YYYY-MM-DD")
            : undefined,
          end_date: endDate ? dayjs(endDate).format("YYYY-MM-DD") : undefined,
        },
      });
      setAllLogs(response.data.data);
      setTotal(response.data.data.length || 0);
      setPage(1); // Reset to first page
    } catch (error) {
      toast.error("Failed to fetch logs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]);

  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setLogs(allLogs.slice(startIndex, endIndex));
  }, [allLogs, page, limit]);

  const isDark = theme === "dark";

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        } transition-all duration-300`}
      >
        <Header
          isDark={isDark}
          user={user ? { name: user.name, role: String(user.role) } : null}
          logout={logout}
        />

        <main className="p-8">
          {/* Filter */}
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
                onClick={fetchLogs}
                className="bg-white text-black rounded hover:bg-gray-200"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <h1 className="text-xl font-medium mb-2">Violation Logs</h1>
            <p className="text-gray-300">Jumlah Aktifitas Violation Logs</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Plat Nomor</th>
                    <th className="px-4 py-3">Jenis Kendaraan</th>
                    <th className="px-4 py-3">Lokasi</th>
                    <th className="px-4 py-3">Area</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Keterangan</th>
                    <th className="px-4 py-3">Jam Keluar</th>
                    <th className="px-4 py-3">Jam Masuk</th>
                    <th className="px-4 py-3">Lama Keluar</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    logs.map((item, i) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-700 hover:bg-gray-800 transition"
                      >
                        <td className="px-5 py-3">
                          {(page - 1) * limit + i + 1}
                        </td>
                        <td className="px-5 py-3">
                          {dayjs(item.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-5 py-3">{item.vehicle_number}</td>
                        <td className="px-5 py-3">{item.vehicle_name}</td>
                        <td className="px-5 py-3">{item.area}</td>
                        <td className="px-5 py-3">{item.status}</td>
                        <td
                          className={` mt-5 px-2 py-5 w-[100px] max-h-4 inline-flex rounded-lg text-sm font-medium text-white items-center justify-center text-center ${
                            item.reason === null ? "bg-red-500" : "bg-green-500"
                          }`}
                        >
                          {item.reason === null ? "Tidak Valid" : "Valid"}
                        </td>
                        <td className="px-5 py-3">
                          {!item.reason ? "Belum Validasi" : item.reason}
                        </td>
                        {item.time_out !== null ? (
                          <td className="px-5 py-3">
                            {dayjs(item.time_out)
                              .tz("Asia/Jakarta")
                              .format("HH:mm:ss")}
                          </td>
                        ) : (
                          <td className="px-5 py-3">-</td>
                        )}

                        {item.time_in !== null ? (
                          <td className="px-5 py-3">
                            {dayjs(item.time_in)
                              .tz("Asia/Jakarta")
                              .format("HH:mm:ss")}
                          </td>
                        ) : (
                          <td className="px-5 py-3">-</td>
                        )}
                        {item.duration_minutes !== null ? (
                          <td className="px-5 py-3">
                            {item.duration_minutes} menit
                          </td>
                        ) : (
                          <td className="px-5 py-3">-</td>
                        )}

                        <td className="px-5 py-3">
                          <Button
                            className="bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={() => {
                              const doc = new jsPDF();
                              doc.text(
                                `Data Laporan Violation ${item.radio_id}`,
                                10,
                                10
                              );
                              doc.text(
                                `ID Kendaraan: ${item.radio_id}`,
                                10,
                                20
                              );
                              doc.text(
                                `Area Pelanggaran: ${item.area.slice(0, 20)}`,
                                10,
                                30
                              );
                              doc.text(
                                `Alasan Pelanggaran: ${
                                  item.reason || "Tidak ada alasan"
                                }`,
                                10,
                                40
                              );
                              doc.save(`cetak_${item.radio_id}.pdf`);
                            }}
                          >
                            Cetak
                          </Button>
                        </td>
                      </tr>
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
                    disabled={page === totalPages || totalPages === 0}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 5L12.5 10L7.5 15"
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

export default LogReportViolation;
