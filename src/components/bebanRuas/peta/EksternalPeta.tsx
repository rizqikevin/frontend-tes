import { useRuasStore } from "@/stores/useBebanRuasStore";
import React, { useEffect } from "react";
import SeksiCard from "./SeksiCard";

const EksternalPeta: React.FC = () => {
  const ruasExternal = useRuasStore((state) => state.ruasExternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);
  const isLoading = useRuasStore((state) => state.isExternalLoading);

  useEffect(() => {
    fetchRuasData("external");
  }, [fetchRuasData]);

  if (isLoading && ruasExternal.length === 0) {
    // Show skeleton loaders
    const skeletonPositions = [
      { top: "80%", left: "55%" },
      { top: "60%", left: "55%" },
      { top: "41%", left: "55%" },
      { top: "15%", left: "51%" },
      { top: "23%", left: "33%" },
    ];

    return (
      <>
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
      </>
    );
  }

  return (
    <>
      {ruasExternal.map((ruas) => (
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
            realisasiLhr={ruas.realisasiLhr}
            variant="external"
          />
        </div>
      ))}
    </>
  );
};

export default EksternalPeta;
