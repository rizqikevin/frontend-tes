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

interface VoipLog {
  linkedid: string;
  timedialbegin: string;
  timebridgeenter: string;
  timehangup: string;
  calleridname: string;
  calleridnum: string;
  destcalleridname: string;
  destcalleridnum: string;
  dialstatus: string;
  created_at: string;
}

const Vlop: React.FC = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState<VoipLog[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
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

  const fetchData = async () => {
    try {
      const response = await api.get("/voip/all", {
        params: { limit, page },
      });
      const filtered = response.data.data
        .filter((log: VoipLog) => {
          const created = dayjs(log.created_at);
          return (
            created.isAfter(
              dayjs(startDate).startOf("day").subtract(1, "second")
            ) && created.isBefore(dayjs(endDate).endOf("day").add(1, "second"))
          );
        })
        .sort((a: VoipLog, b: VoipLog) =>
          dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? 1 : -1
        );

      setData(filtered);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch VOIP logs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, startDate, endDate]);

  const isDark = theme === "dark";

  const getDuration = (start: string, end: string) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const duration = endTime.diff(startTime, "second");
    const mins = Math.floor(duration / 60)
      .toString()
      .padStart(2, "0");
    const secs = (duration % 60).toString().padStart(2, "0");
    return `00:${mins}:${secs}`;
  };

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
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

          {/* Table */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <h1 className="text-xl font-medium mb-2">Call Logs</h1>
            <p className="text-gray-300">Jumlah Aktifitas Log Vlop</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Nama Penelepon</th>
                    <th className="px-4 py-3">Nomor Penelepon</th>
                    <th className="px-4 py-3">Nama Penerima</th>
                    <th className="px-4 py-3">Nomor Penerima</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Dial</th>
                    <th className="px-4 py-3">Bridge</th>
                    <th className="px-4 py-3">Hangup</th>
                    <th className="px-4 py-3">Durasi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr
                      key={item.linkedid}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-5 py-3">
                        {(page - 1) * limit + i + 1}
                      </td>
                      <td className="px-5 py-3">
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-5 py-3">{item.calleridname}</td>
                      <td className="px-5 py-3">{item.calleridnum}</td>
                      <td className="px-5 py-3">{item.destcalleridname}</td>
                      <td className="px-5 py-3">{item.destcalleridnum}</td>
                      <td className="px-5 py-3">{item.dialstatus}</td>
                      <td className="px-5 py-3">
                        {dayjs(item.timedialbegin).format("HH:mm:ss")}
                      </td>
                      <td className="px-5 py-3">
                        {dayjs(item.timebridgeenter).format("HH:mm:ss")}
                      </td>
                      <td className="px-5 py-3">
                        {dayjs(item.timehangup).format("HH:mm:ss")}
                      </td>
                      <td className="px-3 py-2">
                        {getDuration(item.timedialbegin, item.timehangup)}
                      </td>
                    </tr>
                  ))}
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
                    onClick={() => setPage((prev) => Math.min(prev + 1, total))}
                    disabled={page === total}
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
