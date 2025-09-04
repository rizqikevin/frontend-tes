import { create } from "zustand";
import { api2 } from "@/services/api";

interface SegmentTarget {
  target_name: string;
  lhr: number;
  total_lhr: number;
}

interface Segment {
  segment_id: number;
  segment_name: string;
  branch_code: string;
  load: number;
  lhr: number;
  target: SegmentTarget[];
}

interface RuasData {
  id: number;
  name: string;
  persen: number;
  binisPlanLhr: number;
  realisasiLhr: number;
  posisi: { top: string; left: string };
}

interface RuasState {
  ruasInternal: RuasData[];
  ruasExternal: RuasData[];
  isInternalLoading: boolean;
  isExternalLoading: boolean;
  fetchRuasData: (segment?: "external") => Promise<void>;
}

export const useRuasStore = create<RuasState>((set) => ({
  ruasInternal: [],
  ruasExternal: [],
  isInternalLoading: false,
  isExternalLoading: false,

  fetchRuasData: async (segment?: "external") => {
    const posisiMapping: { [key: number]: { top: string; left: string } } = {
      1: { top: "82%", left: "25%" },
      2: { top: "60%", left: "25%" },
      3: { top: "41%", left: "25%" },
      4: { top: "15%", left: "81%" },
      5: { top: "1000%", left: "59%" },
      6: { top: "42%", left: "57%" },
      7: { top: "23%", left: "33%" },
    };

    const posisiMappingexternal: {
      [key: number]: { top: string; left: string };
    } = {
      8: { top: "80%", left: "55%" }, // JMT
      9: { top: "25%", left: "10%" }, // BALMERA
      10: { top: "41%", left: "55%" }, // BINJAI-STABAT
      11: { top: "25%", left: "80%" }, // INDAPURA-KISARAN
      12: { top: "15%", left: "51%" }, // MEDAN-BINJAI
    };

    try {
      if (segment === "external") {
        set({ isExternalLoading: true });
      } else {
        set({ isInternalLoading: true });
      }

      const response = await api2.get("/tracomm/transaction/segment/load", {
        params: {
          start_date: new Date().toISOString().split("T")[0],
          end_date: new Date().toISOString().split("T")[0],
          freq: "yearly",
          segment,
        },
      });

      const data: Segment[] = response.data?.data?.segment_load || [];
      if (!Array.isArray(data)) {
        if (segment === "external") {
          set({ isExternalLoading: false });
        } else {
          set({ isInternalLoading: false });
        }
        return;
      }

      if (segment === "external") {
        const ruasExternal = data.map((seg) => {
          return {
            id: seg.segment_id,
            name: seg.segment_name,
            persen: 0,
            binisPlanLhr: 0,
            realisasiLhr: Math.round(seg.lhr),
            posisi: posisiMappingexternal[seg.segment_id] || {
              top: "0%",
              left: "0%",
            },
          };
        });
        set({ ruasExternal: ruasExternal, isExternalLoading: false });
      } else {
        const ruasInternal = data.map((seg) => {
          const targetBussinesPlan = seg.target.find(
            (t) => t.target_name === "BUSSINES PLAN"
          );

          const persen = targetBussinesPlan
            ? Math.round((seg.lhr / targetBussinesPlan.lhr) * 100)
            : 0;

          return {
            id: seg.segment_id,
            name: seg.segment_name,
            persen,
            binisPlanLhr: targetBussinesPlan?.lhr ?? 0,
            realisasiLhr: Math.round(seg.lhr),
            posisi: posisiMapping[seg.segment_id] || { top: "0%", left: "0%" },
          };
        });
        set({ ruasInternal: ruasInternal, isInternalLoading: false });
      }
    } catch (error) {
      console.error("Failed to load segment data:", error);
      if (segment === "external") {
        set({ isExternalLoading: false });
      } else {
        set({ isInternalLoading: false });
      }
    }
  },
}));
