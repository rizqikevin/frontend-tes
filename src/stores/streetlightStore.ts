import { api } from "@/services/api";
import { toast } from "sonner";
import { create } from "zustand";

interface Light {
  id: number;
  gateway_id: string;
  sensor_name: string;
  status: number;
  update_at: string;
}

interface Gateway {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  interval_per_second: number;
  start_time: number | null;
  end_time: number | null;
  status: boolean;
  update_at: string;
}

interface StreetLightState {
  lights: Light[];
  gateways: Gateway[];
  selectedGateway: string;
  setSelectedGateway: (gateway: string) => void;
  fetchGateways: () => Promise<void>;
  fetchLights: () => Promise<void>;
  toggleLights: (id: number, status: number) => Promise<void>;
  addLight: (data: {
    name: string;
    latitude: number;
    longitude: number;
    gatewayId: string;
  }) => Promise<void>;
}

export const useStreetLightStore = create<StreetLightState>((set, get) => ({
  lights: [],
  gateways: [],
  selectedGateway: "HWM-101",

  setSelectedGateway: (gateway) => {
    set({ selectedGateway: gateway });
    get().fetchLights();
  },

  fetchGateways: async () => {
    const res = await api.get("/sensor/pju-gateway");
    const data = res.data.data.rows;
    set({ gateways: data });
  },

  fetchLights: async () => {
    const res = await api.get(
      "/sensor/pju?page=1&limit=100&gatewayId=${selectedGateway}"
    );
    const data = res.data.data.rows;
    set({ lights: data });
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
