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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const tanggal = [];
for (let i = 1; i <= 7; i++) {
  tanggal.push(i);
}

console.log(tanggal);

const BebanRuasChart = () => {
  const data = {
    labels: ["01/07", "02/07", "03/07", "04/07", "05/07", "06/07"],
    datasets: [
      {
        label: "Traffic",
        data: [4200, 3040, 3000, 8900, 1000, 4940, 9000],
        borderColor: "#ffff00",
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
    },
    scales: {
      y: { ticks: { color: "#cbd5e1" } },
      x: { ticks: { color: "#cbd5e1" } },
    },
  };

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Beban Ruas Harian</h2>
      <div className="w-full h-[270px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BebanRuasChart;
