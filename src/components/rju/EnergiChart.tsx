import { Bar } from "react-chartjs-2";

const data = {
  labels: [
    "19/02",
    "20/02",
    "21/02",
    "22/02",
    "23/02",
    "24/02",
    "25/02",
    "26/02",
  ],
  datasets: [
    {
      label: "Energy (kWh)",
      data: [50, 490, 450, 300, 200, 100, 200, 499],
      backgroundColor: "#f59e0b",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    datalabels: { display: false },
  },
};

export default function EnergyChart() {
  return <Bar data={data} options={options} />;
}
