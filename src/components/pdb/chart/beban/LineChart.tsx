import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

const LineChart: React.FC = () => {
  const labels = [
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
  ];

  const datasets = [
    {
      label: "Total Active Power",
      data: [65, 70, 80, 92, 88, 85, 89, 100, 95],
      borderColor: "limegreen",
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
  ];

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-md px-4 py-3 flex flex-1 flex-col">
      {/* Title */}
      <h2 className="text-md font-semibold mb-2">Total Active Power (kW)</h2>

      {/* Chart */}
      <div className="h-[200px] w-full">
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: "index",
                intersect: false,
              },
              datalabels: { display: false },
            },

            scales: {
              x: {
                ticks: {
                  color: "#fff",
                  maxRotation: 0,
                  autoSkip: true,
                },
                grid: {
                  color: "#444",
                },
              },
              y: {
                beginAtZero: false,
                ticks: {
                  color: "#fff",
                },
                grid: {
                  color: "#444",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
