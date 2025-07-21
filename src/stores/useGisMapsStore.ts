import { create } from "zustand";
import api from "@/services/api";
import { persist } from "zustand/middleware";

interface Gismaps {
  id_lokasi: string;
  cabang: string;
  gerbang: string;
  gardu: string;
  id_alat: string;
  latitude: number;
  longitude: number;
  last_status: string;
  deskripsi: string;
  insert_at: string;
  update_at: string;
}

interface GismapsState {
  gismaps: Gismaps[];
  fetchGismaps: () => Promise<void>;
}

export const useGismapsStore = create<GismapsState>()((set) => ({
  gismaps: [],
  fetchGismaps: async () => {
    const response = await api.get("/heartbeat");
    // console.log("GISMAPS RAW:", response.data.data);
    const cleanedData = response.data.data
      .map((item: any) => {
        const lat = parseFloat(item.latitude.replace(",", "."));
        const lng = parseFloat(item.longitude.replace(",", "."));

        if (isNaN(lat) || isNaN(lng)) return null;

        return {
          ...item,
          latitude: lat,
          longitude: lng,
        };
      })
      .filter(Boolean);

    set({ gismaps: cleanedData });
  },
}));
