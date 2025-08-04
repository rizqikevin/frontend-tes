import api from "@/services/api";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

interface LogAlatItem {
  id_lokasi: number;
  id_alat: string;
  latitude: string;
  longitude: string;
  status: string;
  insert_at: string;
}

const LogAlat: React.FC = () => {
  const [data, setData] = useState<LogAlatItem[]>([]);
  const [alatOptions, setAlatOptions] = useState<string[]>([]);
  const [selectedAlat, setSelectedAlat] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { id_lokasi } = useParams<{ id_lokasi: string }>();

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/heartbeat/log", {
        params: {
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString(),
          id_lokasi,
          status: selectedStatus !== "all" ? selectedStatus : undefined,
          id_alat: selectedAlat !== "all" ? selectedAlat : undefined,
          page,
          limit,
        },
      });

      const rows = response.data.data.row || [];
      const pagination = response.data.data.pagination;

      setData(rows);
      setTotalPages(pagination?.totalPages || 1);
      setTotalItems(pagination?.total || 0);

      const alatSet = new Set<string>(rows.map((item) => item.id_alat));
      setAlatOptions(Array.from(alatSet));
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate, selectedAlat, selectedStatus, page, limit]);

  return (
    <div className="p-0">
      <div className="flex justify-end mb-6 flex-wrap gap-4">
        {/* Filter Alat */}
        <Select value={selectedAlat} onValueChange={setSelectedAlat}>
          <SelectTrigger className="w-[180px] bg-dashboard-accent border text-white">
            <SelectValue placeholder="Pilih Alat" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent text-white">
            <SelectItem value="all">Semua Alat</SelectItem>
            {alatOptions.map((alat) => (
              <SelectItem key={alat} value={alat}>
                {alat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Status */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px] bg-dashboard-accent border text-white">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent text-white">
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="on">Online</SelectItem>
            <SelectItem value="off">Offline</SelectItem>
          </SelectContent>
        </Select>

        {/* Tanggal Mulai */}
        <div className="flex items-center bg-dashboard-accent border text-white px-2 py-1 rounded">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="bg-transparent w-24 outline-none"
          />
        </div>

        <div className="flex items-center text-white">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Tanggal Akhir */}
        <div className="flex items-center bg-dashboard-accent border text-white px-2 py-1 rounded">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="bg-transparent w-24 outline-none"
          />
        </div>

        {/* Tombol Search */}
        <Button
          onClick={() => {
            setPage(1);
            fetchLogs();
          }}
          className="bg-white text-black rounded hover:bg-gray-200"
        >
          Search
        </Button>
      </div>

      {/* Tabel Log */}
      <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
        <h1 className="text-xl font-medium mb-4">Logs Alat</h1>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-left text-sm text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Nama Alat</th>
                <th className="px-4 py-3">Koordinat</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      {format(new Date(item.insert_at), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-4 py-3">{item.id_alat}</td>
                    <td className="px-4 py-3">
                      {item.latitude} - {item.longitude}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          item.status === "off"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {item.status === "off" ? "◉ Offline" : "◉ Online"}
                      </span>
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
            <Select
              value={String(limit)}
              onValueChange={(val) => {
                setPage(1);
                setLimit(Number(val));
              }}
            >
              <SelectTrigger className="bg-transparent ml-2 text-white w-[100px] border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-accent text-white">
                {[5, 10, 20, 50].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center ml-5">
            <span className="mr-4">
              {data.length === 0
                ? `0`
                : `${(page - 1) * limit + 1}-${
                    (page - 1) * limit + data.length
                  }`}{" "}
              of {totalItems}
            </span>
            <div className="inline-flex">
              <button
                className="px-2 py-1"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                &lt;
              </button>
              <button
                className="px-2 py-1"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAlat;
