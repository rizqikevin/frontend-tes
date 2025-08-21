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
  const { labels, datasets, fetchYearlyChartData, title, isloading } =
    useYearlyOdolChartStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchYearlyChartData();
  }, [start_date, end_date]);

  const displayLabels = labels.length
    ? labels
    : ["2021", "2022", "2023", "2024", "2025"];

  const filteredDatasets = datasets.filter((ds) => ds.label !== "Total");
  const totalPerLabel = displayLabels.map((_, i) =>
    filteredDatasets.reduce((sum, ds) => sum + (ds.data[i] || 0), 0)
  );

  const percentageMap: Record<string, string[]> = {};
  filteredDatasets.forEach((ds) => {
    percentageMap[ds.label] = ds.data.map((val, i) =>
      totalPerLabel[i] ? ((val / totalPerLabel[i]) * 100).toFixed(1) : "0.0"
    );
  });

  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels: displayLabels,
    datasets: filteredDatasets.length
      ? filteredDatasets.map((ds) => {
          const base = {
            label: ds.label,
            data: ds.data,
          };

          if (ds.type === "bar") {
            return {
              ...base,
              type: "bar" as const,
              backgroundColor: ds.label === "ODOL" ? "#d32f2f" : "#4caf50",
              borderRadius(ctx, options) {
                options = options || {};
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

  if (isloading) {
    return (
      <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
        <h2 className="text-sm mb-2 font-semibold uppercase text-white">
          {title}
        </h2>
        <div className="flex justify-center items-center h-full">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4"
            />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
      <h2 className="text-lg mb-2 font-semibold text-white">
        Perbandingan Kepatuhan 2021-2025
      </h2>

      {/* Chart */}
      <Chart type="bar" data={chartData} options={options} height={142} />

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-white text-center border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              <th className="relative -left-1 py-2 border-b border-gray-600">
                Status
              </th>
              {displayLabels.map((label) => (
                <th
                  key={label}
                  className=" relative -left-9 py-2 px-14 border-b border-gray-600"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDatasets.map((ds) => (
              <tr key={ds.label} className="border-t border-gray-600">
                <td
                  className={`py-2 font-semibold text-left px-2 ${
                    ds.label === "ODOL"
                      ? "text-red-500"
                      : ds.label === "Normal"
                      ? "text-green-500"
                      : "text-white"
                  }`}
                >
                  {ds.label}
                </td>
                {percentageMap[ds.label].map((val, idx) => (
                  <td key={idx} className="relative -left-9 py-2  text-xs">
                    {val}%
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
