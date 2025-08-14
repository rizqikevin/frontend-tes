import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useOdolStore } from "@/stores/useOdolStore";
import api from "@/services/api";

const Odol: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [gateOptions, setGateOptions] = useState<Gate[]>([]);

  type Gate = {
    id_gerbang: string;
    nama_gerbang: string;
  };

  const {
    data,
    total,
    loading,
    page,
    limit,
    startDate,
    endDate,
    setPage,
    setLimit,
    setStartDate,
    setEndDate,
    fetchData,
    gateId,
    setGateId,
  } = useOdolStore();

  // console.log(data);

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

  useEffect(() => {
    const fetchGerbang = async () => {
      try {
        const res = await api.get("/transaction/gerbang");
        const filtered = res.data.filter(
          (item: any) => item.id_cabang === "48"
        );
        setGateOptions(filtered);
      } catch (err) {
        console.error("Gagal fetch gerbang:", err);
      }
    };

    fetchGerbang();
  }, [gateId, startDate, endDate, page, limit]);

  useEffect(() => {
    fetchData();
  }, [gateId, startDate, endDate, page, limit]);

  const isDark = theme === "dark";

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        } transition-all duration-300`}
      >
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
                {/* <Button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                  Report
                </Button>
                <Button
                  className="bg-transparent border-white rounded-lg px-4 py-2 text-white hover:bg-gray-700 ml-2"
                  variant="outline"
                >
                  Camera
                </Button> */}
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className="bg-dashboard-accent border border-white flex rounded text-white">
                <select
                  onChange={(e) => setGateId(e.target.value)}
                  className="text-white bg-dashboard-accent p-3 rounded-lg outline-none"
                >
                  <option value="">Semua Gerbang</option>
                  {gateOptions.map((g) => (
                    <option key={g.id_gerbang} value={g.id_gerbang}>
                      {g.nama_gerbang}
                    </option>
                  ))}
                </select>
              </div>

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
                <h1 className="text-xl font-semibold">Riwayat ODOL</h1>
                <p className="text-gray-400">Jumlah Aktifitas ODOL</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-dashboard-accent text-white">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Gerbang</th>
                    <th className="p-2">Gardu</th>
                    <th className="p-2">Resi</th>
                    <th className="p-2">Nomor Plat</th>
                    <th className="p-2">Tanggal Transaksi</th>
                    <th className="p-2">Waktu Transaksi</th>
                    <th className="p-2">Nomor Kartu</th>
                    <th className="p-2">Golongan</th>
                    <th className="p-2">Data Overload</th>
                    <th className="p-2">Dimention (Lebar x Tinggi)</th>
                    <th className="p-2">Status</th>

                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={13} className="p-2 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={13}
                        className="p-4 text-center text-gray-400"
                      >
                        Data tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">
                            {String((page - 1) * limit + index + 1).padStart(
                              2,
                              "0"
                            )}
                          </td>
                          <td className="p-2">
                            <img
                              src={item.url1.replace("(", "").replace(")", "")}
                              alt="snapshot"
                              className="w-20 h-12 object-cover cursor-pointer"
                              onClick={() =>
                                setExpandedImage((prev) =>
                                  prev === item.url1 ? null : item.url1
                                )
                              }
                            />
                          </td>
                          <td className="p-2">{item.gerbang}</td>
                          <td className="p-2">{item.gardu}</td>
                          <td className="p-2">{item.noresi}</td>
                          <td className="p-2">{item.platnomor}</td>
                          <td className="p-2">
                            {dayjs(item.tanggal).format("DD/MM/YYYY")}
                          </td>
                          <td className="p-2">{item.jam}</td>
                          <td className="p-2">{item.kartu}</td>
                          <td className="p-2">{`Gol-${item.golongan}`}</td>

                          <td className="p-2">{item.berat}</td>

                          <td className="relative p-2 left-7">
                            {item.dimensi.split(" x ").slice(1).join(" x ")}
                          </td>
                          <td
                            className={` mt-3 px-2 py-5 w-[100px] max-h-4 inline-flex rounded-lg text-sm font-medium text-white items-center justify-center text-center ${
                              item.status === "PATUH"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {item.status}
                          </td>
                          <td className="p-2">
                            <Link
                              to={`/detail-odol/${item.id}?date=${dayjs(
                                item.tanggal
                              ).format("YYYY-MM-DD")}`}
                            >
                              <Button
                                variant="default"
                                className="bg-yellow-500 border-white text-white hover:bg-gray-700"
                              >
                                Detail
                              </Button>
                            </Link>
                          </td>
                        </tr>
                        {expandedImage === item.url1 && (
                          <tr className="bg-black/30">
                            <td colSpan={13} className="p-0">
                              <img
                                src={item.url1
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

export default Odol;
