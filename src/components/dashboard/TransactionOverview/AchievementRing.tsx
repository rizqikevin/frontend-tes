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
    maintainAspectRatio: true,
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg flex flex-col justify-center items-centergap-2 w-full h-full max-w-sm">
      <h2 className="text-xs  uppercase">Achievement ATP</h2>

      {/* Ring Chart */}
      <div className="relative w-[117px] h-[90px] aspect-square ">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#cddc39]">
          {percentage}%
        </div>
      </div>

      {/* Persentase Info */}
      <div className="inline-flex gap-2 text-xs text-gray-400">
        <p>Revenue</p>
        <p>{percentage}%</p>
      </div>
      <div className="inline-flex gap-2 text-xs text-gray-400 mb-7">
        <p>Business Plan</p>
        <p>{100 - percentage}%</p>
      </div>

      {/* Nilai */}
      <div className="text-xs text-gray-100">
        <p>Revenue</p>
        <p className="font-semibold">{revenue}</p>
        <p className="mt-1">Business Plan</p>
        <p className="font-semibold">{businessPlan}</p>
      </div>
    </div>
  );
};
