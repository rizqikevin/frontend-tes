// stores/useLogAlatStore.ts
import { create } from "zustand";
import { api2 } from "@/services/api";

interface Log {
  id_lokasi: number;
  id_alat: string;
  latitude: string;
  longitude: string;
  status: string;
  insert_at: string;
  update_at: string | null;
}

interface LogState {
  logs: Log[];
  isLoading: boolean;
  error: string | null;
  fetchLogs: (start: string, end: string) => Promise<void>;
}

export const useLogAlatStore = create<LogState>((set) => ({
  logs: [],
  isLoading: false,
  error: null,

  fetchLogs: async (start, end) => {
    set({ isLoading: true });
    try {
      const res = await api2.get("/heartbeat/log", {
        params: {
          start_time: start,
          end_time: end,
        },
      });
      if (res.data.status === "success") {
        set({ logs: res.data.data, isLoading: false });
      } else {
        set({ error: "Failed to fetch", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Unexpected error", isLoading: false });
    }
  },
}));
