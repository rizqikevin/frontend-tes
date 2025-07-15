import { api2 } from "@/services/api";
import { format } from "date-fns";
import { create } from "zustand";
import { useDateFilterStore } from "./useDateFilterStore";

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
  isDataLoading: true,
  error: null,

  fetchTransactionData: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();
    const res = await api2.get("/tracomm/dashboard/card", {
      params: {
        start_date,
        end_date,
      },
    });
    const data = res.data;

    // console.log(data);

    const today = format(new Date(), "yyyy-MM-dd");
    const idNumberFormatter = new Intl.NumberFormat("id-ID");
    const mappedDireksi: Stat[] = [
      {
        label: "Revenue",
        value: "Rp" + idNumberFormatter.format(Number(data.data.revenue.value)),
        date: data.data.revenue.date,
      },
      {
        label: "Total Transaction",
        value: idNumberFormatter.format(
          Number(data.data.total_transactions.value)
        ),
        date: data.data.total_transactions.date,
      },
      {
        label: "Active Gate",
        value: "0",
        date: today,
      },
      {
        label: "Inactive Gate",
        value: "0",
        date: today,
      },
      // {
      //   label: "Total Beban Ruas",
      //   value: idNumberFormatter.format(
      //     Number(data.data.avg_segment_load.value)
      //   ),
      //   date: data.data.avg_segment_load.date,
      // },
      {
        label: "LHR Tertimbang",
        value: idNumberFormatter.format(Number(data.data.lhr.value)),
        date: data.data.lhr.date,
      },
    ];

    const mappedAdmin: Stat[] = [
      {
        label: "Active Gate",
        value: "0",
        date: today,
      },
      {
        label: "Inactive Gate",
        value: "0",
        date: today,
      },
      {
        label: "Total Lalin Harian Rata-Rata",
        value: idNumberFormatter.format(Number(data.data.lhr.value)),
        date: data.data.lhr.date,
      },
      {
        label: "Beban Ruas",
        value: idNumberFormatter.format(
          Number(data.data.avg_segment_load.value)
        ),
        date: today,
      },
    ];

    // console.log(data.code);

    try {
      set({ isDataLoading: false });
      if (data.code == 200) {
        set({ TransactionDataAdmin: mappedAdmin, isDataLoading: false });
        set({ transactionData: mappedDireksi, isDataLoading: false });
      } else {
        set({ error: data.message || "failed to fetch", isDataLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "unexcepted error ", isDataLoading: false });
    } finally {
      set({ isDataLoading: false, error: null });
    }
  },
}));
