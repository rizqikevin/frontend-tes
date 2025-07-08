import { create } from "zustand";
import api from "@/services/api";

interface NotificationSettings {
  wrongWay: boolean;
  stopInCongested: boolean;
  slowDown: boolean;
  stopInFluid: boolean;
}

interface Incident {
  description: string;
  url_video: string;
  cam_loc?: string;
  time_logging?: string;
}
interface IncidentSocketState {
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  clearIncidents: () => void;
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

export const useIncidentSocketStore = create<IncidentSocketState>((set) => ({
  incidents: [],
  addIncident: (incident) =>
    set((state) => ({ incidents: [...state.incidents, incident] })),
  clearIncidents: () => set({ incidents: [] }),
}));

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
    const result = res.data.data.reduce(
      (acc, cur) => {
        if (cur.description === "Wrong Way") acc.wrongWay = cur.status;
        else if (cur.description === "Stop Vehicle in Congested Traffic")
          acc.stopInCongested = cur.status;
        else if (cur.description === "Slow Down") acc.slowDown = cur.status;
        else if (cur.description === "Stop Vehicle in Fluid Traffic")
          acc.stopInFluid = cur.status;
        return acc;
      },
      {
        wrongWay: true,
        stopInCongested: true,
        slowDown: true,
        stopInFluid: true,
      }
    );

    set({ settings: result });
  },

  updateSettings: async (updates) => {
    await api.put("/incident/notif", updates);
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }));
  },
}));
