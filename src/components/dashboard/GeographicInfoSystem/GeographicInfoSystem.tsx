import React, { useEffect, useState } from "react";
import StatsGrid from "./StatsGrid";
import MapSection from "./MapSection";
import ErrorLog from "./ErrorLog";
import { ErrorItem } from "./ErrorLog";
import { useTransactionStore } from "@/stores/useTransactionCardStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useHeartbeatStore } from "@/stores/useHeartbeatStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const GeographicInfoSystem: React.FC = () => {
  const { transactionData, fetchTransactionData, isDataLoading } =
    useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();
  const { cordinat, fetchHeartbeat } = useHeartbeatStore();

  useEffect(() => {
    fetchTransactionData();
    fetchHeartbeat();
  }, [start_date, end_date]);

  // console.log(heartbeatData);

  const errorLogData: ErrorItem[] = cordinat.map((item) => ({
    jenisAlat: item.id_alat,
    ruas: item.nama_gerbang,
    namaGerbang: item.nama_gerbang,
    gardu: item.gardu,
    waktu: dayjs(item.insert_at).format("DD/MM/YYYY, HH:mm:ss") + " WIB",
    lamaError:
      item.last_status === "off"
        ? dayjs(item.insert_at)
            .tz("Asia/Jakarta")
            .fromNow(true)
            .replace(" days", " hari")
        : "Normal",
    status:
      item.last_status === "off"
        ? "error"
        : item.last_status === "on"
        ? "success"
        : "warning",
  }));

  return (
    <div className="space-y-4">
      <StatsGrid statsData={transactionData} isLoading={isDataLoading} />

      <div className="grid grid-row-2 lg:grid-cols-3 gap-6">
        <MapSection />
        <div className="h-full w-full bg-dashboard-accent rounded-lg p-4 overflow-y-auto">
          <ErrorLog errorLogData={errorLogData} />
        </div>
      </div>
    </div>
  );
};

export default GeographicInfoSystem;
