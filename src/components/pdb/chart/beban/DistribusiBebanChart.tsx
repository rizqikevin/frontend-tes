import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DistribusiBebanChart: React.FC = () => {
  // Dummy data
  const labels = ["8.0-8.5", "8.5-9.0"];
  const data = {
    labels,
    datasets: [
      {
        label: "Distribusi Beban",
        data: [95, 70],
        backgroundColor: "limegreen",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-md px-4 py-3">
      {/* Title */}
      <h2 className="text-md font-semibold mb-2">
        Distribusi beban (Histogram kW)
      </h2>

      {/* Chart */}
      <div className="h-[220px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DistribusiBebanChart;
