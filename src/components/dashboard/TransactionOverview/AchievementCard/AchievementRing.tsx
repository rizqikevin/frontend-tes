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
import { useTransactionStore } from "@/stores/useTransactionStore";

interface AchievementRingProps {
  percent: number;
  revenue: string;
  target: string;
}

export const AchievementRing: React.FC<AchievementRingProps> = ({
  percent,
  revenue,
  target,
}) => {
  const percentValue = parseFloat(percent.toString()); // 2074.21
  const displayPercent = percentValue.toFixed(1);
  const chartPercent = percentValue > 100 ? 100 : percentValue;
  const { otherTargets } = useTransactionStore();
  const chartData: ChartData<"doughnut", number[], string> = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [chartPercent, 100 - chartPercent],
        backgroundColor: ["#cddc39", "#555"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full h-full flex flex-col justify-between">
      <h2 className="text-sm font-semibold uppercase mb-1">Achievement RKAP</h2>

      {/* Ring Chart */}
      <div className="relative w-full max-w-[170px] aspect-square self-center">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#cddc39]">
          {displayPercent ?? 0}%
        </div>
      </div>

      {/* Persentase Info */}
      <div className="mt-4 space-y-1 text-xs text-gray-400">
        {otherTargets.map((target, index) => (
          <div key={index} className="flex justify-between">
            <span>{target.target_name}</span>
            <span>{parseFloat(target.percent).toFixed(1)}%</span>
          </div>
        ))}
      </div>

      {/* Nilai */}
      <div className="mt-2 text-xs text-white space-y-1">
        <div className="flex justify-between">
          <p className="mt-1">RKAP Target</p>
          <p className="font-semibold">{target}</p>
        </div>
        {otherTargets.map((target, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <p className="mt-1">{target.target_name} Target</p>
              <p className="font-semibold">
                {`Rp ${Number(target.revenue_target).toLocaleString("id-ID")}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
