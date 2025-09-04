import { useRuasStore } from "@/stores/useBebanRuasStore";
import React, { useEffect } from "react";
import SeksiCard from "./SeksiCard";

const posisiMappingexternal: {
  [key: number]: { top: string; left: string };
} = {
  21: { top: "41%", left: "65%" }, // JMT
  22: { top: "25%", left: "24%" }, // BALMERA
  23: { top: "81%", left: "42%" }, // BINJAI-STABAT
  24: { top: "15%", left: "88%" }, // INDAPURA-KISARAN
  25: { top: "61%", left: "20%" }, // MEDAN-BINJAI
};

const EksternalPeta: React.FC = () => {
  const ruasExternal = useRuasStore((state) => state.ruasExternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);
  const isLoading = useRuasStore((state) => state.isExternalLoading);

  useEffect(() => {
    fetchRuasData("external");
  }, [fetchRuasData]);

  if (isLoading && ruasExternal.length === 0) {
    return (
      <>
        {Object.values(posisiMappingexternal).map((pos, index) => (
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
      {ruasExternal.map((ruas) => {
        const posisi = posisiMappingexternal[ruas.id] || {
          top: "0%",
          left: "0%",
        };
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
              realisasiLhr={ruas.realisasiLhr}
              variant="external"
            />
          </div>
        );
      })}
    </>
  );
};

export default EksternalPeta;
