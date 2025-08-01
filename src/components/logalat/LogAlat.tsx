// pages/LogAlat.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useLogAlatStore } from "@/stores/useLogAlatStore";
import DatePicker from "react-datepicker";
import { format, set } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
dayjs.extend(relativeTime);

const LogAlat: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const {
    logs,
    isLoading,
    fetchLogs,
    page,
    setPage,
    limit,
    setLimit,
    selectedAlat,
    selectedRuas,
    selectedStatus,
    setSelectedAlat,
    setSelectedRuas,
    setSelectedStatus,
  } = useLogAlatStore();

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
    fetchLogs();
  }, []);

  const handleSearch = () => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    fetchLogs({
      id_alat: selectedAlat,
      status: selectedStatus,
      start_time: start,
      end_time: end,
    });
  };

  const ruasOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.nama_gerbang)));
  }, [logs]);

  const alatOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.id_alat)));
  }, [logs]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.last_status)));
  }, [logs]);

  const filteredLog = useMemo(() => {
    return logs.filter(
      (item) =>
        (selectedRuas ? item.nama_gerbang === selectedRuas : true) &&
        (selectedAlat ? item.id_alat === selectedAlat : true) &&
        (selectedStatus ? item.last_status === selectedStatus : true)
    );
  }, [logs, selectedRuas, selectedAlat, selectedStatus]);

  // Paginated data
  const startIndex = (page - 1) * limit;
  const paginatedLogs = filteredLog.slice(startIndex, startIndex + limit);
  const totalItems = logs.length;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-0 mr-0" : "ml-0"
        } transition-all duration-300`}
      >
        <main className="p-0">
          {/* Filter */}
          <div className="flex flex-col lg:flex-row justify-end gap-4 flex-wrap mb-8">
            <div className="flex items-center space-x-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="flex-1 bg-dashboard-accent w-[200px]">
                  <SelectValue className="w-full" placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-accent border">
                  {statusOptions.length > 0 ? (
                    statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data" disabled>
                      Tidak ada data tersedia
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedRuas} onValueChange={setSelectedRuas}>
                <SelectTrigger className="flex-1 bg-dashboard-accent w-[200px]">
                  <SelectValue className="w-full" placeholder="Semua Ruas" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-accent border">
                  {ruasOptions.length > 0 ? (
                    ruasOptions.map((ruas) => (
                      <SelectItem key={ruas} value={ruas}>
                        {ruas}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data" disabled>
                      Tidak ada data tersedia
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedAlat} onValueChange={setSelectedAlat}>
                <SelectTrigger className="flex-1 bg-dashboard-accent w-[200px]">
                  <SelectValue
                    className="w-full text-white"
                    placeholder="Semua Alat"
                  />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-accent border">
                  {alatOptions.length > 0 ? (
                    alatOptions.map((alat) => (
                      <SelectItem key={alat} value={alat}>
                        {alat}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data" disabled>
                      Tidak ada data tersedia
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="border border-gray-700 rounded-lg px-4 py-2 bg-dashboard-accent flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="bg-transparent w-24 text-white outline-none"
                />
              </div>
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
              <div className="border border-gray-700 rounded-lg px-4 py-2 bg-dashboard-accent flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="bg-transparent w-24 text-white outline-none"
                />
              </div>
              <Button
                className="bg-white text-black hover:bg-gray-300"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Tabel Logs */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <h1 className="text-xl font-medium mb-4">Logs Alat</h1>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Jenis Alat</th>
                    <th className="px-4 py-3">Ruas</th>
                    <th className="px-4 py-3">Waktu</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Lama Error</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : paginatedLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paginatedLogs.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-800 transition"
                      >
                        <td className="px-5 py-5">{startIndex + index + 1}</td>
                        <td className="px-5 py-5">{item.id_alat}</td>
                        <td className="px-5 py-5">{item.nama_gerbang}</td>
                        <td className="px-5 py-5">
                          {format(new Date(item.insert_at), "dd/MM/yyyy HH:mm")}
                        </td>
                        <td className="px-5 py-5">
                          <span
                            className={`font-semibold ${
                              item.last_status === "off"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {item.last_status === "off"
                              ? "◉ Offline"
                              : "◉ Online"}
                          </span>
                        </td>
                        <td
                          className={` mt-5 px-2 py-5 w-[100px] max-h-4 inline-flex rounded-lg text-sm font-medium text-white items-center justify-center text-center ${
                            item.last_status === "off"
                              ? "bg-red-500"
                              : item.last_status === "on"
                              ? "bg-green-500"
                              : "bg-green-500"
                          }`}
                        >
                          {item.last_status === "off"
                            ? dayjs(item.insert_at).fromNow(true)
                            : item.last_status === "on"
                            ? "Normal"
                            : "Normal"}
                        </td>
                        <td className="px-5 py-5">
                          <Link to={`/${item.id_lokasi}`}>
                            <Button
                              variant="default"
                              className="bg-yellow-500 border-white text-white hover:bg-gray-700"
                            >
                              Detail
                            </Button>
                          </Link>
                        </td>
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
                  className="bg-transparent ml-2"
                  value={limit}
                  onChange={(e) => {
                    setPage(1);
                    setLimit(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 100, 200].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center ml-5">
                <span className="mr-4">
                  {totalItems === 0
                    ? `0`
                    : `${startIndex + 1}-${Math.min(
                        startIndex + paginatedLogs.length,
                        totalItems
                      )}`}{" "}
                  of {totalItems}
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
    </div>
  );
};

export default LogAlat;
