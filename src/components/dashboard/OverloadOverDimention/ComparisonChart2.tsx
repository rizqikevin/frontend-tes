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

// Register ChartJS components
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
  const displayLabels = labels.length ? labels : defaultLabels;

  // Hapus dataset total dari chart
  const filteredDatasets = datasets.filter((ds) => ds.label !== "Total");

  // Hitung persentase per kategori berdasarkan total per bulan
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
    datasets: filteredDatasets.map((ds) => {
      const baseStyle = {
        label: ds.label,
        data: ds.data,
      };

      if (ds.type === "bar") {
        return {
          ...baseStyle,
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
          barThickness: 15,
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
    }),
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#fff" },
      },
      datalabels: { display: false },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
          callback: (value) => `${(+value / 1000).toFixed(0)}K`,
        },
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
        {title}
      </h2>

      {/* Chart */}
      <Chart type="bar" data={chartData} options={options} height={140} />

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-white text-center border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              {/* <th className="relative -left-9 py-2 border-b border-gray-600">
                Status
              </th> */}
              {displayLabels.map((label) => (
                <th
                  key={label}
                  className="relative left-9 py-2 px-4 border-b border-gray-600"
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
                  className={`relative -left- py-2  font-semibold text-left px-1 ${
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
                  <td key={idx} className=" relative text-left py-2 text-xs">
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
