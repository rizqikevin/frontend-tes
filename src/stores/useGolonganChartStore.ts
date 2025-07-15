import { create } from "zustand";
import { api } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";
import { toast } from "sonner";

interface Dataset {
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface GolonganChartStore {
  chartData: ChartData | null;
  chartTitle: string;
  chartDate: string;
  fetchChartData: () => Promise<void>;
}

export const useGolonganChartStore = create<GolonganChartStore>((set) => ({
  chartData: null,
  chartTitle: "",
  chartDate: "",

  fetchChartData: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();

    try {
      const response = await api.get("/odol/chart/total", {
        params: {
          start_time: start_date,
          end_time: end_date,
        },
      });

      const res = response.data.data;
      console.log(res);

      if (!res || !res.chartData || !Array.isArray(res.chartData.datasets)) {
        throw new Error("Invalid or missing chart data");
      }

      const labels = res.chartData.labels ?? ["Patuh", "Tidak Patuh"];

      const numericDatasets: Dataset[] = res.chartData.datasets.map(
        (ds: any) => ({
          data: ds.data.map((value: string | number) => Number(value)),
        })
      );

      set({
        chartData: {
          labels,
          datasets: numericDatasets,
        },
        chartTitle: res.metadata?.title ?? "Semua Golongan",
        chartDate: res.metadata?.date ?? "-",
      });
    } catch (error) {
      console.error("Gagal mengambil data grafik golongan:", error);
      toast.error("Gagal mengambil data grafik golongan");
    }
  },
}));
