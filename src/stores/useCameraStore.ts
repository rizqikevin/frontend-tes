import { create } from "zustand";
import api from "@/services/api";

type Camera = {
  status_id?: number;
  id: string;
  name: string;
  group_id: string;
  url_local: string;
};

type CameraStore = {
  cameraList: Camera[];
  grid: (Camera | null)[];
  fetchCameras: () => Promise<void>;
  setGrid: (grid: (Camera | null)[]) => void;
  setCameraAt: (index: number, camera: Camera) => void;
  removeCameraAt: (index: number) => void;
};

export const useCameraStore = create<CameraStore>((set, get) => ({
  cameraList: [],
  filteredCameras: [],
  cameraVMS: [],
  grid: new Array(16).fill(null),
  fetchCameras: async () => {
    try {
      const res = await api.get("/cctv/all");
      set({
        cameraList: res.data,
      });
    } catch (err) {
      console.error("Failed to fetch cameras:", err);
    }
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
