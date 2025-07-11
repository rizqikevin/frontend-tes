import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AchievementRingProps {
  percentage: number;
  revenue: string;
  businessPlan: string;
}

export const AchievementRing: React.FC<AchievementRingProps> = ({
  percentage,
  revenue,
  businessPlan,
}) => {
  const data: ChartData<"doughnut", number[], string> = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#cddc39", "#555"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full h-full flex flex-col justify-between">
      <h2 className="text-xs uppercase mb-1">Achievement ATP</h2>

      {/* Ring Chart */}
      <div className="relative w-full max-w-[100px] aspect-square self-center">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#cddc39]">
          {percentage}%
        </div>
      </div>

      {/* Percentage Info */}
      <div className="mt-4 space-y-1 text-xs text-gray-400">
        <div className="flex justify-between">
          <span>Revenue</span>
          <span>{percentage}%</span>
        </div>
        <div className="flex justify-between">
          <span>Business Plan</span>
          <span>{100 - percentage}%</span>
        </div>
      </div>

      {/* Nilai */}
      <div className="mt-2 text-xs text-white space-y-1">
        <p className="text-gray-400">Revenue</p>
        <p className="font-semibold">{revenue}</p>
        <p className="text-gray-400 mt-1">Business Plan</p>
        <p className="font-semibold">{businessPlan}</p>
      </div>
    </div>
  );
};
