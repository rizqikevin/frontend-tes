import { create } from "zustand";
import api from "@/services/api";
import { persist } from "zustand/middleware";

interface NotificationSettings {
  wrongWay: boolean;
  stopInCongested: boolean;
  slowDown: boolean;
  stopInFluid: boolean;
}

interface Incident {
  id: string;
  description: string;
  url_video: string;
  cam_loc?: string;
  time_logging?: string;
  date_logging: string;
  lat: number;
  lng: number;
}
interface IncidentSocketState {
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  clearIncidents: () => void;
  removeIncident: (id: string) => void;
}

interface NotificationState {
  popupQueue: Incident[] | null;
  addPopupIncident: (data: Incident) => void;
  dismissPopupIncident: () => void;
  popupIncident: {
    description: string;
    url_video: string;
    cam_loc?: string;
  } | null;
  settings: NotificationSettings;
  setPopupIncident: (
    data: { description: string; url_video: string; cam_loc?: string } | null
  ) => void;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<NotificationSettings>) => Promise<void>;
}

export const useIncidentSocketStore = create<IncidentSocketState>()(
  persist(
    (set) => ({
      incidents: [],
      addIncident: (incident) =>
        set((state) => ({ incidents: [...state.incidents, incident] })),
      clearIncidents: () => set({ incidents: [] }),
      removeIncident: (id) =>
        set((state) => ({
          incidents: state.incidents.filter((incident) => incident.id !== id),
        })),
    }),
    {
      name: "incident-socket-storage",
    }
  )
);

export const useNotificationStore = create<NotificationState>((set) => ({
  popupQueue: [],
  popupIncident: null,
  settings: {
    wrongWay: true,
    stopInCongested: true,
    slowDown: true,
    stopInFluid: true,
  },

  setPopupIncident: (data) => set({ popupIncident: data }),
  addPopupIncident: (incident) =>
    set((state) => ({
      popupQueue: [...state.popupQueue, incident],
    })),

  dismissPopupIncident: () =>
    set((state) => ({
      popupQueue: state.popupQueue.slice(1),
    })),

  fetchSettings: async () => {
    const res = await api.get("/incident/notif");
    const result = res.data.data.reduce(
      (acc, cur) => {
        if (cur.description === "WrongWay") acc.wrongWay = cur.status;
        else if (cur.description === "StopVeh")
          acc.stopInCongested = cur.status;
        else if (cur.description === "SlowDown") acc.slowDown = cur.status;
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
