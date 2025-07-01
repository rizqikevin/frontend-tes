import api from "@/services/api";
import { create } from "zustand";

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
  created_at: string;
}

interface AqiState {
  data: AQIRow[];
  total: number;
  page: number;
  limit: number;
  time: Date;
  sensor_number: number;
  loading: boolean;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTime: (time: Date) => void;
  setSensorNumber: (sensorNumber: number) => void;
  fetchAQI: () => Promise<void>;
}

export const useAqiStore = create<AqiState>((set, get) => ({
  data: [],
  total: 0,
  page: 1,
  limit: 10,
  time: new Date(),
  sensor_number: 80,
  loading: false,

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setTime: (time) => set({ time: new Date(time), page: 1 }),
  setSensorNumber: (sensor_number) => set({ sensor_number, page: 1 }),

  fetchAQI: async () => {
    const { page, limit, time, sensor_number } = get();
    set({ loading: true });

    try {
      const response = await api.get("/sensor/aqi", {
        params: { page, limit, time, sensor_number },
      });

      set({
        data: response.data.data.rows,
        total: Number(response.data.data.total),
      });
    } catch (error) {
      console.error("❌ Gagal mengambil data AQI:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
