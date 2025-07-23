import { create } from "zustand";
import { api2 } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";

interface SettlementData {
  pendapatan_at: number;
  pendapatan_epds: number;
  pendapatan_settlement: number;
  persentase: number;
  date: string;
}

interface SettlementStoreState {
  data: SettlementData | null;
  loading: boolean;
  fetchData: () => void;
}

export const useSettlementStore = create<SettlementStoreState>((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();
    set({ loading: true });
    try {
      const res = await api2.get(
        "/tracomm/transaction/settlement/achievement",
        {
          params: {
            start_date,
            end_date,
          },
        }
      );
      set({ data: res.data.data });
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
