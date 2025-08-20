import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import api from "@/services/api";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface statusDougnutProps {
  title: string;
  start?: string;
  end?: string;
}

export const StatusDougnut: React.FC<statusDougnutProps> = ({
  title,
  start,
  end,
}) => {
  const [dataApi, setDataApi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("start", start);
  console.log("end", end);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/odol/status", {
          params: {
            start_time: start,
            end_time: end,
          },
        });
        setDataApi(res.data.data[0]);
      } catch (err) {
        console.error("Error fetching ODOL data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center text-white py-10">
        Memuat data grafik...
      </div>
    );
  }

  if (!dataApi) {
    return (
      <div className="w-full text-center text-white py-10">
        Tidak ada data tersedia
      </div>
    );
  }

  const totalNormal = Number(dataApi.total_normal || 0);
  const totalOdol = Number(dataApi.total_odol || 0);
  const totalOd = Number(dataApi.total_od || 0);
  const totalOl = Number(dataApi.total_ol || 0);
  const total = Number(dataApi.total || 0);

  const patuh = totalNormal;
  const tidakPatuh = totalOdol + totalOd + totalOl;

  const percentagePatuh =
    total > 0 ? ((patuh / total) * 100).toFixed(1) : "0.0";
  const percentageTidakPatuh =
    total > 0 ? ((tidakPatuh / total) * 100).toFixed(1) : "0.0";

  // data chart
  const data = {
    labels: ["Normal", "ODOL", "OD", "OL"],
    datasets: [
      {
        data: [totalNormal, totalOdol, totalOd, totalOl],
        backgroundColor: ["#4caf50", "#d32f2f", "#fbc02d", "#ff9800"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
    },
    cutout: "55%",
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-dashboard-accent  rounded-lg p-4 shadow-sm text-white w-auto h-auto flex flex-col border border-gray-700">
      {/* Title */}
      <div className="flex justify-between mb-4 text-xl font-semibold">
        <span>{title}</span>
      </div>

      {/* Chart + Legend */}
      <div className="flex justify-center items-center gap-6 mt-2">
        {/* Chart */}
        <div className="relative w-[150px] h-[150px]">
          <Doughnut data={data} options={options} />
        </div>

        {/* Legend */}
        <div className="flex flex-col items-start text-sm gap-2">
          <span className="flex items-center gap-2 text-white">
            <span className="text-green-400">●</span> Normal
          </span>
          <span className="flex items-center gap-2 text-white">
            <span className="text-red-500">●</span> ODOL
          </span>
          <span className="flex items-center gap-2 text-white">
            <span className="text-yellow-400">●</span> OD
          </span>
          <span className="flex items-center gap-2 text-white">
            <span className="text-orange-500">●</span> OL
          </span>
        </div>
      </div>

      {/* Total Kendaraan */}
      <div className="mt-6 border-t border-gray-600 pt-4">
        <p className="text-sm">Total Kendaraan</p>
        <p className="text-lg font-bold">{total.toLocaleString()} Kendaraan</p>
      </div>

      {/* Patuh vs Tidak Patuh */}
      <div className="flex justify-between mt-4 border-t border-gray-600 pt-4">
        <div className="flex-1 text-center border-r border-gray-600">
          <p className="text-xs text-gray-300">Patuh</p>
          <p className="font-semibold">
            {patuh.toLocaleString()} ({percentagePatuh}%)
          </p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-xs text-gray-300">Tidak Patuh</p>
          <p className="font-semibold">
            {tidakPatuh.toLocaleString()} ({percentageTidakPatuh}%)
          </p>
        </div>
      </div>
    </div>
  );
};
