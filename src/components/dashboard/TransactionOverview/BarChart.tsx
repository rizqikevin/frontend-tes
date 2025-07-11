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
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  datasets,
  labels,
  legend = true,
  height = 300,
}) => {
  return (
    <div className="bg-dashboard-accent rounded-lg p-4 w-full h-full text-white shadow">
      <h4 className="text-xs font-semibold mb-2">{title}</h4>
      <div style={{ height }}>
        <Bar
          data={{ datasets, labels }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: legend,
                position: "bottom",
                labels: { color: "white" },
              },
              datalabels: {
                display: false,
              },
            },
            scales: {
              x: {
                ticks: { color: "white" },
                grid: { color: "#444" },
              },
              y: {
                ticks: { color: "white" },
                grid: { color: "#444" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
