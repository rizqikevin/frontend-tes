import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const VehichleDougnut = () => {
  const total = 1338;
  const patuh = 1248;
  const tidakPatuh = 500;

  return (
    <div className="bg-[#2b2b2b] rounded-lg p-4 shadow-sm text-white flex flex-col justify-between">
      <div className="flex justify-between mb-4 text-sm font-semibold">
        <span>Semua Golongan</span>
        <span>Hari Ini</span>
      </div>
      <div className="relative w-[350px] h-[350px] mx-auto">
        <Doughnut
          data={{
            labels: ["Patuh", "Tidak Patuh"],
            datasets: [
              {
                data: [patuh, tidakPatuh],
                backgroundColor: ["#4caf50", "#f44336"],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
            },
            cutout: "70%",
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="absolute text-center text-white text-xl font-bold mt-96 left-3/4 m-4 pl-80 -translate-x-1/2 -translate-y-[140%] z-[9999]">
        <p>{total}</p>
        <p className="text-sm">Total Kendaraan</p>
      </div>
      <div className="flex justify-between flex-col text-sm mt-4 gap-2">
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-white">
            <span className="text-lg leading-3 text-green-500">●</span> Patuh
          </span>
          <span className="text-green-500">{patuh}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-white">
            <span className="text-lg leading-3 text-red-500">●</span> Tidak
            Patuh
          </span>
          <span className="text-red-500">{tidakPatuh}</span>
        </div>
      </div>
    </div>
  );
};
