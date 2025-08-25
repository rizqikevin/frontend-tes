import { create } from "zustand";
import api from "@/services/api";

interface PdbHistoryData {
  energy: string;
  avg_frequency: string;
  avg_energy_perhour: string;
  beban_puncak: string;
}

interface PdbHistoryState {
  data: PdbHistoryData | null;
  loading: boolean;
  error: string | null;

  time: Date;
  sensorName: string;

  // actions
  setTime: (time: Date) => void;
  setSensorName: (name: string) => void;
  fetchData: () => Promise<void>;
}

export const usePdbHistoryStore = create<PdbHistoryState>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  // default filters
  time: new Date(),
  sensorName: "",

  setTime: (time) => set({ time }),
  setSensorName: (name) => set({ sensorName: name }),

  fetchData: async () => {
    set({ loading: true, error: null });
    const { sensorName, time } = get();

    try {
      const res = await api.get("/sensor/pdb/history", {
        params: { time: time, sensor_name: sensorName },
      });

      console.log(res.data.data);

      if (res.data.status === "success") {
        set({ data: res.data?.data, loading: false });
      } else {
        set({ error: "Invalid response format", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "Request failed", loading: false });
    }
  },
}));
