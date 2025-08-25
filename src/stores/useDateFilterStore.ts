import { create } from "zustand";
import { subDays } from "date-fns";

interface DateFilterState {
  start_date: string | Date;
  end_date: string | Date;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setDateRange: (start: Date, end: Date) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  start_date: subDays(new Date(), 1).toISOString().split("T")[0] || new Date(),
  end_date: subDays(new Date(), 1).toISOString().split("T")[0] || new Date(),
  setStartDate: (date) => set({ start_date: date }),
  setEndDate: (date) => set({ end_date: date }),
  setDateRange: (start, end) => {
    set({
      start_date: start.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0],
    });
  },
}));
