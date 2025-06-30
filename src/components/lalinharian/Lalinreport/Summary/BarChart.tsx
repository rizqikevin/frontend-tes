import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  Title
);

interface BarChartProps {
  title: string;
  datasets: any[];
  labels: string[];
  date: Date;
  onDateChange: (date: Date) => void;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  labels,
  datasets,
  date,
  onDateChange,
}) => {
  const [localDate, setLocalDate] = useState<string>(
    date.toISOString().split("T")[0]
  );

  // Sync jika parent mengubah date
  useEffect(() => {
    setLocalDate(date.toISOString().split("T")[0]);
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDate(e.target.value);
  };

  const handleApply = () => {
    const selected = new Date(localDate);
    onDateChange(selected);
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-xl px-6 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            <input
              type="date"
              value={localDate}
              onChange={handleDateChange}
              className="bg-transparent outline-none text-white"
            />
          </div>
          <Button
            onClick={handleApply}
            className="bg-white text-black px-3 py-1 rounded text-sm"
          >
            Terapkan
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px] h-[600px]">
          <Bar
            data={{ labels, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              datasets: {
                bar: {
                  barThickness: 50,
                  categoryPercentage: 0.6,
                  barPercentage: 0.9,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    color: "white",
                    boxWidth: 12,
                    padding: 12,
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                x: {
                  ticks: { color: "white" },
                  grid: { color: "#444" },
                },
                y: {
                  beginAtZero: true,
                  ticks: { color: "white" },
                  grid: { color: "#444" },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
