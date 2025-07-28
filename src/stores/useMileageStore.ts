import { create } from "zustand";
import api from "@/services/api";

interface VehicleMileage {
  id: string;
  mileage: number;
  fuel: number;
}

interface MileageState {
  data: Record<string, VehicleMileage>;
  isLoading: boolean;
  error: string | null;
  fetchMileage: () => Promise<void>;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export const useMileageStore = create<MileageState>((set, get) => ({
  data: {},
  isLoading: false,
  error: null,
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: (date: Date) => set({ startDate: date }),
  setEndDate: (date: Date) => set({ endDate: date }),

  fetchMileage: async () => {
    set({ isLoading: true, error: null });
    const { startDate, endDate } = get();

    try {
      const response = await api.get("/gps/mileage", {
        params: {
          start_time: startDate,
          end_time: endDate,
        },
      });

      const { data } = response.data;
      set({ data, isLoading: false });
    } catch (error: any) {
      set({
        error: error?.message || "Failed to fetch mileage data",
        isLoading: false,
      });
    }
  },
}));
