import React, { useState, useEffect } from "react";
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
import api from "@/services/api";
import { toast } from "sonner";

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
  onDateChange: (date: Date) => void;
  onApply: () => void;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  datasets,
  labels,
  date,
  onDateChange,
  onApply,
}) => {
  const [localDate, setLocalDate] = useState<string>(
    date.toISOString().split("T")[0]
  );

  // Sync jika parent date berubah
  useEffect(() => {
    setLocalDate(date.toISOString().split("T")[0]);
  }, [date]);

  const handleDownload = async () => {
    try {
      const selected = new Date(localDate);
      const d = selected.getDate().toString().padStart(2, "0");
      const m = (selected.getMonth() + 1).toString().padStart(2, "0");
      const y = selected.getFullYear();

      const response = await api.get(
        `/counting/export-excel/daily/${d}/${m}/${y}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `daily_${d}_${m}_${y}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success("Download Berhasil");
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download Excel:", error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      const today = new Date();
      setLocalDate(today.toISOString().split("T")[0]);
      onDateChange(today);
    } else {
      setLocalDate(value);
      const selected = new Date(value);
      if (!isNaN(selected.getTime())) {
        onDateChange(selected);
      }
    }
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-xl px-6 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex items-center border border-gray-400 px-2 py-2 rounded-lg">
            <input
              type="date"
              value={localDate}
              onChange={handleDateChange}
              className="bg-transparent outline-none text-white"
            />
          </div>
          <Button
            onClick={onApply}
            className="bg-white text-black px-3 py-1 rounded text-sm"
          >
            Terapkan
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Download Excel
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
      </div>
    </div>
  );
};

export default LineChart;
