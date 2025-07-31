import { create } from "zustand";
import { api } from "@/services/api";

interface HeartbeatItem {
  id_lokasi: number;
  id_alat: string;
  gardu: string;
  nama_gerbang: string;
  latitude: string;
  longitude: string;
  last_status: string;
  insert_at: string;
}

interface HeartbeatStoreState {
  data: HeartbeatItem[];
  cordinat: HeartbeatItem[];
  loading: boolean;
  selectedAlat: string;
  selectedRuas: string;
  selectedStatus: string;
  setSelectedAlat: (alat: string) => void;
  setSelectedRuas: (gerbang: string) => void;
  setSelectedStatus: (status: string) => void;
  filteredData: () => HeartbeatItem[];
  filteredCordinat: () => HeartbeatItem[];
  fetchHeartbeat: () => void;
}

export const useHeartbeatStore = create<HeartbeatStoreState>((set, get) => ({
  data: [],
  cordinat: [],
  loading: false,
  selectedAlat: "",
  selectedRuas: "",
  selectedStatus: "",
  setSelectedAlat: (alat: string) => set({ selectedAlat: alat }),
  setSelectedRuas: (gerbang: string) => set({ selectedRuas: gerbang }),
  setSelectedStatus: (status: string) => set({ selectedStatus: status }),
  filteredCordinat: () => {
    const { cordinat, selectedAlat, selectedStatus, selectedRuas } = get();
    return cordinat.filter((item) => {
      const matchAlat = selectedAlat ? item.id_alat === selectedAlat : true;
      const matchStatus = selectedStatus
        ? item.last_status === selectedStatus
        : true;
      const matchRuas = selectedRuas
        ? item.nama_gerbang === selectedRuas
        : true;
      return matchAlat || matchStatus || matchRuas;
    });
  },

  filteredData: () => {
    const { data, selectedAlat, selectedRuas, selectedStatus } = get();
    return data.filter((item) => {
      const matchAlat = selectedAlat ? item.id_alat === selectedAlat : true;
      const matchRuas = selectedRuas
        ? item.nama_gerbang === selectedRuas
        : true;
      const matchStatus = selectedStatus
        ? item.last_status === selectedStatus
        : true;
      return matchAlat && matchRuas && matchStatus;
    });
  },
  fetchHeartbeat: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/heartbeat");
      const cleanedData = res.data.data
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
      set({ data: res.data.data, cordinat: cleanedData });
    } catch (error) {
      console.error("Failed to fetch heartbeat:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
