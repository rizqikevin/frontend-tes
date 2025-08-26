import { create } from "zustand";
import api from "@/services/api";
import { toast } from "sonner";

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

interface OptionsSensor {
  sensor_name: string;
}

interface FloodEvent {
  id: string;
  sensor: string;
  mulai: string;
  selesai: string;
  durasi: string;
  puncak: string;
  zona: string;
  rate: string;
  rapid: string;
}

type ChartType = "level_air" | "rate";

interface FloodChartState {
  data: Record<ChartType, ChartResponse>;
  fetchChartData: (type: ChartType) => Promise<void>;
  optionsSensor: OptionsSensor[];
  sensorName: string;
  setSensorName: (sensorName: string) => void;
  fetchOptionsData: () => Promise<void>;
  events: FloodEvent[];
  fetchEvents: () => Promise<void>;
}

export const useChartFloodStore = create<FloodChartState>((set, get) => ({
  optionsSensor: [],
  sensorName: "Flood_Sensor_1",
  setSensorName: (sensorName) => set({ sensorName }),
  fetchOptionsData: async () => {
    try {
      const res = await api.get("/sensor/flood/name");
      set({ optionsSensor: res.data.data });
    } catch (error) {
      toast.error("Failed to fetch sensor options");
      console.error(error);
    }
  },

  data: {
    level_air: {
      labels: [],
      datasets: [],
      metadata: {
        title: "Level Air",
      },
    },
    rate: {
      labels: [],
      datasets: [],
      metadata: {
        title: "Rate",
      },
    },
  },
  fetchChartData: async (type: ChartType) => {
    const sensor_name = get().sensorName;
    if (!sensor_name) return;
    try {
      const res = await api.get(`sensor/flood/chart/${type}`, {
        params: {
          sensor_name: sensor_name,
        },
      });
      set((state) => ({ data: { ...state.data, [type]: res.data?.data } }));
    } catch (error) {
      toast.error(`Failed to fetch chart data for ${type}`);
      console.error(error);
    }
  },
  events: [],
  fetchEvents: async () => {
    const sensor_name = get().sensorName;
    if (!sensor_name) return;
    try {
      const res = await api.get("/sensor/flood/events", {
        params: {
          sensor_name: sensor_name,
        },
      });
      set({ events: res.data.data });
    } catch (error) {
      toast.error("Failed to fetch flood events");
      console.error(error);
    }
  },
}));
