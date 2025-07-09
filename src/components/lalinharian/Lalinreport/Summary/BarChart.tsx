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
import api from "@/services/api";
import { toast } from "sonner";

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
    const value = e.target.value;
    if (!value) {
      // Jika diklik tombol clear, fallback ke hari ini
      const today = new Date();
      setLocalDate(today.toISOString().split("T")[0]);
      onDateChange(today);
    } else {
      setLocalDate(value);
    }
  };

  const handleApply = () => {
    const selected = new Date(localDate);
    onDateChange(selected);
  };

  const handleDownload = async () => {
    try {
      const selected = new Date(localDate);
      const d = selected.getDate().toString().padStart(2, "0");
      const m = (selected.getMonth() + 1).toString().padStart(2, "0");
      const y = selected.getFullYear();

      const response = await api.get(
        `/counting/export-excel/monthly/${d}/${m}/${y}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `monthly_${d}_${m}_${y}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success("Download Berhasil");
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download Excel:", error);
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
            onClick={handleApply}
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
      <div className="overflow-x-auto">
        <div className="min-w-[1200px] h-[600px]">
          <Bar
            data={{ labels, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              datasets: {
                bar: {
                  barThickness: 75,
                  categoryPercentage: 0.6,
                  barPercentage: 0.9,
                },
              },
              plugins: {
                legend: {
                  display: false,
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
                  display: false,
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
      {/* Custom Legend */}
      <div className="flex flex-wrap gap-2 mt-1 justify-center">
        {labels.map((label, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: datasets[0].backgroundColor[i] }}
            />
            <span className="text-xs text-white">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
