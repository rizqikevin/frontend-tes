import React from "react";
import { SummaryCard } from "./SummaryCard";
import { GrowthPanel } from "./GrowthPanel";

export const SummaryPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0 ">
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-0">
        <SummaryCard
          title="Melintas"
          dateRange="01 Jan 2024 - 31 Des 2024"
          value={75500000}
        />
        <SummaryCard
          title="Keluar selain toll HMW"
          dateRange="01 Jan 2024 - 31 Des 2024"
          value={75500000}
        />
      </div>
      <GrowthPanel />
    </div>
  );
};
