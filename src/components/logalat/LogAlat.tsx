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
import { useLogAlatStore } from "@/stores/useLogAlatStore";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

interface logAlat {
  id_lokasi: number;
  id_alat: string;
  latitude: string;
  longitude: string;
  status: string;
  insert_at: string;
}

export const LogAlat: React.FC = () => {
  const [data, setData] = useState<logAlat[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { gateId } = useParams<{ gateId: string }>();
  const [endDate, setEndDate] = useState<Date>(new Date());
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

  // useEffect(() => {
  //   if (gateId) {
  //     fetchLogs({ gate: gateId });
  //   }
  // }, [gateId]);

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

  const ruasOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.nama_gerbang)));
  }, [logs]);

  const alatOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.id_alat)));
  }, [logs]);

  return (
    <div className="py-8">
      <div className="flex justify-end mb-8">
        <div className="flex justify-center items-center space-x-4">
          <Select value={selectedRuas} onValueChange={setSelectedRuas}>
            <SelectTrigger className="flex-1 bg-dashboard-accent w-[200px] border border-white py-2">
              <SelectValue className="w-full" placeholder="Gardu" />
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
            <SelectTrigger className="flex-1 bg-dashboard-accent w-[200px] border border-white py-2">
              <SelectValue className="w-full text-white" placeholder="Alat" />
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
          <Select value={selectedRuas} onValueChange={setSelectedRuas}>
            <SelectTrigger className="flex-1 py-2 border border-white bg-dashboard-accent w-[150px]">
              <SelectValue className="w-full" placeholder="Lokasi" />
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
            onClick={() => fetchLogs()}
            className="bg-white text-black rounded hover:bg-gray-200"
          >
            Search
          </Button>
        </div>
      </div>
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
                    <td className="px-5 py-5">
                      {format(new Date(item.insert_at), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-5 py-5">{item.id_alat}</td>
                    <td className="px-5 py-5">
                      {item.latitude} - {item.longitude}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`font-semibold ${
                          item.last_status === "off"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {item.last_status === "off" ? "◉ Offline" : "◉ Online"}
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
    </div>
  );
};
