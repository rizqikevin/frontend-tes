import { create } from "zustand";
import { api } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";

interface Dataset {
  type: string;
  label: string;
  data: number[];
  percentages: number[];
}

interface ChartDataResponse {
  labels: string[];
  datasets: Dataset[];
}

interface Metadata {
  title: string;
  date: string;
}

interface OdolComparisonState {
  labels: string[];
  odolData: Record<string, number[]>;
  percentages: Record<string, number[]>;
  title: string;
  isloading: boolean;
  fetchOdolData: () => Promise<void>;
}

export const useOdolByGolonganStore = create<OdolComparisonState>((set) => ({
  labels: [],
  odolData: {},
  percentages: {},
  title: "",
  isloading: false,
  fetchOdolData: async () => {
    try {
      set({ isloading: true });
      const { start_date, end_date } = useDateFilterStore.getState();

      const res = await api.get("/odol/chart/persentase", {
        params: {
          start_time: start_date,
          end_time: end_date,
        },
      });

      const response = res.data?.data;
      const chart = response.chartData;
      const rawData = chart.datasets.reduce((acc, ds) => {
        acc[ds.label] = ds.data;
        return acc;
      }, {} as Record<string, number[]>);

      const percents = chart.datasets.reduce((acc, ds) => {
        acc[ds.label] = ds.percentages;
        return acc;
      }, {} as Record<string, number[]>);

      set({
        isloading: false,
        labels: chart.labels,
        odolData: rawData,
        percentages: percents,
        title: response.metadata.title,
      });
    } catch (error) {
      console.error("Failed to fetch ODOL chart data:", error);
    }
  },
}));
