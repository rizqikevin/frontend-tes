// src/components/AqiTable.tsx
import React from "react";

interface AqiTableProps {
  data: any[];
  loading: boolean;
}

const AqiTable: React.FC<AqiTableProps> = ({ data, loading }) => {
  return (
    <div className="bg-dashboard-accent rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Air Quality Indexes (AQI)</h2>
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
                    <div className="flex items-center justify-between px-3 py-1 rounded-md bg-orange-500">
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
  );
};

export default AqiTable;
