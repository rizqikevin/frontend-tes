import { create } from "zustand";
import { api } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";
import { toast } from "sonner";

interface OdolComparisonStore {
  labels: string[];
  odolData: number[];
  fetchOdolData: () => Promise<void>;
}

export const useOdolComparisonStore = create<OdolComparisonStore>((set) => ({
  labels: [],
  odolData: [],

  fetchOdolData: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();

    try {
      const res = await api.get("/odol/chart/golongan", {
        params: {
          start_time: start_date,
          end_time: end_date,
        },
      });

      const result = res.data?.data;

      if (!result || !result.chartData) {
        throw new Error("Invalid chart data");
      }

      const labels = result.chartData.labels ?? [];
      const rawData = result.chartData.datasets?.[0]?.data ?? [];
      const odolData = rawData.map((v: string | number) => Number(v));

      set({ labels, odolData });
    } catch (err) {
      console.error("Gagal mengambil data ODOL golongan:", err);
      toast.error("Gagal mengambil data ODOL golongan");
    }
  },
}));
