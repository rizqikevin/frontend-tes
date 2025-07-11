import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

interface CardPanelProps {
  title: string;
  value: number;
  percentage: number;
  location: string;
  dateRange: string;
}

export const CardPanel: React.FC<CardPanelProps> = ({
  title,
  value,
  percentage,
  location,
  dateRange,
}) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#34D399", "#322932"], // Green and Gray
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full max-w-xs">
      <div className="flex items-center gap-4">
        {/* Circular Progress */}
        <div className="relative w-14 h-14">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {percentage.toFixed(1)}%
          </div>
        </div>

        {/* Title & Date */}
        <div>
          <div className="font-semibold text-sm">{location}</div>
          <div className="text-xs text-gray-400">{dateRange}</div>
        </div>
      </div>

      {/* Value */}
      <div className="text-sm mt-4 text-gray-400">Pendapatan</div>
      <div className="text-xl font-bold text-white">
        Rp {value.toLocaleString("id-ID")}
      </div>
    </div>
  );
};
