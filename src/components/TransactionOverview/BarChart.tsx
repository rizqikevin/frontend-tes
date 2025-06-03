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
    <div className=" bg-dashboard-accent">
      <div className=" p-4 rounded-lg text-white shadow-md w-[380px] h-[292px]">
        <h4 className="text-xs font-semibold mb-2">{title}</h4>
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
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
