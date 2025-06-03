// components/BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

interface BarChartProps {
  title: string;
  datasets: any[];
  labels: string[];
  legend?: boolean;
}
const BarChart: React.FC<BarChartProps> = ({
  title,
  datasets,
  labels,
  legend = true,
}) => {
  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full max-w-md">
      <h4 className="text-sm mb-2">{title}</h4>
      <Bar
        data={{
          datasets,
          labels,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: legend,
              position: "bottom",
              labels: { color: "white" },
            },
          },
          scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
