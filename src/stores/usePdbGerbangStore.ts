import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

export const usePdbGerbangStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
  fetch: async () => {
    try {
      const response = await api.get("/sensor/pdb/name");
      set({ data: response.data });
    } catch (error) {
      toast.error("Gagal memuat data gerbang");
    }
  },
}));
