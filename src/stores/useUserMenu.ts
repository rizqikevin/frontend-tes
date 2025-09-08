import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

export interface userMenu {
  id: number;
  user_level: string;
  path: string;
  method: string;
}

interface userMenuStore {
  userMenu: userMenu[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  fetchUserMenu: () => Promise<void>;
  addUserMenu: (userMenu: userMenu) => Promise<void>;
  updateUserMenu: (id: number, userMenu: userMenu) => Promise<void>;
  deleteUserMenu: (id: number) => Promise<void>;
}

export const useUserMenuStore = create<userMenuStore>((set, get) => ({
  userMenu: [],
  loading: false,
  page: 1,
  limit: 20,
  total: 0,
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),

  fetchUserMenu: async () => {
    const { page, limit } = get();
    try {
      set({ loading: true });
      const response = await api.get("/authorization", {
        params: {
          page: page,
          limit: limit,
        },
      });

      set({ userMenu: response.data.data, loading: false });
    } catch (error) {
      toast.error(error);
      set({ loading: false });
    }
  },
  addUserMenu: async (userMenu: userMenu) => {
    try {
    } catch (error) {
      toast.error(error);
    }
    const response = await api.post("/authorization", userMenu);
    toast.success("User menu added");
  },
  updateUserMenu: async (id: number, userMenu: userMenu) => {
    const response = await api.put(`/authorization/${id}`, userMenu);
    toast.success("User menu updated");
  },
  deleteUserMenu: async (id: number) => {
    const response = await api.delete(`/authorization/${id}`);
    toast.success("User menu deleted");
  },
}));
