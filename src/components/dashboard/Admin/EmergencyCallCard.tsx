// components/EmergencyCallCard.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

interface CallStat {
  label: string;
  percentage: number;
  color: string;
  count: number;
}

const EmergencyCallCard: React.FC = () => {
  const date = "25/02/2025";

  const callStats: CallStat[] = [
    {
      label: "Terjawab",
      percentage: 90,
      color: "#22C55E", // green
      count: 900,
    },
    {
      label: "Tidak Terjawab",
      percentage: 5,
      color: "#F97316", // orange
      count: 50,
    },
    {
      label: "Reject",
      percentage: 5,
      color: "#EF4444", // red
      count: 50,
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-dashboard-accent rounded-xl p-4 w-full text-white shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="font-semibold text-sm">Emergency Call</h2>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      <div className="flex justify-between gap-3">
        {/* Doughnut Charts */}
        <div className="flex flex-col gap-5">
          {callStats.map((item, index) => {
            const data = {
              datasets: [
                {
                  data: [item.percentage, 100 - item.percentage],
                  backgroundColor: [item.color, "#3A3A3A"],
                  borderWidth: 0,
                  cutout: "70%",
                },
              ],
            };

            return (
              <div key={index} className="relative w-14 h-14">
                <Doughnut data={data} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {item.percentage}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Labels and Totals */}
        <div className="flex flex-col justify-between text-sm">
          {callStats.map((item, index) => (
            <div key={index} className="flex flex-col mb-2">
              <div className="left-24">
                <span className="text-white">{item.label}</span>
              </div>

              <span className="text-xs text-gray-400">Total {item.label}</span>
              <span className="text-base font-semibold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyCallCard;
