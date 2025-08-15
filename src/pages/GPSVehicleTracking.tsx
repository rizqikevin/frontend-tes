import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapViewGps from "@/components/MapViewGps";
import Header from "@/components/Header";
import { useGpsStore, useTrackGpsStore } from "@/stores/useGpsStore";
import DatePicker from "react-datepicker";
import { useMileageStore } from "@/stores/useMileageStore";
import { VehicleData } from "@/types";

export const GPSVehicleTracking: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { selectedVehicle, setSelectedVehicle, vehicles, fetchVehicles } =
    useGpsStore();
  const {
    trackData,
    mileage,
    fuel,
    allTrackData,
    fetchAllTrackData,
    fetchTrackData,
    isTrackLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    total,
  } = useTrackGpsStore();
  const { fetchMileage, data } = useMileageStore();

  // Pagination state for the vehicle list
  const [vehicleListPage, setVehicleListPage] = useState(1);
  const [vehicleListLimit, setVehicleListLimit] = useState(10);
  const [paginatedVehicles, setPaginatedVehicles] = useState<VehicleData[]>([]);

  useEffect(() => {
    fetchMileage();
  }, [startDate]);

  const totalVehiclePages = Math.ceil(vehicles.length / vehicleListLimit);

  useEffect(() => {
    const startIndex = (vehicleListPage - 1) * vehicleListLimit;
    const endIndex = startIndex + vehicleListLimit;
    setPaginatedVehicles(vehicles.slice(startIndex, endIndex));
  }, [vehicles, vehicleListPage, vehicleListLimit]);

  const mappedData = Object.values(data).map((item) => ({
    id: item.id,
    mileage: item.mileage,
    fuel: item.fuel,
  }));

  const totalPages = Math.ceil(total / limit);
  const trackCoordinates: [number, number][] = allTrackData.map((track) => [
    Number(track.lat),
    Number(track.lon),
  ]);

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(() => {
      fetchVehicles();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedVehicle]);

  useEffect(() => {
    if (selectedVehicle) {
      fetchAllTrackData(selectedVehicle.radio_id);
    }
  }, [selectedVehicle, page, limit, total, startDate, endDate, search]);

  useEffect(() => {
    if (selectedVehicle) {
      fetchTrackData(selectedVehicle.radio_id);
    }
  }, [selectedVehicle, page, limit, total, startDate, endDate, search]);

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

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
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

        <main className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[100vh]">
              <MapViewGps
                vehicles={vehicles}
                onVehicleClick={setSelectedVehicle}
                trackCoordinates={trackCoordinates}
              />
            </div>

            <div className="rounded-lg border p-4 bg-dashboard-accent max-h-[100vh] overflow-y-auto">
              {selectedVehicle ? (
                <div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="text-sm text-white mb-4"
                    >
                      ← Kembali
                    </button>
                    <h3 className="font-semibold text-lg mb-2">
                      {selectedVehicle.vehicle_name} -{" "}
                      {selectedVehicle.vehicle_number}
                    </h3>
                  </div>

                  <div className="flex justify-center items-center gap-8 text-white p-4 rounded">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Jarak Tempuh</div>
                      <div className="text-lg font-semibold">{mileage} Km</div>
                    </div>

                    <div className="h-8 w-px bg-gray-600"></div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Average Speed</div>
                      <div className="text-lg font-semibold">
                        {selectedVehicle.speed?.toFixed(2) ?? 0} Km/h
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-600"></div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Konsumsi BBM</div>
                      <div className="text-lg font-semibold">{fuel}L</div>
                    </div>
                  </div>

                  <div className="mb-2 flex gap-2 justify-around">
                    <div className="flex items-center space-x-4">
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
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        selectedVehicle &&
                        fetchTrackData(selectedVehicle.radio_id)
                      }
                      className="bg-white text-black py-5 rounded"
                    >
                      Find
                    </Button>
                  </div>

                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-dashboard-accent px-2 py-1 rounded border border-gray-600 mb-4"
                  />

                  <div className="grid grid-cols-5 text-xs text-gray-400 border-b pb-2 mb-2">
                    <span>Time</span>
                    <span>Speed</span>
                    <span>Device</span>
                    <span>Longitude</span>
                    <span>Latitude</span>
                  </div>

                  {isTrackLoading ? (
                    <div className="text-center text-sm text-gray-400 py-4">
                      Loading track data...
                    </div>
                  ) : trackData.length > 0 ? (
                    <>
                      {trackData.map((track, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-5 text-xs border-b border-gray-600 py-3"
                        >
                          <span>
                            {new Date(track.updated).toLocaleDateString(
                              "id-ID",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          <span>{track.speed.toFixed(2)} Km/h</span>
                          <span>{selectedVehicle?.radio_id}</span>
                          <span>{track.lat}</span>
                          <span>{track.lon}</span>
                        </div>
                      ))}
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
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
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
                                setPage(Math.min(page + 1, totalPages))
                              }
                              disabled={page === totalPages}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
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
                    </>
                  ) : (
                    <div className="text-xs text-gray-500 text-center py-4">
                      tidak ada data
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-4 text-lg">List Vehicle</h3>
                  <div className="grid grid-cols-6 text-xs font-semibold mb-2 border-b pb-2">
                    <span className="text-center">#</span>
                    <span className="text-center">Nama</span>
                    <span className="text-center">Plat</span>
                    <span className="text-center">Speed</span>
                    <span className="text-center">Last Update</span>
                    <span className="text-center">Action</span>
                  </div>
                  {paginatedVehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="grid grid-cols-6 text-xs border-b border-gray-600 py-2 cursor-pointer hover:bg-gray-800 items-center"
                    >
                      <img
                        src={`/icons/${vehicle.type}.png`}
                        alt={vehicle.vehicle_name}
                        className="text-center h-10 w-10 mx-auto"
                      />
                      <span className="text-center">
                        {vehicle.vehicle_name}
                      </span>
                      <span className="text-center">
                        {vehicle.vehicle_number}
                      </span>
                      <span className="text-center">
                        {vehicle.speed.toFixed(2)}
                      </span>
                      <span className="text-center">
                        {new Date(vehicle.updated).toLocaleDateString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicle(vehicle);
                          }}
                          className="text-white bg-blue-500 px-2 py-1 rounded-lg hover:underline"
                        >
                          Detail
                        </button>
                      </span>
                    </div>
                  ))}
                  {/* Pagination for Vehicle List */}
                  <div className="flex justify-end items-center mt-4 text-sm">
                    <div>
                      Rows per page:
                      <select
                        className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1"
                        value={vehicleListLimit}
                        onChange={(e) => {
                          setVehicleListPage(1);
                          setVehicleListLimit(Number(e.target.value));
                        }}
                      >
                        {[10, 20, 50].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center ml-5">
                      <span className="mr-4">
                        {Math.min(
                          (vehicleListPage - 1) * vehicleListLimit + 1,
                          vehicles.length
                        )}
                        -
                        {Math.min(
                          vehicleListPage * vehicleListLimit,
                          vehicles.length
                        )}{" "}
                        of {vehicles.length}
                      </span>
                      <div className="inline-flex">
                        <button
                          className="px-2 py-1"
                          onClick={() =>
                            setVehicleListPage(Math.max(vehicleListPage - 1, 1))
                          }
                          disabled={vehicleListPage === 1}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
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
                            setVehicleListPage(
                              Math.min(vehicleListPage + 1, totalVehiclePages)
                            )
                          }
                          disabled={
                            vehicleListPage === totalVehiclePages ||
                            totalVehiclePages === 0
                          }
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="transform rotate-180"
                          >
                            <path
                              d="M12.5 15L7.5 10L12.5 5"
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GPSVehicleTracking;
