import { create } from "zustand";
import { api2 } from "@/services/api";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useRevenueStore } from "@/stores/useRevenueStore";

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
      const { externalRevenueTotal } = useRevenueStore.getState();
      const res = await api2.get("/tracomm/transaction/card", {
        params: {
          start_date,
          end_date,
        },
      });
      const data = res.data.data;

      const externalItem = {
        gate_code: "99",
        name: "INTEGRASI",
        pendapatan: externalRevenueTotal,
      };
      const combined = [...data, externalItem];
      // console.log(combined);
      set({ transactionOverview: combined, isDataLoading: false });
    },
  })
);
