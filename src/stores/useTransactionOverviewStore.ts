import { create } from "zustand";
import { api2 } from "@/services/api";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

interface TransacionData {
  gate_code: string;
  name: string;
  pendapatan: number;
}

interface TransactionOverviewState {
  transactionOverview: TransacionData[];
  isDataLoading: boolean;
  error: any;
  fetchTransactionOverview: () => Promise<void>;
}

export const useTransactionOverviewStore = create<TransactionOverviewState>(
  (set) => ({
    transactionOverview: [],
    isDataLoading: true,
    error: null,
    fetchTransactionOverview: async () => {
      const { start_date, end_date } = useDateFilterStore.getState();
      const res = await api2.get("/tracomm/transaction/card", {
        params: {
          start_date,
          end_date,
        },
      });
      const data = res.data;
      set({ transactionOverview: data.data, isDataLoading: false });
    },
  })
);
