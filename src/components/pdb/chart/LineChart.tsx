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
  ChartOptions,
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

interface LineChartProps {
  title: string;
  labels: string[];
  datasets: any[];
}

const LineChart: React.FC<LineChartProps> = ({ title, labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
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
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-md px-4 py-3 flex flex-1 flex-col">
      {/* Title */}
      <h2 className="text-md font-semibold mb-2">{title}</h2>

      {/* Chart */}
      <div className="h-[200px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
