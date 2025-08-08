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
import axios from "axios";
import { api2 } from "@/services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KumulatifKecelakaanChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [tableData, setTableData] = useState<
    { year: string; data: string[] }[]
  >([]);

  const fetchChartData = async () => {
    try {
      const res = await api2.get(
        "/ticket/list_kecelakaan/chart/accumulation?start_year=2022&end_year=2025"
      );
      const { data } = res.data;

      if (data && data.labels && data.series) {
        setLabels(data.labels);

        const colorMap: Record<string, string> = {
          "2022": "#6b7280", // abu
          "2023": "#22c55e", // hijau
          "2024": "#3b82f6", // biru
          "2025": "#facc15", // kuning
        };

        const newDatasets = data.series.map((item: any) => ({
          label: item.name,
          data: item.data,
          backgroundColor: colorMap[item.name] || "#ccc",
          borderRadius: 4,
          barPercentage: 0.5,
        }));

        const newTableData = data.series.map((item: any) => ({
          year: item.name,
          data: item.data.map((d: number) => d.toString()),
        }));

        setDatasets(newDatasets);
        setTableData(newTableData);
      }
    } catch (error) {
      console.error("Gagal mengambil data akumulasi kecelakaan:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchChartData();
    };
    fetchData();
  }, []);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
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
        text: "KUMULATIF ANGKA KECELAKAAN",
        color: "#fff",
        font: {
          size: 16,
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

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
      <Bar data={chartData} options={options} width={500} height={170} />
      <div className="mt-3 relative -left-9">
        <table className="text-white text-sm w-full min-w-[740px] border-collapse">
          <thead>
            <tr>
              <th className="p-1 text-left"></th>
              {labels.map((month, i) => (
                <th
                  key={i}
                  className="p-1 border-l border-gray-700 text-center"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
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
    </div>
  );
};

export default KumulatifKecelakaanChart;
