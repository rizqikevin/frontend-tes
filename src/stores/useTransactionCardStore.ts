import { api2 } from "@/services/api";
import { format } from "date-fns";
import { create } from "zustand";
import { useDateFilterStore } from "./useDateFilterStore";

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
    const today = format(new Date(), "yyyy-MM-dd");
    const idNumberFormatter = new Intl.NumberFormat("id-ID");

    try {
      set({ isDataLoading: true });

      // Ambil data utama
      const res = await api2.get("/tracomm/dashboard/card", {
        params: { start_date, end_date },
      });

      const data = res.data;

      // Ambil status heartbeat
      const statusRes = await api2.get("/heartbeat/status");
      const statusData = statusRes.data?.data?.[0] || {
        total_active: "0",
        total_inactive: "0",
      };

      const activeGate = statusData.total_active || "0";
      const inactiveGate = statusData.total_inactive || "0";

      if (data.code == 200) {
        const mappedDireksi: Stat[] = [
          {
            label: "Revenue",
            value:
              "Rp" + idNumberFormatter.format(Number(data.data.revenue.value)),
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
            value: activeGate,
            date: today,
          },
          {
            label: "Inactive Gate",
            value: inactiveGate,
            date: today,
          },
          {
            label: "LHR Tertimbang",
            value: idNumberFormatter.format(Number(data.data.lhr.value)),
            date: data.data.lhr.date,
          },
        ];

        const mappedAdmin: Stat[] = [
          {
            label: "Active Gate",
            value: activeGate,
            date: today,
          },
          {
            label: "Inactive Gate",
            value: inactiveGate,
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

        set({
          transactionData: mappedDireksi,
          TransactionDataAdmin: mappedAdmin,
          isDataLoading: false,
        });
      } else {
        set({
          error: data.message || "Gagal memuat data",
          isDataLoading: false,
        });
      }
    } catch (err: any) {
      set({
        error: err.message || "Terjadi kesalahan tak terduga",
        isDataLoading: false,
      });
    }
  },
}));
