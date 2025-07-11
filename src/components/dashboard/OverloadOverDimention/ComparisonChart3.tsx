import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Tooltip,
  Legend
);

export const ComparisonChart3: React.FC = () => {
  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        type: "bar",
        label: "Normal",
        data: [60000, 40000, 50000, 45000, 55000],
        backgroundColor: "#4caf50",
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "ODOL",
        data: [10000, 20000, 25000, 15000, 12000],
        backgroundColor: "#d32f2f",
        borderRadius: 4,
      },
      {
        type: "line",
        label: "Total",
        data: [70000, 60000, 75000, 60000, 67000],
        borderColor: "#ffb300",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
          callback: (value) => `${(+value / 1000).toFixed(0)}K`,
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-[300px]">
      <h2 className="text-sm mb-2 font-semibold uppercase">
        PERBANDINGAN KEPATUHAN DALAM HARI BULAN JULY 2025
      </h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
