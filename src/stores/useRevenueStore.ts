import { create } from "zustand";
import api2, { api3 } from "@/services/api";

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
  startDate: string;
  endDate: string;
  fetchRevenue: () => Promise<void>;
}

export const useRevenueStore = create<RevenueStore>((set) => ({
  internalRevenue: 0,
  externalRevenueTotal: 0,
  items: [],
  externalItems: [],
  totalRevenue: 0,
  startDate: "",
  endDate: "",
  fetchRevenue: async () => {
    try {
      const res = await api3.get("/tracomm/transaction/revenue");
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
      // console.log("allItems", allItems);
      set({
        externalItems,
        internalRevenue: internal.revenue,
        externalRevenueTotal: externalTotal,
        totalRevenue: allTotal,
        items: allItems,
        startDate: result.start_date,
        endDate: result.end_date,
      });
    } catch (error) {
      console.error("Failed to fetch revenue data:", error);
    }
  },
}));
