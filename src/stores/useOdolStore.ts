// stores/useOdolStore.ts
import { create } from "zustand";
import api from "@/services/api";
import dayjs from "dayjs";
import { toast } from "sonner";

interface OdolData {
  id: string;
  gerbang: string;
  gardu: string;
  noresi: number;
  platnomor: string;
  tanggal: string;
  jam: string;
  kartu: string;
  golongan: string;
  berat: string;
  dimensi: string;
  url1: string;
  url2: string;
}

interface OdolStore {
  data: OdolData[];
  total: number;
  loading: boolean;
  page: number;
  limit: number;
  startDate: Date;
  endDate: Date;
  gateId: string;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setGateId: (id: string) => void;
  fetchData: () => void;
}

export const useOdolStore = create<OdolStore>((set, get) => ({
  data: [],
  total: 0,
  loading: false,
  page: 1,
  limit: 10,
  startDate: new Date(),
  endDate: new Date(),
  gateId: "",

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setGateId: (id) => set({ gateId: id }),

  fetchData: async () => {
    set({ loading: true });
    const { startDate, endDate, page, limit, gateId } = get();
    try {
      const res = await api.get("/odol", {
        params: {
          start_time: dayjs(startDate).format("YYYY-MM-DD"),
          end_time: dayjs(endDate).format("YYYY-MM-DD"),
          ...(gateId ? { gate: gateId } : {}),
        },
      });

      const result: OdolData[] = res.data.data;
      const paginated = result.slice((page - 1) * limit, page * limit);

      set({ data: paginated, total: result.length });
    } catch (error) {
      toast.error("Gagal memuat data ODOL", error);
    } finally {
      set({ loading: false });
    }
  },
}));
