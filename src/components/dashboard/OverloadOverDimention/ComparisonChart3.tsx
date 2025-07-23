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
import { useYearlyOdolChartStore } from "@/stores/useYearlyOdolChartStore";
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

export const ComparisonChart3: React.FC = () => {
  const { labels, datasets, fetchYearlyChartData, title } =
    useYearlyOdolChartStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchYearlyChartData();
  }, [start_date, end_date]);

  const displayLabels = labels.length
    ? labels
    : ["2021", "2022", "2023", "2024", "2025"];

  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels: displayLabels,
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
              barThickness: 25,
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

  const odolDataset = datasets.find((ds) => ds.label === "ODOL");
  const normalDataset = datasets.find((ds) => ds.label === "Normal");

  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full w-full">
      <h2 className="text-sm mb-2 font-semibold uppercase text-white">
        {title}
      </h2>

      {/* Chart */}
      <Chart type="bar" data={chartData} options={options} height={353} />

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-white text-center border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              <th className="py-2 border-b border-gray-600">Status</th>
              {displayLabels.map((label) => (
                <th key={label} className="py-2 border-b border-gray-600">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {odolDataset && (
              <tr className="border-t border-gray-600">
                <td className="py-2 font-semibold text-left px-2 text-red-500">
                  ODOL
                </td>
                {odolDataset.data.map((val, i) => (
                  <td key={i} className="py-2">
                    {val}%
                  </td>
                ))}
              </tr>
            )}
            {normalDataset && (
              <tr className="border-t border-gray-600">
                <td className="py-2 font-semibold text-left px-2 text-green-500">
                  Normal
                </td>
                {normalDataset.data.map((val, i) => (
                  <td key={i} className="py-2">
                    {val}%
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
