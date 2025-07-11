import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register chart components
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

export const ComparisonChart1: React.FC = () => {
  const odolData = [32, 18, 28, 29, 20];

  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["Gol 1", "Gol 2", "Gol 3", "Gol 4", "Gol 5"],
    datasets: [
      {
        type: "bar",
        label: "ODOL",
        data: odolData,
        backgroundColor: [
          "#f44336", // Gol 1
          "#e91e63", // Gol 2
          "#9c27b0", // Gol 3
          "#2196f3", // Gol 4
          "#4caf50", // Gol 5
        ],
        borderSkipped: false,
        borderRadius: 10,
        order: 0,
        barThickness: 80,
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-auto">
      <h2 className="text-sm mb-2 font-semibold uppercase">
        PERBANDINGAN KEPATUHAN DALAM HARI BULAN JULY 2025
      </h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
