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

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Series {
  name: string;
  data: number[];
}

export const KecelakaanBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api2.get(
          "/ticket/list_kecelakaan/chart/by/class?frequency=monthly"
        );
        const responseData = res.data.data;

        if (responseData && responseData.labels && responseData.series) {
          const colorMap: Record<string, string> = {
            "Golongan 1": "#3b82f6",
            "Golongan 2": "#ef4444",
            "Golongan 3": "#6b7280",
            "Golongan 4": "#f59e0b",
            "Golongan 5": "#22c55e",
          };

          const mappedDatasets = responseData.series.map((item: Series) => ({
            label: item.name,
            data: item.data,
            backgroundColor: colorMap[item.name] || "#ccc",
            borderRadius: 6,
            barThickness: 10,
          }));

          setChartData({
            labels: responseData.labels,
            datasets: mappedDatasets,
          });
        }
      } catch (err) {
        setError("Gagal mengambil data grafik golongan.");
        console.error("Gagal mengambil data grafik golongan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#fff" },
      },
      datalabels: { display: false },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
          stepSize: 2,
        },
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
        <div className="flex items-center justify-center h-[420px]">
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
        <div className="relative h-[420px]">
          <Chart type="bar" data={chartData} options={options} />
        </div>
        <div className="mt-1">
          <table className="relative -left-3 w-full min-w-[760px] text-sm text-white border-collapse">
            <thead>
              <tr className="border-t border-gray-600">
                <th className="py-1 pl-0 text-left border-b border-gray-600 w-20"></th>
                {chartData.labels?.map((label) => (
                  <th
                    key={label}
                    className="py-0 pl-2 text-left border-b border-gray-600"
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
                    className="py-4 pl-0 font-semibold relative right-0 text-left"
                    style={{ color: ds.backgroundColor as string }}
                  >
                    {ds.label}
                  </td>
                  {ds.data.map((val, i) => (
                    <td key={i} className="py-1 pl-4 text-left">
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
        DATA KECELAKAAN PER GOLONGAN
      </h2>
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default KecelakaanBarChart;
