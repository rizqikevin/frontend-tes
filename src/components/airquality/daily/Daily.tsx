import { useEffect } from "react";
import { useAqiStore } from "@/stores/useAqiStore";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

export const Daily: React.FC = () => {
  const {
    data,
    fetchAQI,
    loading,
    total,
    page,
    limit,
    time,
    sensor_number,
    setPage,
    setLimit,
    setTime,
  } = useAqiStore();

  useEffect(() => {
    fetchAQI();
  }, [page, limit, sensor_number]);

  const formattedDate = time.toISOString().split("T")[0];
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="p-1">
      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto">
        <div className="flex justify-between items-center px-0">
          <div>
            <h1 className="text-xl font-medium">AirQuality Daily</h1>
            <p className="text-gray-400">Riwayat Pemakaian</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg text-white">
              <Calendar className="h-5 w-5 mr-2" />
              <DatePicker
                selected={time}
                onChange={(date: Date) => setTime(date)}
                className="bg-transparent w-24 focus:outline-none text-white"
              />
            </div>
            <Button
              className="bg-white text-black"
              onClick={() => {
                fetchAQI();
              }}
            >
              Terapkan
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-dashboard-accent text-white">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">Time</th>
                <th className="p-5">Name</th>
                <th className="p-5">Sensor Number</th>
                <th className="p-5">CO</th>
                <th className="p-5">O3</th>
                <th className="p-5">SO2</th>
                <th className="p-5">NO2</th>
                <th className="p-5">CO2</th>
                <th className="p-5">O2</th>
                <th className="p-5">PM2.5</th>
                <th className="p-5">PM10</th>
                <th className="p-5">TSP</th>
                <th className="p-5">Temp</th>
                <th className="p-5">Humidity</th>
                <th className="p-5">Ispu</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={15} className="text-center p-5 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={15} className="text-center p-5 text-gray-500">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-5">
                      {String(index + 1 + (page - 1) * limit).padStart(2, "0")}
                    </td>
                    <td className="p-5">
                      {new Date(row.created_at)
                        .toLocaleTimeString("id-ID")
                        .slice(0, 5)}
                    </td>
                    <td className="p-5">{row.sensor_name}</td>
                    <td className="p-5">{row.sensor_number}</td>
                    <td className="p-5">{row.co}</td>
                    <td className="p-5">{row.o3}</td>
                    <td className="p-5">{row.so2}</td>
                    <td className="p-5">{row.no2}</td>
                    <td className="p-5">{row.co2}</td>
                    <td className="p-5">{row.o2}</td>
                    <td className="p-5">{row.pm25}</td>
                    <td className="p-5">{row.pm10}</td>
                    <td className="p-5">{row.tsp}</td>
                    <td className="p-5">{row.suhu}</td>
                    <td className="p-5">{row.humidity}</td>
                    <td className="p-5">{row.ispu}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 text-sm">
            <div>
              Rows per page:
              <select
                className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex items-center ml-5">
              <span className="mr-4">
                {Math.min((page - 1) * limit + 1, total)} -{" "}
                {Math.min(page * limit, total)} of {total}
              </span>
              <div className="inline-flex">
                <button
                  className="px-2 py-1"
                  onClick={() => setPage(Math.max(page - 1, 1))}
                  disabled={page === 1}
                >
                  &lt;
                </button>
                <button
                  className="px-2 py-1"
                  onClick={() => setPage(Math.min(page + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
