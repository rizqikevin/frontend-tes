import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useDateFilterStore } from "./useDateFilterStore";

interface Dataset {
  type: "bar" | "line";
  label: string;
  data: number[];
}

interface GerbangOdolChartStore {
  title: string;
  labels: string[];
  datasets: Dataset[];
  fetchGerbangOdolChartData: () => Promise<void>;
}

export const useGerbangOdolChartStore = create<GerbangOdolChartStore>(
  (set) => ({
    title: "",
    labels: [],
    datasets: [],
    fetchGerbangOdolChartData: async () => {
      const { start_date, end_date } = useDateFilterStore.getState();
      try {
        const res = await api.get("/odol/chart/gerbang", {
          params: {
            start_time: start_date,
            end_time: end_date,
          },
        });
        const title = res.data?.data?.metadata.title;
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
          title,
        });
      } catch (err) {
        toast.error("Gagal mengambil data chart gerbang");
      }
    },
  })
);
