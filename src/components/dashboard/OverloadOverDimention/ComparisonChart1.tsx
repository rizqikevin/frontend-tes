import React, { useEffect } from "react";
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
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useOdolByGolonganStore } from "@/stores/useOdolByGolonganStore";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const ComparisonChart1: React.FC = () => {
  const { labels, odolData, fetchOdolData, title, percentages, isloading } =
    useOdolByGolonganStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    const fetchAll = async () => {
      await fetchOdolData();
    };
    fetchAll();
  }, [start_date, end_date]);

  const defaultLabels = ["Gol 1", "Gol 2", "Gol 3", "Gol 4", "Gol 5"];
  const displayLabels = labels.length ? labels : defaultLabels;

  const dataByStatus = odolData;

  const colors: Record<string, string> = {
    ODOL: "#f44336",
    OD: "#ff9800",
    OL: "#ffeb3b",
    Normal: "#4caf50",
  };

  const data: ChartData<"bar", number[], string> = {
    labels: displayLabels,
    datasets: Object.entries(dataByStatus).map(([label, data], index) => ({
      label,
      data,
      backgroundColor: colors[label],
      borderSkipped: false,
      borderRadius(ctx, options) {
        options = options || {};
        const { dataIndex } = ctx;
        if (dataIndex !== undefined) {
          return { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 };
        }
        return 0;
      },
      barThickness: 30,
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#fff" },
      },
      datalabels: {
        display: false,
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

  if (isloading) {
    return (
      <div className="bg-[#2b2b2b] p-4 rounded-lg h-full w-full">
        <h2 className="text-sm mb-2 font-semibold uppercase text-white">
          {title}
        </h2>
        <div className="flex justify-center items-center h-[370px] w-full">
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
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full w-full">
      <h2 className="text-sm mb-2 font-semibold uppercase text-white">
        {title}
      </h2>

      {/* Chart */}
      <Chart type="bar" data={data} options={options} height={150} />

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
            {Object.entries(dataByStatus).map(([status, values]) => (
              <tr key={status} className="border-t border-gray-600">
                <td
                  className="py-2 font-semibold text-left px-2"
                  style={{ color: colors[status] }}
                >
                  {status}
                </td>
                {values.map((_, i) => {
                  const percent =
                    percentages?.[status]?.[i] !== undefined
                      ? `${percentages[status][i].toFixed(1)}%`
                      : "-";
                  return (
                    <td key={i} className="py-2">
                      {percent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
