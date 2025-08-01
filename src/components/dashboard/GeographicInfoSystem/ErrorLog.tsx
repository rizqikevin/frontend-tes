import React, { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useHeartbeatStore } from "@/stores/useHeartbeatStore";

export interface ErrorItem {
  jenisAlat: string;
  ruas: string;
  waktu: string;
  lamaError: string;
  status: "error" | "warning" | "success";
}

const ErrorLog = ({ errorLogData }: { errorLogData: ErrorItem[] }) => {
  const {
    selectedAlat,
    selectedRuas,
    setSelectedAlat,
    setSelectedRuas,
    selectedStatus,
    setSelectedStatus,
    loading,
  } = useHeartbeatStore();

  const ruasOptions = useMemo(() => {
    return Array.from(new Set(errorLogData.map((item) => item.ruas)));
  }, [errorLogData]);

  const alatOptions = useMemo(() => {
    return Array.from(new Set(errorLogData.map((item) => item.jenisAlat)));
  }, [errorLogData]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(errorLogData.map((item) => item.status)));
  }, [errorLogData]);

  const filteredLog = useMemo(() => {
    return errorLogData.filter(
      (item) =>
        (selectedRuas ? item.ruas === selectedRuas : true) &&
        (selectedAlat ? item.jenisAlat === selectedAlat : true) &&
        (selectedStatus ? item.status === selectedStatus : true)
    );
  }, [errorLogData, selectedRuas, selectedAlat, selectedStatus]);

  return (
    <div className="rounded-lg p-4 bg-dashboard-accent h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Log error alat</h3>
      </div>

      <div className="flex gap-4 mb-4">
        <Select value={selectedRuas} onValueChange={setSelectedRuas}>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Ruas" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent border">
            {ruasOptions.map((ruas) => (
              <SelectItem key={ruas} value={ruas}>
                {ruas}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAlat} onValueChange={setSelectedAlat}>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Alat" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent border">
            {alatOptions.map((alat) => (
              <SelectItem key={alat} value={alat}>
                {alat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-accent border">
            {statusOptions.map((alat) => (
              <SelectItem key={alat} value={alat}>
                {alat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center text-sm text-gray-400">Memuat data...</div>
      ) : filteredLog.length === 0 ? (
        <div className="text-center text-sm text-gray-400">
          Tidak ada data yang tersedia.
        </div>
      ) : (
        filteredLog.map((item, index) => (
          <div
            key={`${item.jenisAlat}-${item.ruas}-${item.waktu}-${index}`}
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
        ))
      )}
    </div>
  );
};

export default ErrorLog;
