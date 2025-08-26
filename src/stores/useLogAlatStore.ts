import { create } from "zustand";
import { api } from "@/services/api";

interface Log {
  gate: string;
  id_lokasi: number;
  id_alat: string;
  gardu: string;
  nama_gerbang: string;
  latitude: string;
  longitude: string;
  last_status: string;
  insert_at: string;
  deskripsi: string;
}

interface LogState {
  logs: Log[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  selectedAlat: string;
  selectedRuas: string;
  selectedStatus: string;
  setSelectedAlat: (alat: string) => void;
  setSelectedRuas: (gerbang: string) => void;
  setSelectedStatus: (status: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  fetchLogs: (params?: {
    gate?: string;
    id_alat?: string;
    status?: string;
    start_time?: string;
    end_time?: string;
  }) => Promise<void>;
}

export const useLogAlatStore = create<LogState>((set, get) => ({
  logs: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 1,
  selectedAlat: "",
  selectedRuas: "",
  selectedStatus: "",
  setSelectedAlat: (alat: string) => set({ selectedAlat: alat }),
  setSelectedRuas: (gerbang: string) => set({ selectedRuas: gerbang }),
  setSelectedStatus: (status: string) => set({ selectedStatus: status }),

  setPage: (page) => set({ page }),
  setLimit: (limit) => {
    const totalItems = get().logs.length;
    const newTotalPages = Math.ceil(totalItems / limit) || 1;
    set({ limit, page: 1, totalPages: newTotalPages });
  },

  fetchLogs: async (params = {}) => {
    set({ isLoading: true });
    try {
      const res = await api.get("/heartbeat", { params });

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
