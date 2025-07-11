import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  title: string;
  total: string;
  labels: string[];
  data: number[];
  backgroundColors: string[];
};

export const DoughnutChart = ({
  title,
  total,
  labels,
  data,
  backgroundColors,
}: DoughnutChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "white",
        },
        datalabels: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full h-full">
      <h4 className="text-base font-semibold mb-2">{title}</h4>
      <p className="text-center mt-2 font-semibold">{total}</p>

      <div className="relative w-full h-[250px] sm:h-[233px]">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
