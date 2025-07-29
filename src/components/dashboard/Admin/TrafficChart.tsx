import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "@/services/api";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const TrafficChart = () => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await api.get("/cctv/chart");
        const result = res.data?.result?.data;
        setChartLabels(result.labels || []);
        setChartData(result.data || []);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Traffic",
        data: chartData,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
    },
    scales: {
      y: { ticks: { color: "#cbd5e1" } },
      x: { ticks: { color: "#cbd5e1" } },
    },
  };

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 text-white w-full max-h-[400px]">
      <h2 className="text-lg font-semibold mb-4">Traffic Harian</h2>
      <div className="w-full h-[240px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TrafficChart;
