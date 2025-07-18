import { create } from "zustand";
import { api } from "@/services/api";

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
  page: number;
  limit: number;
  totalPages: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  fetchLogs: (start: string, end: string) => Promise<void>;
}

export const useLogAlatStore = create<LogState>((set, get) => ({
  logs: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 1,

  setPage: (page) => set({ page }),
  setLimit: (limit) => {
    const totalItems = get().logs.length;
    const newTotalPages = Math.ceil(totalItems / limit) || 1;
    set({ limit, page: 1, totalPages: newTotalPages });
  },

  fetchLogs: async (start, end) => {
    set({ isLoading: true });
    try {
      const res = await api.get("/heartbeat/log", {
        params: {
          start_time: start,
          end_time: end,
        },
      });

      if (res.data.status === "success") {
        const allLogs = res.data.data;
        const totalItems = allLogs.length;
        const limit = get().limit;
        const totalPages = Math.ceil(totalItems / limit) || 1;
        set({ logs: allLogs, totalPages, isLoading: false, page: 1 });
      } else {
        set({ error: "Failed to fetch", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Unexpected error", isLoading: false });
    }
  },
}));
