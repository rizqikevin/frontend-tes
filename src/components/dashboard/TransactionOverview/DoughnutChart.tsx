import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  title: string;
  total: string;
  labels: string[];
  data: number[];
  backgroundColors: string[];
  bars?: {
    label: any;
    value: any;
    color: string;
  }[];
};

export const DoughnutChart = ({
  title,
  total,
  labels,
  data,
  backgroundColors,
  bars = [],
}: DoughnutChartProps) => {
  const adjustedData = data.map((val) => (val === 0 ? 0.0001 : val));

  const chartData = {
    labels,
    datasets: [
      {
        data: adjustedData,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className=" text-white p-6 w-full h-full border-r-2 border-gray-600 ">
      <h4 className="text-base font-semibold mb-3">{title}</h4>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Chart */}
        <div className="relative sm:w-[220px] w-[250px] h-[300px] sm:h-[260px] mx-auto">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {total.split(" ").slice(1).join(" ")}%
              </p>
              <p className="text-2xl ">{total.split(" ")[0]}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center gap-2">
          {labels.map((label, idx) => (
            <div
              key={idx}
              className="flex items-center text-white gap-2 sm:text-xs"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: backgroundColors[idx] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Bars */}
      <div className="mt-6 space-y-4">
        {bars.map((bar, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${bar.value}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
