import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StripMapsChartProps {
  title?: string;
  labels: (string | string[])[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const StripMapsChart: React.FC<StripMapsChartProps> = ({
  title,
  labels,
  datasets,
}) => {
  const data = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      borderRadius: (ctx: any) => {
        const { dataIndex } = ctx;
        if (dataIndex !== undefined) {
          return {
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0,
          };
        }
        return 0;
      },
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#fff" },
      },
      datalabels: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: "#fff",
        font: { size: 14, weight: "bold" },
        align: "start",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
          callback: function (val, index) {
            const lbl = (this as any).getLabelForValue(index);
            return Array.isArray(lbl) ? lbl : [lbl];
          },
        },
        grid: { color: "#444" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="w-full text-white rounded-md p-4">
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StripMapsChart;
