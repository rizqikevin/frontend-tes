import { api2 } from "@/services/api";
import { format } from "date-fns";
import { create } from "zustand";

interface TransacionData {
  revenue: {
    date: string;
    value: string;
  };
  lhr: {
    date: string;
    value: number;
  };
  avg_segment_load: {
    date: string;
    value: number;
    message?: string;
  };
  total_transactions: {
    date: string;
    value: string;
  };
}

interface Stat {
  label: string;
  value: string;
  date: string;
}

interface TransacionDataState {
  transactionData: Stat[];
  TransactionDataAdmin: Stat[];
  isDataLoading: boolean;
  error: string | null;
  fetchTransactionData: () => Promise<void>;
}

export const useTransactionStore = create<TransacionDataState>((set) => ({
  transactionData: [],
  TransactionDataAdmin: [],
  isDataLoading: false,
  error: null,

  fetchTransactionData: async () => {
    const res = await api2.get("/tracomm/dashboard/card");
    const data = res.data;

    const today = format(new Date(), "yyyy-MM-dd");
    const mappedDireksi: Stat[] = [
      {
        label: "Revenue",
        value: data.data.revenue.value,
        date: today,
      },
      {
        label: "Total Transaction",
        value: data.data.total_transactions.value,
        date: today,
      },
      {
        label: "Active Gate",
        value: 0,
        date: today,
      },
      {
        label: "Inactive Gate",
        value: 0,
        date: today,
      },
      {
        label: "Total Beban Ruas",
        value: data.data.lhr.value.toString(),
        date: data.data.lhr.date,
      },
      {
        label: "Total LHR",
        value: data.data.avg_segment_load.value.toString(),
        date: today,
      },
    ];

    const mappedAdmin: Stat[] = [
      {
        label: "Active Gate",
        value: 0,
        date: today,
      },
      {
        label: "Inactive Gate",
        value: 0,
        date: today,
      },
      {
        label: "Total Lalin Harian Rata-Rata",
        value: data.data.total_transactions.value.toString(),
        date: today,
      },
      {
        label: "Beban Ruas",
        value: data.data.avg_segment_load.value.toString(),
        date: today,
      },
    ];

    try {
      if (data.code == 200) {
        set({ TransactionDataAdmin: mappedAdmin, isDataLoading: false });
        set({ transactionData: mappedDireksi, isDataLoading: false });
      } else {
        set({ error: data.message || "failed to fetch", isDataLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "unexcepted error ", isDataLoading: false });
    }
  },
}));
