import { create } from "zustand";
import api from "@/services/api";
import { VehicleData } from "@/types";
import { toast } from "sonner";

interface TrackData {
  radio_time: string;
  lat: string;
  lon: string;
  speed: number;
  create_at: string;
  updated: string;
}

interface allTrackData {
  radio_time: string;
  lat: string;
  lon: string;
  speed: number;
  create_at: string;
  updated: string;
}

interface TrackDataState {
  page: number;
  limit: number;
  total: number;
  trackData: TrackData[];
  allTrackData: TrackData[];
  startDate: Date;
  endDate: Date;
  search: string;
  isTrackLoading: boolean;
  mileage: number;
  fuel: number;

  fetchTrackData: (radioId: string) => Promise<void>;
  fetchAllTrackData: (radioId: string) => Promise<void>;

  setTotal: (total: number) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setSearch: (search: string) => void;
}

interface GpsState {
  vehicles: VehicleData[];
  vehiclesNearIncidents: Record<string, VehicleData[]>;
  isVehicleLoading: boolean;
  selectedVehicle: VehicleData | null;
  fetchVehicles: () => Promise<void>;
  setSelectedVehicle: (vehicle: VehicleData | null) => void;
  setVehiclesNearIncidents: (data: Record<string, VehicleData[]>) => void;
}

export const useGpsStore = create<GpsState>((set) => ({
  vehicles: [],
  vehiclesNearIncidents: {},
  selectedVehicle: null,
  isVehicleLoading: false,
  isTrackLoading: false,

  fetchVehicles: async () => {
    set({ isVehicleLoading: true });
    try {
      const response = await api.get("/gps");
      const rawVehicles = response.data.data;
      const validVehicles = rawVehicles.filter(
        (v: any) =>
          v.lat &&
          v.lon &&
          !isNaN(parseFloat(v.lat)) &&
          !isNaN(parseFloat(v.lon))
      );
      set({ vehicles: validVehicles });
      console.log("Vehicles:", validVehicles);
    } catch (error) {
      toast.error("Failed to fetch vehicles", error);
    } finally {
      set({ isVehicleLoading: false });
    }
  },
  setVehiclesNearIncidents: (vehicle) =>
    set({ vehiclesNearIncidents: vehicle }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
}));

export const useTrackGpsStore = create<TrackDataState>((set, get) => ({
  trackData: [],
  allTrackData: [],
  mileage: 0,
  fuel: 0,
  startDate: new Date(),
  endDate: new Date(),
  search: "",
  page: 1,
  limit: 10,
  total: 0,
  isTrackLoading: false,

  fetchAllTrackData: async (radioId: string) => {
    const { startDate, endDate, search } = get();
    const sDate = startDate.toISOString().split("T")[0];
    const eDate = endDate.toISOString().split("T")[0];
    const Alllimit = 1000;
    let Allpage = 1;
    let allRows: TrackData[] = [];
    let hasMore = true;

    set({ isTrackLoading: true });

    try {
      while (hasMore) {
        const res = await api.get(`/gps/track/${radioId}`, {
          params: {
            startDate: sDate,
            endDate: eDate,
            search,
            page: Allpage,
            limit: Alllimit,
          },
        });

        const rows: allTrackData[] = res.data.data.rows;
        allRows = allRows.concat(rows);

        const total = res.data.data.total;
        const totalPages = Math.ceil(total / Alllimit);

        Allpage++;
        hasMore = Allpage <= totalPages;
      }

      set({
        allTrackData: allRows,
        total: allRows.length,
        mileage: 0,
        fuel: 0,
      });
    } catch (error) {
      toast.error("Failed to fetch full track data", error);
    } finally {
      set({ isTrackLoading: false });
    }
  },

  fetchTrackData: async (radioId: string) => {
    const { startDate, endDate, search, page, limit } = get();
    const sDate = startDate.toISOString().split("T")[0];
    const eDate = endDate.toISOString().split("T")[0];

    set({ isTrackLoading: true });
    try {
      const res = await api.get(`/gps/track/${radioId}`, {
        params: { startDate: sDate, endDate: eDate, search, page, limit },
      });
      set({ mileage: res.data.data.mileage });
      set({ fuel: res.data.data.fuel });
      set({ trackData: res.data.data.rows });
      get().setTotal(res.data.data.total);
    } catch (error) {
      toast.error("Failed to fetch track data", error);
    } finally {
      set({ isTrackLoading: false });
    }
  },

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setSearch: (search) => set({ search }),
  setPage: (page: number | ((prev: number) => number)) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  setLimit: (limit) => set({ limit, page: 1 }),
  setTotal: (total: number) => set({ total }),
}));
