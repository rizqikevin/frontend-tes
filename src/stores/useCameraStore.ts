// stores/useCameraStore.ts
import { create } from "zustand";
import api from "@/services/api";
import { toast } from "sonner";

export interface Camera {
  id: string;
  group_id: number;
  name: string;
  url: string;
  url_local: string;
  latitude: string;
  longitude: string;
  description: string;
  status_id: number;
}

interface CameraStore {
  cameras: Camera[];
  grid: (Camera | null)[];
  statusFilter: number | null; // null = all, 1 = active, 2 = maintenance, 3 = inactive
  fetchCameras: () => Promise<void>;
  setStatusFilter: (status: number | null) => void;
  setCameras: (data: Camera[]) => void;
  filteredCameras: () => Camera[];
  setGrid: (grid: (Camera | null)[]) => void;
  setCameraAt: (index: number, camera: Camera) => void;
  removeCameraAt: (index: number) => void;
}

export const useCameraStore = create<CameraStore>((set, get) => ({
  cameras: [],
  grid: new Array(16).fill(null),
  statusFilter: null,

  fetchCameras: async () => {
    try {
      const res = await api.get("/cctv/all");
      set({ cameras: res.data });
    } catch (err) {
      toast.error("Failed to fetch cameras");
      console.error(err);
    }
  },

  setStatusFilter: (status) => set({ statusFilter: status }),

  setCameras: (data) => set({ cameras: data }),

  filteredCameras: () => {
    const { cameras, statusFilter } = get();
    if (statusFilter === null) return cameras;
    return cameras.filter((cam) => cam.status_id === statusFilter);
  },

  setGrid: (grid) => set({ grid }),

  setCameraAt: (index, camera) =>
    set((state) => {
      const updated = [...state.grid];
      updated[index] = camera;
      return { grid: updated };
    }),

  removeCameraAt: (index) =>
    set((state) => {
      const updated = [...state.grid];
      updated[index] = null;
      return { grid: updated };
    }),
}));
