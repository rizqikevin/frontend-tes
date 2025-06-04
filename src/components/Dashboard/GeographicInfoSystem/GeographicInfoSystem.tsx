import React, { useState } from "react";
import StatsGrid from "./StatsGrid";
import Filters from "./Filters";
import MapSection from "./MapSection";
import ErrorLog from "./ErrorLog";
import { ErrorItem } from "./ErrorLog";

const GeographicInfoSystem: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  const statsData = [
    {
      label: "Total Revenue",
      value: "Rp 59,492.10",
      date: "25/02/2025",
    },
    {
      label: "Total Transaction",
      value: "2101",
      date: "25/02/2025",
    },
    { label: "Active Gate", value: "9", date: "25/02/2025" },
    { label: "Inactive Gate", value: "1", date: "25/02/2025" },
    {
      label: "Total Beban Ruas",
      value: "1.000",
      date: "25/02/2025",
    },
    {
      label: "Total LHR",
      value: "500",
      date: "01/02/2025 - 25/02/2025",
    },
  ];

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
      <StatsGrid statsData={statsData} />

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
