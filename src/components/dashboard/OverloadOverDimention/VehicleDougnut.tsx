import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const VehichleDougnut = () => {
  const patuh = 3543;
  const tidakPatuh = 1543;
  const total = patuh + tidakPatuh;

  const data = {
    labels: ["Patuh", "Tidak Patuh"],
    datasets: [
      {
        data: [patuh, tidakPatuh],
        backgroundColor: ["#4caf50", "#d32f2f"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#fff",
        formatter: (value: number) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value.toLocaleString()}\n(${percentage}%)`;
        },
        anchor: "end",
        align: "start",
        offset: 20,
        clamp: true,
        borderColor: "#fff",
        borderWidth: 1,
        backgroundColor: "transparent",
        font: {
          weight: "bold",
          size: 30,
        },
      },
    },
    cutout: "60%",
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[#2b2b2b] rounded-lg p-4 shadow-sm text-white w-auto flex flex-col justify-between">
      <div className="flex justify-between mb-4 text-sm font-semibold">
        <span>Semua Golongan</span>
        <span>08 July 2025</span>
      </div>
      <div className="relative w-[550px] h-[550px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-row  text-sm mt-4 gap-2 justify-center">
        <span className="flex items-center gap-1 text-white">
          <span className="text-lg leading-3 text-green-500">●</span> Patuh
        </span>
        <span className="flex items-center gap-1 text-white">
          <span className="text-lg leading-3 text-red-500">●</span> Tidak Patuh
        </span>
      </div>
    </div>
  );
};
