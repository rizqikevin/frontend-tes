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
import axios from "axios";
import { api2 } from "@/services/api";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const KecelakaanBarChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await api2.get(
          "/ticket/list_kecelakaan/chart/by/class?frequency=monthly"
        );
        const responseData = res.data.data;

        if (responseData && responseData.labels && responseData.series) {
          setLabels(responseData.labels);

          const colorMap: Record<string, string> = {
            "Golongan 1": "#3b82f6",
            "Golongan 2": "#ef4444",
            "Golongan 3": "#6b7280",
            "Golongan 4": "#f59e0b",
            "Golongan 5": "#22c55e",
          };

          const mappedDatasets = responseData.series.map((item: any) => ({
            label: item.name,
            data: item.data,
            backgroundColor: colorMap[item.name] || "#ccc",
            borderRadius: 6,
            barThickness: 10,
          }));

          setDatasets(mappedDatasets);
        }
      } catch (error) {
        console.error("Gagal mengambil data grafik golongan:", error);
      }
    };

    fetchChartData();
  }, []);

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
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
          stepSize: 1,
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
        DATA KECELAKAAN PER GOLONGAN
      </h2>
      <Chart type="bar" data={chartData} options={options} height={287} />
    </div>
  );
};

export default KecelakaanBarChart;
