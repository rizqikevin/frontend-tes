import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { KecelakaanBarChartTime } from "./KecelakaanBarChartTime";
import KumulatifKecelakaanChart from "./KumulatifKecelakaanChart";
import { api2 } from "@/services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const KecelakaanPieChart: React.FC = () => {
  const [faktorData, setFaktorData] = useState<number[]>([]);
  const [faktorLabels, setFaktorLabels] = useState<string[]>([]);
  const [faktorTotal, setFaktorTotal] = useState<number>(0);

  useEffect(() => {
    const fetchFaktorData = async () => {
      try {
        const res = await api2.get("/ticket/list_kecelakaan/chart?by=factor");
        const data = res.data.data;

        const labels = data.map((item: any) => item.name);
        const counts = data.map((item: any) => item.count);
        const total = counts.reduce((acc: number, val: number) => acc + val, 0);

        setFaktorLabels(labels);
        setFaktorData(counts);
        setFaktorTotal(total);
      } catch (error) {
        console.error("Gagal mengambil data faktor kecelakaan:", error);
      }
    };

    fetchFaktorData();
  }, []);

  const faktorKecelakaanData = {
    labels: faktorLabels,
    datasets: [
      {
        label: "Faktor Kecelakaan",
        data: faktorData,
        backgroundColor: ["#3b82f6", "#06b6d4", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const jenisKecelakaanData = {
    labels: ["Tunggal (20)", "Ganda (2)"],
    datasets: [
      {
        label: "Jenis Kecelakaan",
        data: [20, 2],
        backgroundColor: ["#2563eb", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
        },
      },
      datalabels: {
        display: true,
        color: "#fff",
        formatter: (value: number) => value.toLocaleString("id-ID"),
        anchor: "center",
        align: "center",
        offset: 20,
        font: {
          weight: "bold",
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: "70%",
  };

  const options2: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
        },
      },
      datalabels: {
        display: true,
        color: "#fff",
        formatter: (value: number) => value.toLocaleString("id-ID"),
        anchor: "end",
        align: "start",
        offset: 20,
        font: {
          weight: "bold",
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="relative p-0 w-full">
      <div className="bg-[#2b2a2a] flex flex-col items-center p-6 text-white rounded-lg w-full h-[350px]">
        <div className="flex mb-2 ml-auto justify-end rounded-lg">
          <Select>
            <SelectTrigger className="bg-dashboard-accent">
              <SelectValue placeholder="Bulanan" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-accent">
              <SelectItem value="januari">Januari</SelectItem>
              <SelectItem value="februari">Februari</SelectItem>
              <SelectItem value="maret">Maret</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="mei">Mei</SelectItem>
              <SelectItem value="juni">Juni</SelectItem>
              <SelectItem value="juli">Juli</SelectItem>
              <SelectItem value="agustus">Agustus</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="oktober">Oktober</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="desember">Desember</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row gap-2">
          {/* Faktor Kecelakaan */}
          <div className="bg-dashboard-accent p-6 rounded-xl shadow-md w-full h-[260px] flex flex-col items-center">
            <div className="relative -left-20">
              <h2 className="mb-3 font-semibold">FAKTOR KECELAKAAN</h2>
            </div>

            <div className="relative -top-16 w-80 h-80">
              <Doughnut data={faktorKecelakaanData} options={options} />
              <div className="absolute inset-0 flex items-center left-36 transform -translate-x-1/2 text-3xl font-bold">
                {faktorTotal}
              </div>
            </div>
          </div>

          {/* Jenis Kecelakaan */}
          <div className="bg-dashboard-accent p-6 rounded-xl shadow-md w-full h-[260px] flex flex-col items-center">
            <div className="relative -left-20">
              <h2 className="mb-3 font-semibold">JENIS KECELAKAAN</h2>
            </div>

            <div className="relative -top-16 w-80 h-80">
              <Pie data={jenisKecelakaanData} options={options2} />
            </div>
          </div>
        </div>
      </div>
      {/* GRAFIK PER RENTAN WAKTU KEJADIAN */}
      <div className="bg-dashboard-accent p-6 rounded-xl shadow-md w-full flex flex-col items-center mt-4 ">
        <KecelakaanBarChartTime />
      </div>
      {/* GRAFIK KUMULATIF KECELAKAAN */}
      <div className="bg-dashboard-accent p-6 rounded-xl shadow-md w-full flex flex-col items-center mt-4">
        <KumulatifKecelakaanChart />
      </div>
    </div>
  );
};

export default KecelakaanPieChart;
