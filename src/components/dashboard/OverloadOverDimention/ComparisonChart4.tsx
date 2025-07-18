import React, { useEffect } from "react";
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
import { useGerbangOdolChartStore } from "@/stores/useGerbangOdolChartStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

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

export const ComparisonChart4: React.FC = () => {
  const { labels, datasets, fetchGerbangOdolChartData, title } =
    useGerbangOdolChartStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchGerbangOdolChartData();
  }, [start_date, end_date]);

  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels: labels.length ? labels : ["2021", "2022", "2023", "2024", "2025"],
    datasets: datasets.length
      ? datasets.map((ds) => {
          const base = {
            label: ds.label,
            data: ds.data,
          };

          if (ds.type === "bar") {
            return {
              ...base,
              type: "bar" as const,
              backgroundColor: ds.label === "ODOL" ? "#d32f2f" : "#4caf50",
              borderRadius: 4,
              barThickness: 30,
            };
          } else {
            return {
              ...base,
              type: "line" as const,
              borderColor: "#ffb300",
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
            };
          }
        })
      : [],
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
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full w-full">
      <h2 className="text-sm mb-2 font-semibold uppercase">{title}</h2>
      <Chart type="bar" data={chartData} options={options} height={300} />
    </div>
  );
};
