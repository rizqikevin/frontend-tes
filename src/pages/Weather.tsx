import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Weather: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const location = "Kuala Tanjung";
    const dt = dayjs(startDate).format("YYYY-MM-DD");
    const end_dt = dayjs(endDate).format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${dt}&end_dt=${end_dt}`
      );

      const result = await response.json();

      const weatherData = result.forecast?.forecastday || [];

      const transformed = weatherData.flatMap((day: any) =>
        day.hour.map((hourData: any) => ({
          id: hourData.time_epoch,
          date: dayjs(hourData.time).format("DD/MM/YYYY"),
          jam: dayjs(hourData.time).format("HH:mm:ss"),
          lokasi: result.location.name,
          windDirection: hourData.wind_dir,
          windSpeed: `${hourData.wind_kph} kph`,
          temperature: hourData.temp_c,
          humadity: `${hourData.humidity}%`,
          atmospherePressure: `${hourData.pressure_mb} hPa`,
          rainfallHours: `${hourData.precip_mm} mm`,
        }))
      );

      // Set total & apply pagination
      setTotal(transformed.length);
      const paginated = transformed.slice((page - 1) * limit, page * limit);
      setTableData(paginated);
    } catch (err) {
      toast.error("Gagal fetch data cuaca:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, page, limit]);

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
    const interval = setInterval(checkTheme, 100);

    window.addEventListener(
      "sidebarStateChange",
      handleSidebarChange as EventListener
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarChange as EventListener
      );
    };
  }, []);

  const isDark = theme === "dark";
  const totalPages = Math.ceil(total / limit);

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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="rounded-lg border p-2 w-[350px] h-[230px] bg-[#082d72] items-center mb-4">
              <WeatherCard />
            </div>
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
              onClick={() => {
                setPage(1);
                fetchData();
              }}
              className="bg-white text-black rounded hover:bg-gray-200"
            >
              Search
            </Button>
          </div>

          {/* Weather Table */}
          <div className="bg-dashboard-accent rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Logs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Jam</th>
                    <th className="px-4 py-3">Lokasi</th>
                    <th className="px-4 py-3">Wind Dir</th>
                    <th className="px-4 py-3">Wind Speed</th>
                    <th className="px-4 py-3">Temp</th>
                    <th className="px-4 py-3">Humidity</th>
                    <th className="px-4 py-3">Pressure</th>
                    <th className="px-4 py-3">Rainfall</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-6">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    tableData.map((item, i) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-700 hover:bg-gray-800"
                      >
                        <td className="px-4 py-3">{i + 1}</td>
                        <td className="px-4 py-3">{item.date}</td>
                        <td className="px-4 py-3">{item.jam}</td>
                        <td className="px-4 py-3">{item.lokasi}</td>
                        <td className="px-4 py-3">{item.windDirection}</td>
                        <td className="px-4 py-3">{item.windSpeed}</td>
                        <td className="px-4 py-3">{item.temperature}</td>
                        <td className="px-4 py-3">{item.humadity}</td>
                        <td className="px-4 py-3">{item.atmospherePressure}</td>
                        <td className="px-4 py-3">{item.rainfallHours}</td>
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

export default Weather;
