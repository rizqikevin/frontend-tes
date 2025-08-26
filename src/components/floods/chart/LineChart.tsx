import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

interface LineChartProps {
  title: string;
  datasets: any[];
  labels: string[];
  showLegends?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ title, datasets, labels, showLegends = false }) => {
  return (
    <div className="w-full bg-dashboard-accent text-white rounded-xl px-6 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            <span>27 - February - 2025</span>
          </div>
          <Button className="bg-white text-black px-3 py-1 rounded text-sm">
            Terapkan
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[500px] w-full overflow-x-auto">
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index" as const,
              intersect: false,
            },
            plugins: {
              legend: {
                display: showLegends,
                position: "bottom",
                labels: {
                  color: "#fff",
                  boxWidth: 14,
                  padding: 16,
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#fff",
                  maxRotation: 0,
                  autoSkip: true,
                },
                grid: {
                  color: "#444",
                },
              },
              y: {
                ticks: {
                  color: "#fff",
                  beginAtZero: true as any,
                } as any,
                grid: {
                  color: "#444",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
