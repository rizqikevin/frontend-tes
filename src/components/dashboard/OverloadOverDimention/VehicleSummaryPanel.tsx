import React, { useEffect } from "react";
import { useGolonganChartStore } from "@/stores/useGolonganChartStore";
import numeral from "numeral";

export const VehicleSummaryPanel: React.FC = () => {
  const { chartData, chartTitle, fetchChartData } = useGolonganChartStore();

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  if (!chartData || chartData.datasets.length === 0) {
    return (
      <div className="bg-[#2b2b2b] rounded-md p-4">
        <p className="text-sm text-gray-300">Memuat data...</p>
      </div>
    );
  }

  const labels = chartData.labels;
  const data = chartData.datasets[0].data;

  const total = data.reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 flex flex-col justify-between w-full h-full">
      <p className="text-xl text-white font-semibold mb-2">{chartTitle}</p>

      <div className="text-sm text-gray-200 space-y-2 mb-4">
        {labels.map((label, idx) => {
          const value = data[idx];
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={idx} className="flex justify-between">
              <span className="font-medium">{label}</span>
              <span>
                {numeral(value).format("0,0")} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
      <div>
        <div className="text-sm text-gray-400">Total Kendaraan</div>
        <div className="text-sm font-bold text-white">
          {numeral(total).format("0,0")} Kendaraan
        </div>
      </div>
    </div>
  );
};
