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
import { useOdolComparisonStore } from "@/stores/useOdolComparisonStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const ComparisonChart5: React.FC = () => {
  const { fetchOdolData, title } = useOdolComparisonStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchOdolData();
  }, [start_date, end_date]);

  const labels = [
    "Kuala Tanjung",
    "Indrapura",
    "Tebing Tinggi",
    "Dolok Merawan",
    "Sinaksak",
    "Simpang Pane",
  ];

  const dataByStatus = {
    ODOL: [40, 20, 29, 20, 20, 20],
    Normal: [20, 20, 25, 20, 20, 20],
  };

  const colors: Record<string, string> = {
    ODOL: "#f44336", // merah
    Normal: "#4caf50", // hijau
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: Object.entries(dataByStatus).map(([label, values]) => ({
      label,
      data: values,
      backgroundColor: colors[label],
      borderSkipped: false,
      borderRadius: 6,
      barThickness: 45,
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
        max: 100,
        ticks: {
          color: "#fff",
          callback: (val) => `${val}%`,
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
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full w-full">
      <h2 className="text-sm mb-2 font-semibold uppercase text-white">
        Perbandingan Kepatuhan dalam Tiap Gerbang
      </h2>

      {/* Chart */}
      <Chart type="bar" data={data} options={options} height={200} />

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-white text-center border-collapse">
          <thead>
            <tr className="border-t border-gray-600">
              <th className="py-2 border-b border-gray-600">Status</th>
              {labels.map((label) => (
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
                {values.map((val, i) => (
                  <td key={i} className="py-2">
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
