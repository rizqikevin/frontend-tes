import { create } from "zustand";

interface DateFilterState {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setDateRange: (start: Date, end: Date) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setDateRange: (start, end) => set({ startDate: start, endDate: end }),
}));
