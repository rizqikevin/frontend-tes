import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useGerbangOdolChartStore } from "@/stores/useGerbangOdolChartStore";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export const ComparisonChart5: React.FC = () => {
  const { labels, datasets, fetchGerbangOdolChartData, title } =
    useGerbangOdolChartStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchGerbangOdolChartData();
  }, [start_date, end_date]);

  const colors: Record<string, string> = {
    ODOL: "#f44336",
    OD: "#ff9800",
    OL: "#ffeb3b",
    Normal: "#4caf50",
  };

  // Filter out 'total' dataset
  const filteredDatasets = datasets
    .filter((ds) => ds.label.toLowerCase() !== "total")
    .map((ds) => ({
      ...ds,
      backgroundColor: colors[ds.label] || "#999",
      borderColor: colors[ds.label] || "#999",
      borderWidth: 2,
      borderRadius(ctx, options) {
        options = options || {};
        const { dataIndex } = ctx;
        if (dataIndex !== undefined) {
          return { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 };
        }
        return 0;
      },
      barThickness: ds.type === "bar" ? 25 : undefined,
      fill: ds.type === "line" ? false : undefined,
    }));

  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels,
    datasets: filteredDatasets,
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
          callback: function (value) {
            return Number(value).toLocaleString("id-ID");
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
      <h2 className="text-lg mb-2 font-semibold text-white">
        Perbandingan Kepatuhan Berdasarkan Gerbang
      </h2>

      {/* Chart */}
      <Chart type="bar" data={chartData} options={options} height={150} />

      {/* Table Persentase */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-white border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              <th className="py-1 pl-2 text-left border-b border-gray-600">
                Status
              </th>
              {labels.map((label) => (
                <th
                  key={label}
                  className="py-1 pl-0 text-left border-b border-gray-600"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDatasets.map(({ label, data }) => {
              const totalPerLabel = data.map((_, i) =>
                filteredDatasets.reduce((sum, ds) => sum + ds.data[i], 0)
              );

              const percentages = data.map((val, i) =>
                totalPerLabel[i]
                  ? ((val / totalPerLabel[i]) * 100).toFixed(1)
                  : "0.0"
              );

              return (
                <tr key={label} className="border-t border-gray-600">
                  <td
                    className="py-1 pl-2 text-left font-semibold"
                    style={{ color: colors[label] }}
                  >
                    {label}
                  </td>
                  {percentages.map((pct, i) => (
                    <td key={i} className="py-1 pl-2 text-left">
                      {pct}%
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
