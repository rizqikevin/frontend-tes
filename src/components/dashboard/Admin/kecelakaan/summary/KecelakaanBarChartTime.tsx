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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const KecelakaanBarChartTime: React.FC = () => {
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

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: "00:00 - 06:00",
        data: [4, 3, 2, 6, 5, 1, 2, 1, 2, 3, 2, 1],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "06:00 - 12:00",
        data: [4, 1, 3, 2, 1, 3, 1, 2, 3, 2, 1, 2],
        backgroundColor: "#ef4444",
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "12:00 - 18:00",
        data: [1, 2, 3, 5, 8, 2, 1, 2, 3, 2, 1, 2],
        backgroundColor: "#facc15",
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "18:00 - 24:00",
        data: [2, 3, 3, 2, 2, 2, 1, 2, 3, 2, 1, 2],
        backgroundColor: "#6b7280",
        borderRadius: 6,
        barThickness: 12,
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
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#fff", stepSize: 1 },
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
        GRAFIK PER RENTAN WAKTU KEJADIAN
      </h2>

      <Chart
        type="bar"
        data={chartData}
        options={options}
        height={150}
        width={250}
      />

      <div className="mt-6">
        <table className="relative -left-10  w-full min-w-[760px] text-sm text-white border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              <th className="py-1 pl-2 text-left border-b border-gray-600 w-20">
                Waktu
              </th>
              {labels.map((label) => (
                <th
                  key={label}
                  className="py-0 pl-0 text-left border-b border-gray-600"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData.datasets.map((ds) => (
              <tr key={ds.label} className="border-t border-gray-600">
                <td
                  className="py-1 pl-1 font-semibold text-left"
                  style={{ color: ds.backgroundColor as string }}
                >
                  {ds.label}
                </td>
                {ds.data.map((val, i) => (
                  <td key={i} className="py-1 pl-1 text-left">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KecelakaanBarChartTime;
