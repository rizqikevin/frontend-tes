import api from "@/services/api";
import { toast } from "sonner";
import { create } from "zustand";

interface Incident {
  id: string;
  time_logging: string;
  date_logging: string;
  url_image: string;
  url_video: string;
  cam_loc: string;
  description: string;
  cam_merk: string;
  name: string;
}

interface IncidentState {
  selectedDate: Date;
  page: number;
  limit: number;
  data: Incident[];
  total: number;
  loading: boolean;
  expandedImage: string | null;
  expandedVideo: string | null;
  selectedItems: Set<string>;
  selectAll: boolean;

  fetchData: () => Promise<void>;
  setSelectedDate: (date: Date) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setData: (data: Incident[]) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
  setExpandedImage: (image: string | null) => void;
  setExpandedVideo: (video: string | null) => void;
  toggleItem: (id: string) => void;
  setSelectedItems: (items: Set<string>) => void;
  setSelectAll: (selectAll: boolean) => void;
}

export const useIncidentStore = create<IncidentState>((set, get) => ({
  selectedDate: new Date(),
  page: 1,
  limit: 10,
  data: [],
  total: 0,
  loading: false,
  expandedImage: null,
  expandedVideo: null,
  selectedItems: new Set(),
  selectAll: false,

  fetchData: async () => {
    const { page, limit, selectedDate } = get();
    const formattedDate = selectedDate.toISOString().split("T")[0];
    set({ loading: true });
    try {
      const res = await api.get("/incident", {
        params: { page, limit, date_logging: formattedDate },
      });
      set({
        data: res.data.data.rows,
        total: Number(res.data.data.total),
        selectedItems: new Set(),
        selectAll: false,
      });
    } catch (err) {
      toast.error("Gagal mengambil data:", err);
    } finally {
      set({ loading: false });
    }
  },

  setSelectedDate: (date) => set({ selectedDate: date, page: 1 }),
  setPage: (page: number | ((prev: number) => number)) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  setLimit: (limit) => set({ limit, page: 1 }),

  setData: (data) => set({ data }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),
  setExpandedImage: (image) => set({ expandedImage: image }),
  setExpandedVideo: (video) => set({ expandedVideo: video }),
  toggleItem: (id) => {
    const selectedItems = new Set(get().selectedItems);
    if (selectedItems.has(id)) {
      selectedItems.delete(id);
    } else {
      selectedItems.add(id);
    }
    set({ selectedItems });
  },
  setSelectedItems: (items) => set({ selectedItems: items }),
  setSelectAll: (selectAll) => set({ selectAll }),
}));
