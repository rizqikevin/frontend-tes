import { useEffect, useState } from "react";
import api from "@/services/api";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";

interface SensorRow {
  voltage_r: string;
  voltage_s: string;
  voltage_t: string;
  current_r: string;
  current_s: string;
  current_t: string;
  power_r: string;
  power_s: string;
  power_t: string;
  va_r: string;
  va_s: string;
  va_t: string;
  frequency: string;
  created_at: string;
  consumption: string;
}

export const Daily: React.FC = () => {
  const [data, setData] = useState<SensorRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      // console.log(formattedDate);
      const res = await api.get(`/sensor/pdb`, {
        params: {
          page,
          limit,
          time: formattedDate,
          sensor_number: 2,
        },
      });
      setData(res.data.data.rows);
      setTotal(res.data.data.total);
    } catch (error) {
      console.error("Gagal mengambil data sensor PDB:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
        <div className="flex justify-between items-center px-0">
          <div>
            <h1 className="text-xl font-medium">Logs Daily PDB</h1>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg bg-transparent text-black">
              <Calendar className="h-5 w-5 mr-2 text-white" />
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                dateFormat="dd - MMMM - yyyy"
                className="bg-transparent focus:outline-none text-white "
              />
            </div>
            <Button
              className="bg-white text-black px-3 py-1 rounded text-sm"
              onClick={() => fetchData()}
            >
              Terapkan
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"></div>
        <div className="overflow-x-auto mt-5">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-dashboard-accent text-white">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Voltage R</th>
                <th className="p-3">Voltage S</th>
                <th className="p-3">Voltage T</th>
                <th className="p-3">Current R</th>
                <th className="p-3">Current S</th>
                <th className="p-3">Current T</th>
                <th className="p-3">Power R</th>
                <th className="p-3">Power S</th>
                <th className="p-3">Power T</th>
                <th className="p-3">VA R</th>
                <th className="p-3">VA S</th>
                <th className="p-3">VA T</th>
                <th className="p-3">Freq (Hz)</th>
                <th className="p-3">Consumption</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={14} className="p-4 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3">
                      {new Date(row.created_at).toLocaleTimeString()}
                    </td>
                    <td className="p-3">{row.voltage_r}</td>
                    <td className="p-3">{row.voltage_s}</td>
                    <td className="p-3">{row.voltage_t}</td>
                    <td className="p-3">{row.current_r}</td>
                    <td className="p-3">{row.current_s}</td>
                    <td className="p-3">{row.current_t}</td>
                    <td className="p-3">{row.power_r}</td>
                    <td className="p-3">{row.power_s}</td>
                    <td className="p-3">{row.power_t}</td>
                    <td className="p-3">{row.va_r}</td>
                    <td className="p-3">{row.va_s}</td>
                    <td className="p-3">{row.va_t}</td>
                    <td className="p-3">{row.frequency}</td>
                    <td className="p-3">{row.consumption}</td>
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
    </>
  );
};
