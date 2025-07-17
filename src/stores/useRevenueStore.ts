import { create } from "zustand";
import { api3 } from "@/services/api";
import { useDateFilterStore } from "./useDateFilterStore";
import { toast } from "sonner";

interface RevenueItem {
  revenue: number;
  branch_name: string;
}

interface RevenueStore {
  internalRevenue: number;
  externalRevenueTotal: number;
  items: RevenueItem[];
  externalItems: RevenueItem[];
  totalRevenue: number;
  fetchRevenue: () => Promise<void>;
}

export const useRevenueStore = create<RevenueStore>(() => ({
  internalRevenue: 0,
  externalRevenueTotal: 0,
  items: [],
  externalItems: [],
  totalRevenue: 0,

  fetchRevenue: async () => {
    const { start_date, end_date } = useDateFilterStore.getState();

    try {
      const res = await api3.get("/tracomm/transaction/revenue", {
        params: {
          start_date,
          end_date,
        },
      });

      const result = res.data.data;
      const { internal, external } = result.data;

      const allItems = [...external, internal];
      const allTotal = allItems.reduce((sum, item) => sum + item.revenue, 0);

      const externalItems = external.map((item) => ({
        revenue: item.revenue,
        branch_name: item.branch_name,
      }));

      const externalTotal = external.reduce(
        (sum, item) => sum + item.revenue,
        0
      );

      useRevenueStore.setState({
        externalItems,
        internalRevenue: internal.revenue,
        externalRevenueTotal: externalTotal,
        totalRevenue: allTotal,
        items: allItems,
      });
    } catch (error) {
      toast.error("Failed to fetch revenue data:", error);
    }
  },
}));
