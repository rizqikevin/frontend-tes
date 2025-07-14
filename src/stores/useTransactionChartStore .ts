import { create } from "zustand";
import { api3 } from "@/services/api";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

interface ChartResponse {
  title: string;
  labels: string[];
  series: {
    label: string;
    backgroundColor: string;
    data: number[];
  }[];
}

type ChartType = "lhr" | "revenue";
type TargetType = "1" | "2" | "3";

interface TransactionChartState {
  chartData: Record<ChartType, Record<TargetType, ChartResponse>>;
  fetchChartData: (type: ChartType, target_type: TargetType) => Promise<void>;
}

export const useTransactionChartStore = create<TransactionChartState>(
  (set, get) => ({
    chartData: {
      lhr: {
        "1": { title: "", labels: [], series: [] },
        "2": { title: "", labels: [], series: [] },
        "3": { title: "", labels: [], series: [] },
      },
      revenue: {
        "1": { title: "", labels: [], series: [] },
        "2": { title: "", labels: [], series: [] },
        "3": { title: "", labels: [], series: [] },
      },
    },

    fetchChartData: async (type, target_type) => {
      const start = useDateFilterStore
        .getState()
        .startDate.toISOString()
        .split("T")[0];
      const end = useDateFilterStore
        .getState()
        .endDate.toISOString()
        .split("T")[0];

      try {
        const res = await api3.get("/tracomm/transaction/graph/compare", {
          params: { start_date: start, end_date: end, type, target_type },
        });

        const data = res.data?.data;
        if (!data || !Array.isArray(data.series)) return;
        console.log("Fetched data", data);

        set((state) => ({
          chartData: {
            ...state.chartData,
            [type]: {
              ...state.chartData[type],
              [target_type]: data,
            },
          },
        }));
      } catch (err) {
        console.error(
          `Error fetching chart data for ${type}-${target_type}`,
          err
        );
      }
    },
  })
);
