import { create } from "zustand";
import { api3 } from "@/services/api";

interface TargetData {
  target_name: string;
  revenue_target: string;
  percent: string;
  transaction_target: number;
}

interface TransactionStoreState {
  start_date: string;
  end_date: string;

  revenueAchievement: string;
  rkapTarget: string;
  rkapPercent: number;
  otherTargets: TargetData[];

  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setDateRange: (start: Date, end: Date) => void;

  fetchAchievement: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStoreState>(
  (set, get) => ({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    revenueAchievement: "0",
    rkapTarget: "0",
    rkapPercent: 0,
    otherTargets: [],

    setStartDate: (date) => set({ start_date: date }),
    setEndDate: (date) => set({ end_date: date }),
    setDateRange: (start, end) => {
      set({
        start_date: start.toISOString().split("T")[0],
        end_date: end.toISOString().split("T")[0],
      });
    },

    fetchAchievement: async () => {
      const { start_date, end_date } = get();
      try {
        const res = await api3.get("/tracomm/transaction/achievement", {
          params: {
            start_date,
            end_date,
          },
        });

        const data = res.data?.data;

        if (!data || !Array.isArray(data.target)) {
          set({
            revenueAchievement: "0",
            rkapTarget: "0",
            rkapPercent: 0,
            otherTargets: [],
          });
          return;
        }

        const rkap = data.target.find(
          (t: TargetData) => t.target_name === "RKAP"
        );
        const others = data.target.filter(
          (t: TargetData) => t.target_name !== "RKAP"
        );

        set({
          revenueAchievement: data.revenue_achievement || "0",
          rkapTarget: rkap?.revenue_target || "0",
          rkapPercent: parseFloat(rkap?.percent || "0"),
          otherTargets: others,
        });
      } catch (err) {
        console.error("Failed to fetch achievement data:", err);
      }
    },
  })
);
