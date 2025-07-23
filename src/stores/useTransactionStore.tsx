import { create } from "zustand";
import { api3 } from "@/services/api";
import { toast } from "sonner";
import { useDateFilterStore } from "./useDateFilterStore";

interface TargetData {
  target_name: string;
  revenue_target: string;
  percent: string;
  transaction_target: number;
}

interface AchievementData {
  revenueAchievement: string;
  rkapTarget: string;
  rkapPercent: number;
  otherTargets: TargetData[];
}

interface TransactionStoreState {
  isloading: boolean;
  daily: AchievementData;
  monthly: AchievementData;
  yearly: AchievementData;
  fetchAchievement: (freq: "daily" | "monthly" | "yearly") => Promise<void>;
}
export const useTransactionStore = create<TransactionStoreState>((set) => ({
  isloading: false,
  daily: {
    revenueAchievement: "0",
    rkapTarget: "0",
    rkapPercent: 0,
    otherTargets: [],
  },
  monthly: {
    revenueAchievement: "0",
    rkapTarget: "0",
    rkapPercent: 0,
    otherTargets: [],
  },
  yearly: {
    revenueAchievement: "0",
    rkapTarget: "0",
    rkapPercent: 0,
    otherTargets: [],
  },

  fetchAchievement: async (freq) => {
    const { start_date, end_date } = useDateFilterStore.getState();
    set({ isloading: true });

    try {
      const res = await api3.get("/tracomm/transaction/achievement", {
        params: {
          start_date,
          end_date,
          freq,
        },
      });

      const data = res.data.data;

      if (!data || !Array.isArray(data.target)) {
        set((state) => ({
          [freq]: {
            revenueAchievement: "0",
            rkapTarget: "0",
            rkapPercent: 0,
            otherTargets: [],
          },
          isloading: false,
        }));
        return;
      }

      const rkap = data.target.find((t) => t.target_name === "RKAP");
      const others = data.target.filter((t) => t.target_name !== "RKAP");

      console.log("data :", data);

      set((state) => ({
        [freq]: {
          revenueAchievement: data.revenue_achievement,
          rkapTarget: rkap?.revenue_target,
          rkapPercent: parseFloat(rkap.percent),
          otherTargets: others,
        },
        isloading: false,
      }));
    } catch (err) {
      toast.error("Failed to fetch achievement data");
      set({ isloading: false });
    }
  },
}));
