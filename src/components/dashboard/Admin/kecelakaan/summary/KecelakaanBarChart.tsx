import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const KecelakaanBarChart: React.FC = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: "Golongan 1",
        data: [3, 2.5, 1.6, 5.5, 4.8, 1.1, 2.7, 1.2, 2.4, 1.7, 2.8, 1.0],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 20,
      },
      {
        label: "Golongan 2",
        data: [3.1, 0.9, 2.4, 1.7, 2.1, 2.8, 1.2, 2.4, 1.7, 2.8, 1.0],
        backgroundColor: "#ef4444",
        borderRadius: 6,
        barThickness: 20,
      },
      {
        label: "Golongan 3",
        data: [1.5, 0, 0, 4.9, 6.7, 1.0, 2.5, 1.2, 2.4, 1.7, 2.8, 1.0],
        backgroundColor: "#6b7280",
        borderRadius: 6,
        barThickness: 20,
      },
      {
        label: "Golongan 4",
        data: [1.6, 2.5, 2.4, 1.7, 2.7, 2.8, 1.1, 2.4, 1.7, 2.8, 1.0],
        backgroundColor: "#f59e0b",
        borderRadius: 6,
        barThickness: 20,
      },
      {
        label: "Golongan 5",
        data: [1.5, 2.5, 2.4, 1.7, 2.7, 2.0, 1.1, 2.4, 1.7, 2.8, 1.0],
        backgroundColor: "#22c55e",
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#fff" },
      },
      datalabels: { display: false },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
          stepSize: 1,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
      <h2 className="text-sm mb-2 font-semibold uppercase text-white">
        DATA KECELAKAAN PER GOLONGAN
      </h2>
      <Chart type="bar" data={chartData} options={options} height={287} />
    </div>
  );
};

export default KecelakaanBarChart;
