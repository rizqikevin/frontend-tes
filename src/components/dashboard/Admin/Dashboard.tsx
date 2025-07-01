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
import AqiCard from "@/components/airquality/aqi/AqiCard";
import { useAqiStore } from "@/stores/useAqiStore";

const statsData = [
  { label: "Active Gate", value: "9", date: "25/02/2025" },
  { label: "Inactive Gate", value: "1", date: "25/02/2025" },
  {
    label: "Total Lalin Harian Rata-Rata",
    value: "323",
    date: "25/02/2025",
  },
  {
    label: "Beban Ruas",
    value: "1000",
    date: "25/02/2025",
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const sampleBarData = [
  {
    label: "LHR",
    backgroundColor: "#42A5F5",
    data: [
      90_000, 85_000, 80_000, 70_000, 60_000, 55_000, 50_000, 48_000, 45_000,
      44_000, 42_000, 40_000,
    ],
  },
  {
    label: "Prognosa",
    backgroundColor: "#FFEB3B",
    data: [
      100_000, 95_000, 90_000, 88_000, 85_000, 80_000, 75_000, 72_000, 70_000,
      68_000, 65_000, 62_000,
    ],
  },
];

const Dashboard: React.FC = () => {
  const { data, fetchAQI } = useAqiStore();

  useEffect(() => {
    fetchAQI();
  }, []);

  return (
    <div className="space-y-6">
      <StatsGrid statsData={statsData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <MapSection />
        <div className="flex flex-col gap-4">
          <TrafficChart />
          <TrafficChart />
        </div>
        <div className="flex justify-end min-w-0">
          <div className="overflow-y-auto h-full max-h-[70vh] pr-1 scrollbar-hidden">
            <div className="rounded-lg border p-2 w-full h-auto bg-[#082d72] items-center mb-4">
              <WeatherCard />
            </div>

            <IncidentCard />
            <div className="mt-4">
              <CctvCard date="25/02/2025" active={100} nonActive={10} />
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
