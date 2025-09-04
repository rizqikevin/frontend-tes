import { useRuasStore } from "@/stores/useBebanRuasStore";
import React, { useEffect } from "react";
import SeksiCard from "./SeksiCard";
import Legend from "./Legend";

const InternalPeta: React.FC = () => {
  const ruasInternal = useRuasStore((state) => state.ruasInternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);
  const isLoading = useRuasStore((state) => state.isInternalLoading);

  useEffect(() => {
    fetchRuasData();
  }, [fetchRuasData]);

  if (isLoading && ruasInternal.length === 0) {
    // Show skeleton loaders
    const skeletonPositions = [
      { top: "85%", left: "25%" },
      { top: "60%", left: "25%" },
      { top: "41%", left: "25%" },
      { top: "42%", left: "57%" },
      { top: "23%", left: "33%" },
    ];

    return (
      <>
        <div className="relative w-full h-[90vh] bg-dashboard-accent rounded-lg">
          <img
            src="/gate/tolgatemap.svg"
            alt="Gate Mapping"
            className="absolute w-full h-full object-contain pointer-events-none select-none"
          />

          {skeletonPositions.map((pos, index) => (
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
          <Legend />
        </div>
      </>
    );
  }

  return (
    <>
      {ruasInternal.map((ruas) => (
        <div
          key={ruas.id}
          className="absolute"
          style={{
            top: ruas.posisi.top,
            left: ruas.posisi.left,
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
      ))}
    </>
  );
};

export default InternalPeta;
