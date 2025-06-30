import { create } from "zustand";
import api from "@/services/api";

interface AQIRow {
  sensor_number: number;
  sensor_name: string;
  sensor_type: number;
  co: string;
  o3: string;
  so2: string;
  no2: string;
  co2: string;
  o2: string;
  pm25: string;
  pm10: string;
  tsp: string;
  suhu: string;
  humidity: string;
  ispu: string;
  tgl: string;
}

interface AqiState {
  data: AQIRow[];
  total: number;
  loading: boolean;
  page: number;
  limit: number;
  time: string;
  fetchAQI: () => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTime: (time: string) => void;
}

export const useAqiStore = create<AqiState>((set, get) => ({
  data: [],
  total: 0,
  loading: false,
  page: 1,
  limit: 10,
  time: "2025-06-16",

  fetchAQI: async () => {
    const { page, limit, time } = get();
    set({ loading: true });
    try {
      const res = await api.get("/sensor/aqi", {
        params: { page, limit, time, sensor_number: 1 },
      });
      set({
        data: res.data.data.rows || [],
        total: parseInt(res.data.data.total || "0"),
      });
    } catch (err) {
      console.error("Gagal ambil AQI:", err);
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setTime: (time) => set({ time }),
}));
