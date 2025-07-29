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
import Filters from "../GeographicInfoSystem/Filters";
import ErrorLog from "../GeographicInfoSystem/ErrorLog";
import { ErrorItem } from "../GeographicInfoSystem/ErrorLog";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

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

const Dashboard: React.FC = () => {
  const { data, fetchAQI } = useAqiStore();
  const { TransactionDataAdmin, fetchTransactionData, isDataLoading } =
    useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      await fetchAQI();
      await fetchTransactionData();
    };
    fetchAll();
  }, []);

  // console.log(TransactionDataAdmin);

  return (
    <div className="space-y-5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <MapSection />

        <div className=" overflow-y-auto  max-h-[75vh] scrollbar-hidden rounded-lg p-2 w-full h-full items-center  flex flex-col mb-4">
          <TrafficChart />
          <div className="mt-4">
            <ErrorLog errorLogData={errorLogData} />
          </div>
        </div>
        <div className="flex justify-end min-w-0">
          <div className="overflow-y-auto h-full max-h-[75vh] pr-1 scrollbar-hidden rounded-lg">
            <div className="mb-4">
              <CctvCard
                title="CCTV"
                description="Monitoring CCTV"
                date="25/02/2025"
                active={100}
                nonActive={10}
              />
            </div>
            {/* <div className="mb-4">
              <CctvCard
                title="VMS"
                description="Monitoring VMS"
                date="25/02/2025"
                active={100}
                nonActive={10}
              />
            </div> */}

            <div className="rounded-lg border p-2 w-full h-1/4 bg-[#082d72] items-center mb-4">
              <WeatherCard />
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

                <div>
                  <h3 className="text-md font-semibold mt-5 mb-2">
                    Energy Summary
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-sm">⚡ 483 Streetlight Connect</p>
                    <p className="text-sm text-red-400">
                      🔴 1 Street disconnected
                    </p>
                  </div>

                  <div className="flex justify-between mt-5 space-y-1 text-sm">
                    <p>
                      Average: <strong>499.0688 kWh</strong>
                    </p>
                    <p>
                      Actual Usage: <strong>3493.4817 kWh</strong>
                    </p>
                    <p>
                      Bill Estimate: <strong>Rp 5.047.033</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mt-4 mb-2">
                    Streetlight
                  </h3>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 py-1 text-black rounded"
                  />

                  <table className="w-full mt-2  text-xs">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-600">
                          <td className="py-3 px-3 text-center">819180203</td>
                          <td className="py-3 px-3 text-green-400 text-center">
                            connected
                          </td>
                          <td className="py-3 px-3 text-center">
                            2025-03-03 12:50
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
