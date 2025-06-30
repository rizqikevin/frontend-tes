import React, { useState } from "react";
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
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

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
  date: Date;
  onDateChange: (newDate: Date) => void;
  loading?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  datasets,
  labels,
  date,
  onDateChange,
  loading,
}) => {
  const [tempDate, setTempDate] = useState<Date>(date);

  const handleApply = () => {
    onDateChange(tempDate);
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-xl px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg bg-dashboard-accent">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            <DatePicker
              selected={tempDate}
              onChange={(date: Date) => setTempDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="bg-transparent text-white outline-none"
              calendarClassName="dark-theme-datepicker"
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

      <div className="h-[500px] w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-[300px] text-gray-400">
            Memuat grafik...
          </div>
        ) : (
          <Line
            data={{ labels, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false,
              },
              plugins: {
                legend: {
                  display: true,
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
                  ticks: { color: "#fff" },
                  grid: { color: "#444" },
                },
                y: {
                  beginAtZero: true,
                  ticks: { color: "#fff" },
                  grid: { color: "#444" },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LineChart;
