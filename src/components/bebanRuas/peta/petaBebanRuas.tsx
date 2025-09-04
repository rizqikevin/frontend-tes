import { useEffect, useState } from "react";
import SeksiCard from "@/components/bebanRuas/peta/SeksiCard";
import Legend from "@/components/bebanRuas/peta/Legend";
import { useRuasStore } from "@/stores/useBebanRuasStore";
import InternalPeta from "./InternalPeta";

import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import EksternalPeta from "./EksternalPeta";

export const PetaBebanRuas: React.FC = () => {
  const [selectView, setSelectView] = useState("internal");
  const ruasExternal = useRuasStore((state) => state.ruasExternal);
  const fetchRuasData = useRuasStore((state) => state.fetchRuasData);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchRuasData();
      await fetchRuasData("external");
    };
    fetchAll();
  }, [fetchRuasData]);

  const renderContent = () => {
    switch (selectView) {
      case "internal":
        return <InternalPeta />;
      case "external":
        return <EksternalPeta />;
      default:
      case "internal":
    }
  };

  const display = selectView === "internal" ? "internal" : "external";

  return (
    <>
      <div className="bg-dashboard-dark text-white">
        <div className="flex flex-row justify-between mb-3">
          <div className="flex flex-col">
            <h1 className="text-2xl text-white font-bold">
              Beban Ruas Tahun 2025
            </h1>
            <p className="text-xs font-semibold text-gray-400">
              Pantau Detail dari setiap ruas
            </p>
          </div>
          <div className="flex">
            <Select value={selectView} onValueChange={setSelectView}>
              <SelectTrigger className="bg-dashboard-accent rounded-lg w-48">
                <SelectValue placeholder="Beban Ruas Internal" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-accent">
                <SelectItem value="internal">Beban Ruas Internal</SelectItem>
                <SelectItem value="external">Beban Ruas Eksternal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative w-full h-[90vh] bg-dashboard-accent rounded-lg">
          <img
            src="/gate/tolgatemap.svg"
            alt="Gate Mapping"
            className="absolute w-full h-full object-contain pointer-events-none select-none"
          />

          {renderContent()}

          {display === "internal" ? (
            <Legend
              titleRed="Pencapaian BP/Real"
              titleBlue="Bisnis Plan LHR"
              titleWhite="Realisasi LHR"
            />
          ) : (
            <Legend
              titleRed="Pencapaian BP/Real"
              titleBlue="Beban Ruas"
              titleWhite="Nama Ruas"
            />
          )}
        </div>
      </div>
    </>
  );
};
