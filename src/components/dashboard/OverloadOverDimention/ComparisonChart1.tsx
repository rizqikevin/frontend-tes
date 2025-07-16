import React, { useEffect } from "react";
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
import { useOdolComparisonStore } from "@/stores/useOdolComparisonStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

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
  const { labels, odolData, fetchOdolData, title } = useOdolComparisonStore();
  const { start_date, end_date } = useDateFilterStore();

  console.log("labels:", labels);
  console.log("odolData:", odolData);
  console.log("title:", title);

  useEffect(() => {
    fetchOdolData();
  }, [start_date, end_date]);

  const defaultLabels = ["Gol 1", "Gol 2", "Gol 3", "Gol 4", "Gol 5"];
  const displayLabels = labels.length ? labels : defaultLabels;
  const displayData = odolData.length ? odolData : [0, 0, 0, 0, 0];

  const data: ChartData<"bar" | "line", number[], string> = {
    labels: displayLabels,
    datasets: [
      {
        type: "bar",
        label: "ODOL",
        data: displayData,
        backgroundColor: [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#2196f3",
          "#4caf50",
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
      <h2 className="text-sm mb-2 font-semibold uppercase">{title}</h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
