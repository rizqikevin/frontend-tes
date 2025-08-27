import React, { useEffect, useState } from "react";
import StatsGrid from "./StatsGrid";
import MapSection from "./MapSection";
import TrafficChart from "./TrafficChart";
import WeatherCard from "@/components/WeatherCard";
import IncidentCard from "./IncidentCard";
import EnergyChart from "@/components/rju/EnergiChart";
import EmergencyCallCard from "./EmergencyCallCard";
import SosialMediaSentimenCard from "./SosialMediaSentimenCard";
import CctvCard from "./CctvCard";
import AqiCard from "@/components/airquality/aqi/AqiHeader";
import { useAqiStore } from "@/stores/useAqiStore";
import { useTransactionStore } from "@/stores/useTransactionCardStore";
import ErrorLog from "./ErrorLog";
import { ErrorItem } from "./ErrorLog";
import api from "@/services/api";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useHeartbeatStore } from "@/stores/useHeartbeatStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EnergiCard from "@/components/EnergiCard";
dayjs.extend(relativeTime);

const Dashboard: React.FC = () => {
  const { data, fetchAQI } = useAqiStore();
  const { TransactionDataAdmin, fetchTransactionData, isDataLoading } =
    useTransactionStore();
  const [statusCctv, setStatusCctv] = useState([]);
  const [statusVMS, setStatusVMS] = useState([]);
  const { start_date, end_date } = useDateFilterStore();
  const {
    data: heartbeatData,
    fetchHeartbeat,
    selectedRuas,
    selectedStatus,
    selectedAlat,
  } = useHeartbeatStore();

  const errorLogData: ErrorItem[] = heartbeatData.map((item) => ({
    jenisAlat: item.id_alat,
    ruas: item.nama_gerbang,
    namaGerbang: item.nama_gerbang,
    gardu: item.gardu,
    waktu: dayjs(item.insert_at).format("DD/MM/YYYY, HH:mm:ss") + " WIB",
    lamaError:
      item.last_status === "off"
        ? dayjs(item.insert_at).fromNow(true)
        : "Normal",
    status:
      item.last_status === "off"
        ? "off"
        : item.last_status === "on"
        ? "success"
        : "warning",
  }));

  const fetchStatusCctv = async () => {
    try {
      const response = await api.get("/cctv/status");
      setStatusCctv(response.data.data);
    } catch (error) {
      console.error("Error fetching CCTV status:", error);
      return [];
    }
  };

  const fetchStatusVMS = async () => {
    try {
      const response = await api.get("/heartbeat/status?id_alat=VMS");
      setStatusVMS(response.data.data);
    } catch (error) {
      console.error("Error fetching VMS status:", error);
      return [];
    }
  };

  const mappedStatusCctv = statusCctv.map((item: any) => ({
    total_active: item.total_active,
    total_inactive: item.total_inactive,
  }));

  const mappedStatusVMS = statusVMS.map((item: any) => ({
    total_active: item.total_active,
    total_inactive: item.total_inactive,
  }));

  // console.log("statusCctv fetched", statusCctv);

  useEffect(() => {
    fetchHeartbeat();
  }, [selectedAlat, selectedStatus, selectedRuas]);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchStatusVMS();
      await fetchStatusCctv();
      await fetchAQI();
      await fetchTransactionData();
    };
    fetchAll();
  }, []);

  // console.log(TransactionDataAdmin);

  return (
    <div className="space-y-3">
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
        <StatsGrid statsData={TransactionDataAdmin} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
        <MapSection />

        <div className=" overflow-y-auto  max-h-[75vh] scrollbar-hidden rounded-lg p-2 w-full h-full items-center  flex flex-col mb-4 ">
          <TrafficChart />
          <div className="mt-4 h-full w-full bg-dashboard-accent">
            <ErrorLog errorLogData={errorLogData} />
          </div>
        </div>
        <div className="flex justify-end min-w-0">
          <div className="overflow-y-auto h-full max-h-[75vh] pr-1  p-2 scrollbar-hidden rounded-lg">
            <div className="rounded-lg border p-2 w-full h-1/4 bg-[#082d72] items-center mb-4">
              <WeatherCard />
            </div>

            <div className="mb-4">
              <CctvCard
                title="CCTV"
                description="Monitoring CCTV"
                date={
                  typeof start_date === "string"
                    ? start_date
                    : start_date?.toISOString() ?? ""
                }
                active={mappedStatusCctv[0]?.total_active || 0}
                nonActive={mappedStatusCctv[0]?.total_inactive || 0}
              />
            </div>

            <div className="mb-4">
              <CctvCard
                title="VMS"
                description="Monitoring VMS"
                date={
                  typeof start_date === "string"
                    ? start_date
                    : start_date?.toISOString() ?? ""
                }
                active={mappedStatusVMS[0]?.total_active || 0}
                nonActive={mappedStatusVMS[0]?.total_inactive || 0}
              />
            </div>

            <div className="mt-4">
              <IncidentCard />
            </div>

            <div className="rounded-lg border p-4 bg-dashboard-accent max-h-[100vh] overflow-y-auto mt-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">Energy (kWh)</h2>
                  <EnergyChart />
                </div>

                <hr className="my-3 border-gray-600" />

                <EnergiCard />
              </div>
            </div>
            <div className="mt-4">
              <EmergencyCallCard />
            </div>
            <div className="mt-4">
              <SosialMediaSentimenCard />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-row-3">
        <AqiCard data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
