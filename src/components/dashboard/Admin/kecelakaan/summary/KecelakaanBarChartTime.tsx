import React, { useEffect, useState } from "react";
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
import { api2 } from "@/services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface SeriesData {
  name: string;
  data: number[];
}

export const KecelakaanBarChartTime: React.FC = () => {
  const [chartData, setChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colorMap: Record<string, string> = {
    "00-06": "#3b82f6",
    "06-12": "#ef4444",
    "12-18": "#facc15",
    "18-24": "#6b7280",
  };

  const labelMap: Record<string, string> = {
    "00-06": "00:00 - 06:00",
    "06-12": "06:00 - 12:00",
    "12-18": "12:00 - 18:00",
    "18-24": "18:00 - 24:00",
  };

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api2.get(
          "/ticket/list_kecelakaan/chart/by/time?frequency=monthly"
        );
        const { labels, series } = res.data.data;

        const datasets = series.map((s: SeriesData) => ({
          label: labelMap[s.name] || s.name,
          data: s.data,
          backgroundColor: colorMap[s.name] || "#ccc",
          borderRadius: 6,
          barThickness: 12,
        }));

        setChartData({ labels, datasets });
      } catch (err) {
        setError("Gagal memuat data grafik.");
        console.error("Gagal fetch chart data waktu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Memuat data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="relative h-[250px]">
          <Chart type="bar" data={chartData} options={options} />
        </div>

        <div className="mt-6">
          <table className="relative -left-10 w-full min-w-[760px] text-sm text-white border-collapse">
            <thead>
              <tr className="border-t border-gray-600">
                <th className="py-1 pl-2 text-left border-b border-gray-600 w-20">
                  Waktu
                </th>
                {chartData.labels?.map((label) => (
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
      </>
    );
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full flex flex-col">
      <h2 className="text-sm mb-2 font-semibold uppercase text-white shrink-0">
        GRAFIK PER RENTAN WAKTU KEJADIAN
      </h2>
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default KecelakaanBarChartTime;
