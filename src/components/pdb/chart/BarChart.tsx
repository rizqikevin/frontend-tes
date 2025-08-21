import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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

interface BarChartProps {
  title: string;
  labels: string[];
  datasets: any[];
}

const BarChart: React.FC<BarChartProps> = ({ title, labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
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
      <h2 className="text-md font-semibold mb-2">{title}</h2>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
