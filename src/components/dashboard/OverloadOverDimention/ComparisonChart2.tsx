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
import { useMonthlyOdolChartStore } from "@/stores/useMonthlyOdolChartStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

// Register components
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
  const { labels, datasets, fetchMonthlyChartData, title } =
    useMonthlyOdolChartStore();
  const { start_date, end_date } = useDateFilterStore.getState();
  console.log(title);
  useEffect(() => {
    fetchMonthlyChartData();
  }, [start_date, end_date]);

  const defaultLabels = [
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
  ];

  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels: labels.length ? labels : defaultLabels,
    datasets: datasets.length
      ? datasets.map((ds) => {
          const baseStyle = {
            label: ds.label,
            data: ds.data,
          };

          if (ds.type === "bar") {
            return {
              ...baseStyle,
              type: "bar" as const,
              backgroundColor: ds.label === "ODOL" ? "#d32f2f" : "#4caf50",
              borderRadius: 4,
            };
          } else {
            return {
              ...baseStyle,
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
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-auto">
      <h2 className="text-sm mb-2 font-semibold uppercase">{title}</h2>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};
