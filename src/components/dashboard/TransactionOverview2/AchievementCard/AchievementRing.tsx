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
  color: string;
  title: string;
  percent: number;
  revenue: string;
  target: string;
  dateRange?: string;
  bars?: {
    label: any;
    value: any;
    color: string;
  }[];
}

export const AchievementRing: React.FC<AchievementRingProps> = ({
  title,
  color,
  percent,
  revenue,
  target,
  dateRange,
  bars = [],
}) => {
  const percentValue = Number(percent);
  const displayPercent = percentValue.toFixed(1);
  const chartPercent = percentValue > 100 ? 100 : percentValue;
  const chartData: ChartData<"doughnut", number[], string> = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [chartPercent, 100 - chartPercent],
        backgroundColor: [color, "#555"],
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
      <p className="text-xs text-gray-400 flex justify-end ">
        Tanggal: {dateRange}
      </p>
      <h2 className="text-lg font-semibold  ">{title}</h2>
      <div>
        <p className="text-xs text-gray-400 mb-1">Lalin Tertimbang</p>
        <h2 className="text-2xl font-bold text-white">{revenue}</h2>
      </div>

      {/* Ring Chart */}
      <div className="relative w-full max-w-[250px] aspect-square self-center">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-3xl text-white">
          <span className="font-bold">{displayPercent ?? 0}%</span>
          <div>
            <p className="text-2xl text-white">RKAP</p>
          </div>
        </div>
      </div>

      {/* Persentase Info */}
      {/* <div className="mt-4 space-y-1 text-xs text-gray-400">
        {otherTargets.map((target, index) => (
          <div key={index} className="flex justify-between">
            <span>{target.target_name}</span>
            <span>{parseFloat(target.percent).toFixed(1)}%</span>
          </div>
        ))}
      </div> */}

      {/* Nilai */}
      {/* <div className="mt-2 text-xs text-white space-y-1">
        <div className="flex justify-between">
          <p className="mt-1">RKAP Target</p>
          <p className="font-semibold text-[10px]">{target}</p>
        </div>
        {otherTargets.map((target, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <p className="mt-1">{target.target_name} Target</p>
              <p className="font-semibold text-[10px]">
                {`Rp ${Number(target.revenue_target).toLocaleString("id-ID")}`}
              </p>
            </div>
          </div>
        ))} */}
      {/* Horizontal Bars */}
      <div className="mt-6 space-y-4">
        {bars.map((bar, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${Math.min(bar.value, 100)}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};
