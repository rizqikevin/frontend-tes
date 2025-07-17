import { create } from "zustand";
import { api } from "@/services/api";
import { toast } from "sonner";

interface DataCctv {
  id: number;
  group_id: string;
  name: string;
  url_local: string;
  latitude: string;
  longitude: string;
  description: string;
  status_id: number;
}

interface CctvState {
  cctv: DataCctv[];
  fetchCctv: () => Promise<void>;
  createCctv: (data: DataCctv) => Promise<void>;
  deleteCctv: (id: number) => Promise<void>;
  updateCctv: (id: number, data: DataCctv) => Promise<void>;
  selectedCctv: DataCctv | null;
  setSelectedCctv: (cctv: DataCctv | null) => void;
  isCctvLoading: boolean;
  error: string | null;
}

export const useCctvStore = create<CctvState>((set) => ({
  cctv: [],
  fetchCctv: async () => {
    set({ isCctvLoading: true });
    try {
      const response = await api.get("/cctv");
      set({ cctv: response.data, isCctvLoading: false });
    } catch (error) {
      toast.error(error);
      set({ isCctvLoading: false });
    }
  },
  createCctv: async (data: DataCctv) => {
    try {
      await api.post("/cctv", data);
      toast.success("CCTV created successfully");
      await useCctvStore.getState().fetchCctv();
    } catch (error) {
      toast.error(error);
    }
  },
  deleteCctv: async (id: number) => {
    try {
      await api.delete(`/cctv/${id}`);
      toast.success("CCTV deleted successfully");
      await useCctvStore.getState().fetchCctv();
    } catch (error) {
      toast.error(error);
    }
  },
  updateCctv: async (id: number, data: DataCctv) => {
    try {
      await api.put(`/cctv/${id}`, data);
      toast.success("CCTV updated successfully");
      await useCctvStore.getState().fetchCctv();
    } catch (error) {
      toast.error(error);
    }
  },
  selectedCctv: null,
  setSelectedCctv: (cctv: DataCctv | null) => set({ selectedCctv: cctv }),
  isCctvLoading: false,
  error: null,
}));

interface StatusCctv {
  id: number;
  name: string;
  description: string;
  status: number;
}

interface StatusCctvState {
  statusCctv: StatusCctv[];
  fetchStatusCctv: () => Promise<void>;
  createStatusCctv: (data: StatusCctv) => Promise<void>;
  deleteStatusCctv: (id: number) => Promise<void>;
  updateStatusCctv: (id: number, data: StatusCctv) => Promise<void>;
  selectedStatusCctv: StatusCctv | null;
  setSelectedStatusCctv: (statusCctv: StatusCctv | null) => void;
  isStatusCctvLoading: boolean;
  error: string | null;
}

export const useStatusCctvStore = create<StatusCctvState>((set) => ({
  statusCctv: [],
  fetchStatusCctv: async () => {
    try {
      set({ isStatusCctvLoading: true });
      const response = await api.get("/cctv/status");
      set({ statusCctv: response.data, isStatusCctvLoading: false });
    } catch (error) {
      toast.error(error);
      set({ isStatusCctvLoading: false });
    }
  },
  createStatusCctv: async (data: StatusCctv) => {
    try {
      await api.post("/cctv/status", data);
      toast.success("Status CCTV created successfully");
      await useStatusCctvStore.getState().fetchStatusCctv();
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isStatusCctvLoading: false });
    }
  },
  deleteStatusCctv: async (id: number) => {
    try {
      await api.delete(`/cctv/status/${id}`);
      toast.success("Status CCTV deleted successfully");
      await useStatusCctvStore.getState().fetchStatusCctv();
    } catch (error) {
      toast.error(error);
    }
  },
  updateStatusCctv: async (id: number, data: StatusCctv) => {
    try {
      await api.put(`/cctv/status/${id}`, data);
      toast.success("Status CCTV updated successfully");
      await useStatusCctvStore.getState().fetchStatusCctv();
    } catch (error) {
      toast.error(error);
    }
  },
  selectedStatusCctv: null,
  setSelectedStatusCctv: (statusCctv: StatusCctv | null) =>
    set({ selectedStatusCctv: statusCctv }),
  isStatusCctvLoading: false,
  error: null,
}));
