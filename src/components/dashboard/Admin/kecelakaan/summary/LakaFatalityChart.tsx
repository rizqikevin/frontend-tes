import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { api2 } from "@/services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Series {
  name: "accidents" | "fatalities";
  data: number[];
}

export const LakaFatalityChart: React.FC = () => {
  const [chartData, setChartData] = useState<
    ChartData<"line", number[], string>
  >({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api2.get(
          "/ticket/list_kecelakaan/chart/by/fatalities?frequency=monthly"
        );
        const response = res.data.data;

        const labels = response.labels;
        const series: Series[] = response.series;

        const accidentsData = series.find((s) => s.name === "accidents")?.data;
        const fatalitiesData = series.find(
          (s) => s.name === "fatalities"
        )?.data;

        if (!accidentsData || !fatalitiesData) {
          throw new Error("Format data tidak valid dari API.");
        }

        setChartData({
          labels,
          datasets: [
            {
              label: "Tingkat Kecelakaan",
              data: accidentsData,
              fill: true,
              borderColor: "#3b82f6",
              backgroundColor: (ctx) => {
                const chart = ctx.chart;
                const { ctx: canvas } = chart;
                const gradient = canvas.createLinearGradient(
                  0,
                  0,
                  0,
                  chart.height
                );
                gradient.addColorStop(0, "rgba(59,130,246,0.3)");
                gradient.addColorStop(1, "rgba(59,130,246,0)");
                return gradient;
              },
              tension: 0.4,
              pointRadius: 0,
            },
            {
              label: "Tingkat Fatality",
              data: fatalitiesData,
              fill: true,
              borderColor: "#ef4444",
              backgroundColor: (ctx) => {
                const chart = ctx.chart;
                const { ctx: canvas } = chart;
                const gradient = canvas.createLinearGradient(
                  0,
                  0,
                  0,
                  chart.height
                );
                gradient.addColorStop(0, "rgba(239,68,68,0.3)");
                gradient.addColorStop(1, "rgba(239,68,68,0)");
                return gradient;
              },
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        });
      } catch (err) {
        setError("Gagal mengambil data grafik silahkan coba lagi.");
        console.error("Gagal mengambil data grafik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
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
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true,
      },
    },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[440px]">
          <p className="text-white">Memuat data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="relative h-[440px]">
          <Line data={chartData} options={options} />
        </div>
        {/* <div className="mt-6">
          <table className="relative -left-10 w-full min-w-[760px] text-sm text-white border-collapse">
            <thead>
              <tr className="text-white text-sm">
                <th className="p-1 text-left">Jenis</th>
                {chartData.labels?.map((label, index) => (
                  <th
                    key={index}
                    className="p-1 border-l border-gray-700 text-left"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-white text-sm">
                <td className="p-1 text-left">Tingkat Laka</td>
                {chartData.datasets[0]?.data.map((value, index) => (
                  <td
                    key={index}
                    className="py-0 pl-0 text-left border-b border-gray-600"
                  >
                    {value}
                  </td>
                ))}
              </tr>
              <tr className="text-white text-sm">
                <td className="p-1 text-left">Tingkat Fatality</td>
                {chartData.datasets[1]?.data.map((value, index) => (
                  <td
                    key={index}
                    className="py-0 pl-0 text-left border-b border-gray-600"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div> */}
      </>
    );
  };

  return (
    <div className="bg-dashboard-accent p-10 rounded-lg h-full w-full flex flex-col">
      <h2 className="text-lg mb-2 font-semibold text-white shrink-0">
        Tingkat Laka & Fatality
      </h2>
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default LakaFatalityChart;
