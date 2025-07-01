import React, { useEffect } from "react";
import { useAqiStore } from "@/stores/useAqiStore";
import AqiCard from "./AqiCard";
import AqiTable from "./AqiTable";

export const Aqi: React.FC = () => {
  const { data, fetchAQI, loading } = useAqiStore();

  useEffect(() => {
    fetchAQI();
  }, []);

  return (
    <div className="min-h-screen text-white p-6 space-y-6 font-sans">
      <AqiCard data={data} />
      <AqiTable data={data} loading={loading} />
    </div>
  );
};
