import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LakaFatalityChart: React.FC = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Tingkat Kecelakaan",
        data: [50, 59, 48, 67, 61, 122, 115, 88, 88, 99, 102, 100],
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvas } = chart;
          const gradient = canvas.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, "rgba(59,130,246,0.3)");
          gradient.addColorStop(1, "rgba(59,130,246,0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Tingkat Fatality",
        data: [20, 27, 31, 28, 29, 33, 30, 31, 30, 31, 32, 33],
        fill: true,
        borderColor: "#ef4444",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvas } = chart;
          const gradient = canvas.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, "rgba(239,68,68,0.3)");
          gradient.addColorStop(1, "rgba(239,68,68,0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      datalabels: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-dashboard-accent p-10 rounded-lg h-full w-full max-h-[980px]">
      <h2 className="text-sm mb-2 font-semibold text-white">
        Tingkat Laka & Fatality
      </h2>
      <Line data={data} options={options} height={355} />
    </div>
  );
};

export default LakaFatalityChart;
