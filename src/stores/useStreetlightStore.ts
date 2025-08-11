import { api } from "@/services/api";
import { create } from "zustand";

interface Light {
  id: number;
  gateway_id: string;
  sensor_name: string;
  latitude: number | null;
  longitude: number | null;
  status: number;
  updated_at: string;
}

interface Gateway {
  id: string;
  name: string;
}

interface StreetLightState {
  lights: Light[];
  gateways: Gateway[];
  selectedGateway: string;
  searchTerm: string;
  setSelectedGateway: (gateway: string) => void;
  setSearchTerm: (term: string) => void;
  fetchGateways: () => Promise<void>;
  fetchLights: () => Promise<void>;
  toggleLights: (id: number, status: number) => Promise<void>;
  addLight: (data: {
    name: string;
    latitude: string;
    longitude: string;
    gatewayId: string;
  }) => Promise<void>;
}

export const useStreetLightStore = create<StreetLightState>((set, get) => ({
  lights: [],
  gateways: [],
  selectedGateway: "",
  searchTerm: "",

  setSelectedGateway: (gateway) => {
    set({ selectedGateway: gateway });
    get().fetchLights();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().fetchLights();
  },

  fetchGateways: async () => {
    try {
      const res = await api.get("/sensor/pju-gateway");
      const data = res.data.data.rows;
      set({ gateways: data });
      get().fetchLights();
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
    }
  },

  fetchLights: async () => {
    try {
      const { selectedGateway, searchTerm } = get();
      const params = new URLSearchParams({
        page: "1",
        limit: "100",
      });

      if (selectedGateway && selectedGateway !== "all-gateways") {
        params.append("gatewayId", selectedGateway);
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const res = await api.get(`/sensor/pju?${params.toString()}`);
      const data = res.data.data.rows;
      set({ lights: data });
    } catch (error) {
      console.error("Failed to fetch lights:", error);
      set({ lights: [] }); // Clear lights on error
    }
  },

  toggleLights: async (id, status) => {
    const { selectedGateway, fetchLights } = get();
    await api.patch(`/sensor/pju/${id}`, {
      gatewayId: selectedGateway,
      status: status ? 0 : 1,
    });
    fetchLights();
  },

  addLight: async ({ name, latitude, longitude, gatewayId }) => {
    await api.post("/sensor/pju", {
      gatewayId,
      name,
      latitude,
      longitude,
    });
    get().fetchLights();
  },
}));
