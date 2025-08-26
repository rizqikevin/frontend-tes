import { create } from "zustand";
import { api } from "@/services/api";
import { usePdbHistoryStore } from "./useStatsCardPdbStore";

interface ChartResponse {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
  metadata: {
    title: string;
  };
}

type ChartType =
  | "active_power"
  | "tegangan"
  | "active_power_weekly"
  | "active_power_monthly"
  | "power_factor"
  | "frequency"
  | "tegangan_per_fasa"
  | "arus_per_fasa";

interface BebanActivePowerState {
  data: Record<ChartType, ChartResponse>;
  fetchChartData: (type: ChartType) => Promise<void>;
}

export const useBebanActiveStore = create<BebanActivePowerState>(
  (set, get) => ({
    data: {
      active_power: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      tegangan: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      active_power_weekly: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      active_power_monthly: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      power_factor: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      frequency: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      tegangan_per_fasa: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
      arus_per_fasa: {
        labels: [],
        datasets: [],
        metadata: {
          title: "",
        },
      },
    },
    fetchChartData: async (type: ChartType) => {
      const { sensorName } = usePdbHistoryStore.getState();
      const res = await api.get(`/sensor/pdb/chart/${type}`, {
        params: {
          sensor_name: sensorName,
          points: 10,
        },
      });
      set({ data: { ...get().data, [type]: res.data?.data } });
    },
  })
);
