import React, { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface ErrorItem {
  jenisAlat: string;
  ruas: string;
  waktu: string;
  lamaError: string;
  status: "error" | "warning" | "success";
}

const ErrorLog = ({ errorLogData }: { errorLogData: ErrorItem[] }) => {
  const [selectedRuas, setSelectedRuas] = useState<string>("");
  const [selectedAlat, setSelectedAlat] = useState<string>("");

  const ruasOptions = useMemo(() => {
    const set = new Set(errorLogData.map((item) => item.ruas));
    return Array.from(set);
  }, [errorLogData]);

  const alatOptions = useMemo(() => {
    const set = new Set(errorLogData.map((item) => item.jenisAlat));
    return Array.from(set);
  }, [errorLogData]);

  const filteredData = useMemo(() => {
    return errorLogData.filter((item) => {
      const matchRuas = selectedRuas ? item.ruas === selectedRuas : true;
      const matchAlat = selectedAlat ? item.jenisAlat === selectedAlat : true;
      return matchRuas && matchAlat;
    });
  }, [errorLogData, selectedRuas, selectedAlat]);

  return (
    <div className="rounded-lg p-4 bg-dashboard-accent h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Log error alat</h3>
      </div>

      <div className="flex gap-4 mb-4">
        <Select onValueChange={setSelectedRuas}>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Ruas Jalan" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent border">
            {ruasOptions.map((ruas) => (
              <SelectItem key={ruas} value={ruas}>
                {ruas}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedAlat}>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Jenis Alat" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent border">
            {alatOptions.map((alat) => (
              <SelectItem key={alat} value={alat}>
                {alat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr className="my-3 border-gray-400" />

      <div className="space-y-2 overflow-y-auto max-h-[270px]">
        <div className="grid grid-cols-4 gap-2 text-xs font-medium p-2 rounded">
          <span>Jenis Alat</span>
          <span>Ruas</span>
          <span>Waktu</span>
          <span>Lama Error</span>
        </div>

        {filteredData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 text-xs p-2 rounded border"
          >
            <span>{item.jenisAlat}</span>
            <span>{item.ruas}</span>
            <span>{item.waktu}</span>
            <span
              className={`inline-flex px-2 py-1 rounded text-xs text-white ${
                item.status === "error"
                  ? "bg-red-500"
                  : item.status === "warning"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
            >
              {item.lamaError}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorLog;
