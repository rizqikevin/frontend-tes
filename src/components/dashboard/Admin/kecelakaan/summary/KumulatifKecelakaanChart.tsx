import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { api2 } from "@/services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Series {
  name: string;
  data: number[];
}

interface ComponentData {
  chartData: ChartData<"bar">;
  tableData: { year: string; data: string[] }[];
}

const KumulatifKecelakaanChart: React.FC = () => {
  const [data, setData] = useState<ComponentData>({
    chartData: { labels: [], datasets: [] },
    tableData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api2.get(
          "/ticket/list_kecelakaan/chart/accumulation?start_year=2022&end_year=2025"
        );
        const { labels, series } = res.data.data;

        if (labels && series) {
          const colorMap: Record<string, string> = {
            "2022": "#6b7280", // abu
            "2023": "#22c55e", // hijau
            "2024": "#3b82f6", // biru
            "2025": "#facc15", // kuning
          };

          const newDatasets = series.map((item: Series) => ({
            label: item.name,
            data: item.data,
            backgroundColor: colorMap[item.name] || "#ccc",
            borderRadius: 4,
            barPercentage: 0.5,
          }));

          const newTableData = series.map((item: Series) => ({
            year: item.name,
            data: item.data.map((d: number) => d.toString()),
          }));

          setData({
            chartData: { labels, datasets: newDatasets },
            tableData: newTableData,
          });
        }
      } catch (err) {
        setError("Gagal mengambil data akumulasi kecelakaan.");
        console.error("Gagal mengambil data akumulasi kecelakaan:", err);
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
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      datalabels: {
        display: false,
      },
      title: {
        display: true,
        text: "Kumulatif Angka Kecelakaan",
        color: "#fff",
        font: {
          size: 18,
          weight: "bold",
        },
        align: "start",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          color: "#fff",
          stepSize: 2,
        },
      },
    },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[250px]">
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
          <Bar data={data.chartData} options={options} />
        </div>
        <div className="mt-3 relative -left-9">
          <table className="text-white text-sm w-full min-w-[740px] border-collapse">
            <thead>
              <tr>
                <th className="p-1 text-left"></th>
                {data.chartData.labels?.map((month, i) => (
                  <th
                    key={i}
                    className="p-1 border-l border-gray-700 text-center"
                  >
                    {String(month)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableData.map((row, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td className="p-1 text-left">{row.year}</td>
                  {row.data.map((val, i) => (
                    <td
                      key={i}
                      className="p-1 border-l border-gray-700 text-center"
                    >
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
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default KumulatifKecelakaanChart;
