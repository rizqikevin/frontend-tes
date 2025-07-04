import { create } from "zustand";
import api from "@/services/api";

interface NotificationSettings {
  wrongWay: boolean;
  stopInCongested: boolean;
  slowDown: boolean;
  stopInFluid: boolean;
}

interface NotificationState {
  popupIncident: {
    description: string;
    videoUrl: string;
  } | null;
  settings: NotificationSettings;
  setPopupIncident: (
    data: { description: string; videoUrl: string } | null
  ) => void;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<NotificationSettings>) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  popupIncident: null,
  settings: {
    wrongWay: true,
    stopInCongested: true,
    slowDown: true,
    stopInFluid: true,
  },

  setPopupIncident: (data) => set({ popupIncident: data }),

  fetchSettings: async () => {
    const res = await api.get("/incident/notif");
    console.log(res.data);
    set({ settings: res.data });
  },

  updateSettings: async (updates) => {
    await api.put("/incident/notif", updates);
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }));
  },
}));
