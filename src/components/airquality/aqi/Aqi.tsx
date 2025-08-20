import React, { useEffect } from "react";
import { useAqiStore } from "@/stores/useAqiStore";
import AqiHeader from "./AqiHeader";
import AqiTable from "./AqiTable";

export const Aqi: React.FC = () => {
  const { data, fetchAQI, loading, summary, fetchAQISummary } = useAqiStore();

  useEffect(() => {
    fetchAQI();
    fetchAQISummary();
  }, []);

  // console.log("summary", summary);
  // console.log("data", data);

  return (
    <div className="min-h-screen text-white p-0 space-y-6 font-sans">
      <AqiHeader data={summary} />
      <AqiTable data={summary} loading={loading} />
    </div>
  );
};
