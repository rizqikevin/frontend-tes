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

// Register necessary components
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

export const ComparisonChart2: React.FC = () => {
  const data: ChartData<"bar" | "line", number[], string> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        type: "bar",
        label: "Normal",
        data: [
          30000, 21000, 28000, 24000, 25000, 27000, 40000, 38000, 26000, 31000,
          23000, 29000,
        ],
        backgroundColor: "#4caf50",
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "ODOL",
        data: [
          12000, 8000, 9000, 10000, 11000, 13000, 15000, 16000, 9000, 10000,
          7000, 9000,
        ],
        backgroundColor: "#d32f2f",
        borderRadius: 4,
      },
      {
        type: "line",
        label: "Total",
        data: [
          42000, 29000, 37000, 34000, 36000, 40000, 55000, 54000, 35000, 41000,
          30000, 38000,
        ],
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
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-auto">
      <h2 className="text-sm mb-2 font-semibold uppercase">
        PERBANDINGAN KEPATUHAN DALAM HARI BULAN JULY 2025
      </h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
