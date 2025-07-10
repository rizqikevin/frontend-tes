import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

export interface UserLevel {
  id: number;
  name: string;
}

interface UserLevelStore {
  levels: UserLevel[];
  loading: boolean;
  fetchLevels: () => void;
  addLevel: (data: UserLevel) => void;
  updateLevel: (id: number, data: { name: string }) => void;
  deleteLevel: (id: number) => void;
}

export const useUserLevelStore = create<UserLevelStore>((set) => ({
  levels: [],
  loading: false,

  fetchLevels: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/users/level");
      set({ levels: res.data, loading: false });
    } catch (err) {
      toast.error("failed to fetch user levels", err);
    }
  },

  addLevel: async (data) => {
    try {
      await api.post("/users/level", data);
      toast.success("Level Added");
      const res = await api.get("/users/level");
      set({ levels: res.data });
    } catch (err) {
      toast.error("failed to update level", err);
    }
  },

  updateLevel: async (id, data) => {
    try {
      await api.put(`/users/level/${id}`, data);
      toast.success("level update");
      const res = await api.get("/users/level");
      set({ levels: res.data });
    } catch (err) {
      toast.error("failed to update levels", err);
    }
  },

  deleteLevel: async (id) => {
    try {
      await api.delete(`/users/level/${id}`);
      toast.success("level deleted");
      const res = await api.get("/users/level");
      set({ levels: res.data });
    } catch {
      toast.error(" failed to deleted level");
    }
  },
}));
