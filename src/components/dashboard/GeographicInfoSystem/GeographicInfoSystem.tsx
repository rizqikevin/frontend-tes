import React, { useEffect, useState } from "react";
import StatsGrid from "./StatsGrid";
import Filters from "./Filters";
import MapSection from "../Admin/MapSection";
import ErrorLog from "./ErrorLog";
import { ErrorItem } from "./ErrorLog";
import { useTransactionStore } from "@/stores/useTransactionCardStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
const GeographicInfoSystem: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const { transactionData, fetchTransactionData, isDataLoading } =
    useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchTransactionData();
  }, [start_date, end_date]);

  const errorLogData: ErrorItem[] = [
    {
      jenisAlat: "CCTV",
      ruas: "Kuala Tanjung",
      waktu: "30/04/2025, 11:12:35 WIB",
      lamaError: "2 Hari 2 Jam",
      status: "error",
    },
    {
      jenisAlat: "VMS",
      ruas: "Kuala Tanjung",
      waktu: "01/05/2025, 13:12:35 WIB",
      lamaError: "1 Hari 2 Jam",
      status: "warning",
    },
    {
      jenisAlat: "Toll Gate",
      ruas: "Gerbang Sinaksak",
      waktu: "02/05/2025, 13:12:35 WIB",
      lamaError: "1 Jam",
      status: "success",
    },
  ];

  return (
    <div className="space-y-6">
      {isDataLoading ? (
        <div className="text-white flex justify-center items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        <StatsGrid statsData={transactionData} />
      )}

      <Filters
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        selectedDeviceType={selectedDeviceType}
        setSelectedDeviceType={setSelectedDeviceType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedCondition={selectedCondition}
        setSelectedCondition={setSelectedCondition}
      />

      <div className="grid grid-row-2 lg:grid-cols-3 gap-6">
        <MapSection />
        <ErrorLog errorLogData={errorLogData} />
      </div>
    </div>
  );
};

export default GeographicInfoSystem;
