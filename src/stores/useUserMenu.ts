import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

export interface userMenu {
  id: number;
  user_level: string;
  path: string;
  method: string;
}

interface FetchParams {
  page?: number;
  limit?: number;
  method?: string;
  user_level?: string;
}

interface userMenuStore {
  userMenu: userMenu[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  fetchUserMenu: (filters?: {
    method?: string;
    user_level?: string;
  }) => Promise<void>;
  addUserMenu: (userMenu: Omit<userMenu, "id">) => Promise<void>;
  updateUserMenu: (
    id: number,
    userMenu: Omit<userMenu, "id">
  ) => Promise<void>;
  deleteUserMenu: (id: number) => Promise<void>;
}

export const useUserMenuStore = create<userMenuStore>((set, get) => ({
  userMenu: [],
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  total: 0,
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => {
    set({ limit, page: 1 }); // Reset to page 1 when limit changes
  },

  fetchUserMenu: async (filters = {}) => {
    const { page, limit } = get();
    try {
      set({ loading: true, error: null });
      const params: FetchParams = {
        page,
        limit,
        ...filters,
      };
      if (!params.method) delete params.method;
      if (!params.user_level) delete params.user_level;

      const response = await api.get("/authorization", { params });

      set({
        userMenu: response.data.data,
        total: response.data.total_data || 0,
        loading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ loading: false, error: errorMessage, userMenu: [], total: 0 });
      toast.error(errorMessage);
    }
  },
  addUserMenu: async (userMenu) => {
    try {
      await api.post("/authorization", userMenu);
      toast.success("User menu added successfully");
      await get().fetchUserMenu();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to add user menu: ${errorMessage}`);
      throw error;
    }
  },
  updateUserMenu: async (id, userMenu) => {
    try {
      await api.patch(`/authorization/${id}`, userMenu);
      toast.success("User menu updated successfully");
      await get().fetchUserMenu();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to update user menu: ${errorMessage}`);
      throw error;
    }
  },
  deleteUserMenu: async (id) => {
    try {
      await api.delete(`/authorization/${id}`);
      toast.success("User menu deleted successfully");
      await get().fetchUserMenu();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to delete user menu: ${errorMessage}`);
      throw error;
    }
  },
}));