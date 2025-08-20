import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useGolonganChartStore } from "@/stores/useGolonganChartStore";
import { useEffect } from "react";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VehicleSummaryPanel } from "./VehicleSummaryPanel";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const VehichleDougnut = () => {
  const { fetchChartData, chartData, chartTitle, chartDate } =
    useGolonganChartStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    const fetchAll = async () => {
      await fetchChartData();
    };
    fetchAll();
  }, [start_date, end_date]);

  if (!chartData || chartData.datasets.length === 0) {
    return (
      <div className="w-full text-center text-white py-10">
        Memuat data grafik...
      </div>
    );
  }

  const rawData = chartData.datasets[0].data.map(Number);
  const total = rawData.reduce((sum, val) => sum + val, 0);
  const fallbackData = [1, 1];
  const displayData = total === 0 ? fallbackData : rawData;

  const data = {
    labels: chartData.labels ?? ["Patuh", "Tidak Patuh"],
    datasets: [
      {
        data: displayData,
        backgroundColor: ["#4caf50", "#d32f2f"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
        color: "#fff",
        formatter: (_value, context) => {
          const index = context.dataIndex;
          const actual = rawData[index] ?? 0;
          const percentage =
            total > 0 ? ((actual / total) * 100).toFixed(1) : "0.0";
          return `${actual.toLocaleString()}\n(${percentage}%)`;
        },
        anchor: "end",
        align: "start",
        offset: 20,
        font: {
          weight: "bold",
          size: 20,
        },
      },
    },
    cutout: "60%",
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 shadow-sm text-white w-auto h-auto flex flex-col justify-between border-r-2 border-gray-500">
      <div className="flex justify-between mb-4 text-xl font-semibold">
        <span>Daily</span>
        {/* <span className="text-sm text-gray-400">{chartDate || "-"}</span> */}
      </div>
      <div className="relative w-[200px] h-[200px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-row items-center text-sm mt-4 gap-2 justify-center">
        <span className="flex text-xs items-center gap-1 text-white">
          <span className=" leading-3 text-green-500">●</span> Patuh
        </span>
        <span className="flex  text-xs items-center gap-1 text-white">
          <span className="leading-3 text-red-500">●</span>Tidak Patuh
        </span>
        {/* <Link to={"/odol"} className="ml-auto">
          <Button className="text-xs text-ri text-white bg-dashboard-accent  shadow-sm hover:bg-blue-600 px-3 py-1 rounded-md flex items-center gap-1">
            <span className="font-semibold">Selengkapnya</span>
          </Button>
        </Link> */}
      </div>
    </div>
  );
};
