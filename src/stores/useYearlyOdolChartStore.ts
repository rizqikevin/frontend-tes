import { create } from "zustand";
import { api } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";
import { toast } from "sonner";

interface Dataset {
  type: "bar" | "line";
  label: string;
  data: number[];
}

interface YearlyOdolChartStore {
  labels: string[];
  datasets: Dataset[];
  fetchYearlyChartData: () => Promise<void>;
}

export const useYearlyOdolChartStore = create<YearlyOdolChartStore>((set) => ({
  labels: [],
  datasets: [],

  fetchYearlyChartData: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();
    try {
      const res = await api.get("/odol/chart/yearly", {
        params: {
          start_time: start_date,
          end_time: end_date,
        },
      });

      const chartData = res.data?.data?.chartData;
      if (!chartData) throw new Error("Invalid chart data");

      const parsedDatasets = chartData.datasets.map((ds: any) => ({
        type: ds.type,
        label: ds.label,
        data: ds.data.map((v: string | number) => Number(v)),
      }));

      set({
        labels: chartData.labels,
        datasets: parsedDatasets,
      });
    } catch (err) {
      console.error("Gagal mengambil data yearly:", err);
      toast.error("Gagal mengambil data chart tahunan");
    }
  },
}));
