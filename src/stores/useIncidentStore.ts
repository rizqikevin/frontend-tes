// src/stores/useIncidentStore.ts
import { create } from "zustand";

interface IncidentState {
  selectedDate: Date;
  page: number;
  limit: number;
  setSelectedDate: (date: Date) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useIncidentStore = create<IncidentState>((set) => ({
  selectedDate: new Date(),
  page: 1,
  limit: 10,
  setSelectedDate: (date) => set({ selectedDate: date, page: 1 }),
  setPage: (page: number | ((prev: number) => number)) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  setLimit: (limit) => set({ limit, page: 1 }),
}));
