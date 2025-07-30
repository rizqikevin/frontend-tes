import { create } from "zustand";
import { api } from "@/services/api";

interface HeartbeatItem {
  id_lokasi: number;
  id_alat: string;
  gardu: string;
  nama_gerbang: string;
  latitude: string;
  longitude: string;
  last_status: string;
  insert_at: string;
}

interface HeartbeatStoreState {
  data: HeartbeatItem[];
  loading: boolean;
  fetchHeartbeat: () => void;
}

export const useHeartbeatStore = create<HeartbeatStoreState>((set) => ({
  data: [],
  loading: false,
  fetchHeartbeat: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/heartbeat");
      set({ data: res.data.data });
    } catch (error) {
      console.error("Failed to fetch heartbeat:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
