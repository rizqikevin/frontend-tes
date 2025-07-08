import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

export interface User {
  id: number;
  name: string;
  username: string;
  level_id: number;
  status: boolean;
  visit: number;
  last_visit: string;
  datecreated: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/users/all");
      set({ users: res.data, loading: false });
    } catch (err) {
      toast.error("Failed to load users");
      set({ loading: false });
    }
  },

  addUser: async (user) => {
    try {
      await api.post("/users", user);
      toast.success("User added");
      await useUserStore.getState().fetchUsers();
    } catch {
      toast.error("Failed to add user");
    }
  },

  updateUser: async (id, user) => {
    try {
      await api.put(`/users/${id}`, user);
      toast.success("User updated");
      await useUserStore.getState().fetchUsers();
    } catch {
      toast.error("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted");
      await useUserStore.getState().fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  },
}));
