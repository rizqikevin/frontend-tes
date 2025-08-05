import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KumulatifKecelakaanChart: React.FC = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "2023",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#22c55e", // hijau
        borderRadius: 4,
        barPercentage: 0.5,
      },
      {
        label: "2024",
        data: [16, 8, 10, 7, 8, 2, 9, 7, 12, 9, 18, 19],
        backgroundColor: "#3b82f6", // biru
        borderRadius: 4,
        barPercentage: 0.5,
      },
      {
        label: "2025",
        data: [12, 10, 11, 15, 16, 7, 7, 0, 0, 0, 0, 0],
        backgroundColor: "#facc15", // kuning
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
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

  const tableData = [
    {
      year: 2023,
      data: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      year: 2024,
      data: ["16", "8", "10", "7", "8", "2", "9", "7", "12", "9", "18", "19"],
    },
    {
      year: 2025,
      data: ["12", "10", "11", "15", "16", "7", "7", "0", "0", "0", "0", "0"],
    },
  ];

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg h-full w-full">
      <Bar data={data} options={options} width={500} height={250} />
      <div className="mt-3 relative -left-9">
        <table className="text-white text-sm w-full min-w-[740px] border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left"></th>
              {labels.map((month, i) => (
                <th
                  key={i}
                  className="p-2 border-l border-gray-700 text-center"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="p-2 text-left">{row.year}</td>
                {row.data.map((val, i) => (
                  <td
                    key={i}
                    className="p-2 border-l border-gray-700 text-center"
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
