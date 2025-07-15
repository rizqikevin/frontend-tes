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
      const { start_date, end_date } = useDateFilterStore.getState();

      try {
        const res = await api3.get("/tracomm/transaction/graph/compare", {
          params: { start_date, end_date, type, target_type },
        });

        const raw = res.data?.data;
        if (!raw || !Array.isArray(raw.series)) return;

        const colorPalette = [
          "#42A5F5",
          "#FFEB3B",
          "#4CAF50",
          "#E91E63",
          "#9C27B0",
          "#00BCD4",
          "#FF9800",
          "#8BC34A",
          "#795548",
          "#607D8B",
        ];

        const monthShortMap: Record<string, string> = {
          January: "Jan",
          February: "Feb",
          March: "Mar",
          April: "Apr",
          May: "May",
          June: "Jun",
          July: "Jul",
          August: "Aug",
          September: "Sep",
          October: "Oct",
          November: "Nov",
          December: "Dec",
        };

        const shortLabels = raw.label.map(
          (month: string) => monthShortMap[month] || month
        );

        const mappedSeries = raw.series.map((item: any, index: number) => ({
          label: item.title || `Series ${index + 1}`,
          backgroundColor: colorPalette[index % colorPalette.length],
          data: item.data ?? [],
        }));

        const mappedData: ChartResponse = {
          title: raw.title || "",
          labels: shortLabels,
          series: mappedSeries,
        };

        set((state) => ({
          chartData: {
            ...state.chartData,
            [type]: {
              ...state.chartData[type],
              [target_type]: mappedData,
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
