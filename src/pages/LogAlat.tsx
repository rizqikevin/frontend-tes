// pages/LogAlat.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useLogAlatStore } from "@/stores/useLogAlatStore";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const LogAlat: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const { logs, isLoading, fetchLogs, page, setPage, limit, setLimit } =
    useLogAlatStore();

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

  const handleSearch = () => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    fetchLogs(start, end);
  };

  // Paginated data
  const startIndex = (page - 1) * limit;
  const paginatedLogs = logs.slice(startIndex, startIndex + limit);
  const totalItems = logs.length;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <Header
          isDark={theme === "dark"}
          user={user ? { name: user.name, role: String(user.role) } : null}
          logout={logout}
        />
        <main className="p-8">
          {/* Filter */}
          <div className="flex flex-col lg:flex-row justify-end gap-4 flex-wrap mb-8">
            <div className="flex items-center space-x-4">
              <div className="border border-gray-700 rounded-lg px-4 py-2 bg-dashboard-accent flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="bg-transparent text-white outline-none"
                />
              </div>
              <div className="text-white px-2">to</div>
              <div className="border border-gray-700 rounded-lg px-4 py-2 bg-dashboard-accent flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="bg-transparent text-white outline-none"
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
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Nama Alat</th>
                    <th className="px-4 py-3">Kordinat</th>
                    <th className="px-4 py-3">Detail</th>
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
                      <td colSpan={5} className="text-center py-4">
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
                        <td className="px-5 py-5">
                          {format(new Date(item.insert_at), "dd/MM/yyyy HH:mm")}
                        </td>
                        <td className="px-5 py-5">{item.id_alat}</td>
                        <td className="px-5 py-5">
                          {item.latitude}, {item.longitude}
                        </td>
                        <td className="px-5 py-5">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              item.status === "off"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {item.status.toUpperCase()}
                          </span>
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
