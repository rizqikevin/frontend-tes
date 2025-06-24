import api from "@/services/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";

interface FloodsData {
  sensor_name: string;
  sensor_number: number;
  sensor_value: string;
  date: string;
}

interface DailyProps {
  location: string;
  searchTrigger: number;
}

export const Daily: React.FC<DailyProps> = ({ location, searchTrigger }) => {
  const [data, setData] = useState<FloodsData[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await api.get("/sensor/flood", {
        params: {
          page,
          limit,
          sensor_number: 1,
          location: location || undefined,
        },
      });
      setData(response.data.data.rows);
      setTotal(response.data.data.total);
    } catch (error) {
      toast.error("Gagal memuat data sensor");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, searchTrigger]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
      <div className="flex justify-between items-center px-0">
        <div>
          <h1 className="text-xl font-medium">Logs Daily Floods</h1>
          <p className="text-gray-400">Riwayat Pemakaian</p>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-dashboard-accent text-white">
            <tr>
              <th className="p-5">#</th>
              <th className="p-5">Time</th>
              <th className="p-5">Sensor Name</th>
              <th className="p-5">Sensor Number</th>
              <th className="p-5">Sensor Value</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-5">{(page - 1) * limit + index + 1}</td>
                  <td className="p-5">
                    {dayjs(row.date).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="p-5">{row.sensor_name}</td>
                  <td className="p-5 text-">{row.sensor_number}</td>
                  <td className="p-5">{row.sensor_value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-5 text-center" colSpan={5}>
                  Tidak ada data.
                </td>
              </tr>
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
  );
};
