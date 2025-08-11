import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  title: string;
  total: string;
  labels: string[];
  data: number[];
  backgroundColors: string[];
  bars?: {
    label: string;
    value: number;
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

  const [labelText, percentText] = total.split(" ");

  return (
    <div className="text-white pr-5 w-full h-full border-r-2 border-gray-600">
      <h4 className="text-lg font-semibold">{title}</h4>

      <div className="flex flex-col lg:flex-row justify-start gap-2  w-full transition-all duration-300">
        {/* Chart + Legend */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Doughnut Chart */}
          <div className="relative w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] lg:w-[320px] lg:h-[320px]">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center leading-tight">
                <p className="text-3xl font-bold">{percentText}%</p>
                <p className="text-xl">{labelText}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-6 text-xs sm:text-sm">
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-center text-white gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: backgroundColors[idx] }}
                />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Bars di kanan */}
        <div className="flex flex-col justify-center relative bottom-11 gap-6 flex-1 transition-all duration-300">
          {bars.map((bar, idx) => (
            <div key={idx} className="w-full">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="truncate max-w-[50%]">{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500"
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
    </div>
  );
};
