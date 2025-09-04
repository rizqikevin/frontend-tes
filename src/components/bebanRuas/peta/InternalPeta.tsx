import { useRuasStore } from "@/stores/useBebanRuasStore";
import React, { useEffect } from "react";
import SeksiCard from "./SeksiCard";

const posisiMapping: { [key: number]: { top: string; left: string } } = {
  1: { top: "82%", left: "25%" },
  2: { top: "60%", left: "25%" },
  3: { top: "41%", left: "25%" },
  4: { top: "15%", left: "81%" },
  5: { top: "1000%", left: "59%" },
  6: { top: "42%", left: "57%" },
  7: { top: "23%", left: "33%" },
};

const InternalPeta: React.FC = () => {
  const ruasInternal = useRuasStore((state) => state.ruasInternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);
  const isLoading = useRuasStore((state) => state.isInternalLoading);

  useEffect(() => {
    fetchRuasData();
  }, [fetchRuasData]);

  if (isLoading && ruasInternal.length === 0) {
    return (
      <>
        {Object.values(posisiMapping).map((pos, index) => (
          <div
            key={index}
            className="absolute animate-pulse rounded-lg w-44 h-[88px] bg-gray-700/50"
            style={{
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {ruasInternal.map((ruas) => {
        const posisi = posisiMapping[ruas.id] || { top: "0%", left: "0%" };
        return (
          <div
            key={ruas.id}
            className="absolute"
            style={{
              top: posisi.top,
              left: posisi.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <SeksiCard
              name={ruas.name}
              persen={ruas.persen}
              binisPlanLhr={ruas.binisPlanLhr}
              realisasiLhr={ruas.realisasiLhr}
            />
          </div>
        );
      })}
    </>
  );
};

export default InternalPeta;