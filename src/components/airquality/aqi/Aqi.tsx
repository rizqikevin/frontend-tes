import React, { useEffect, useState } from "react";
import { useAqiStore } from "@/stores/useAqiStore";

export const Aqi: React.FC = () => {
  const { data, fetchAQI, page, limit, loading } = useAqiStore();

  useEffect(() => {
    fetchAQI();
  }, [page, limit]);

  return (
    <div className="min-h-screen text-white p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="bg-dashboard-accent p-4 rounded-xl flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center">
            <p className="text-2xl font-bold">{data[0].ispu}</p>
            <p className="text-sm">AQI US</p>
          </div>
          <div>
            <p className="text-sm">Live Air Quality (AQI)</p>
            <p className="font-semibold text-lg">
              Unhealthy for Sensitive Groups
            </p>
          </div>
        </div>

        <div
          className="flex items-center text-left gap-32
         text-sm"
        >
          <div>
            <p className="text-gray-400">Location</p>
            <p>Kuala Tanjung</p>
          </div>
          <div>
            <p className="text-gray-400">Air Quality Index</p>
            <p>{data[0].ispu}</p>
          </div>
          <div>
            <p className="text-gray-400">Sensor Name</p>
            <p>{data[0].sensor_name}</p>
          </div>
          <div>
            <p className="text-gray-400">PM10</p>
            <p>{data[0].pm10}</p>
          </div>
          <div>
            <p className="text-gray-400">PM2.5</p>
            <p>{data[0].pm25}</p>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-3 rounded-full">
            <span className="text-2xl">❤️</span>
          </div>
        </div>
      </div>

      {/* AQI Table */}
      <div className="bg-dashboard-accent rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Air Quality Indexes (AQI)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="p-2">Date</th>
                <th className="p-2">Day</th>
                <th className="p-2">Pollution level</th>
                <th className="p-2">Humidity</th>
                <th className="p-2">Wind</th>
                <th className="p-2">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 p-4">
                    Loading data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 p-4">
                    Tidak ada data AQI
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="p-2">
                      {new Date(item.tgl).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-2">
                      {new Date(item.tgl).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </td>
                    <td className="p-2">
                      <div
                        className={`flex items-center justify-between px-3 py-1 rounded-md bg-orange-500`}
                      >
                        <span>Level</span>
                        <span className="ml-2 text-sm">{item.ispu} AQI US</span>
                        <span className="ml-2">❤️</span>
                      </div>
                    </td>
                    <td className="p-2">{item.humidity}%</td>
                    <td className="p-2">10/km</td>
                    <td className="p-2">{item.suhu}°C</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
