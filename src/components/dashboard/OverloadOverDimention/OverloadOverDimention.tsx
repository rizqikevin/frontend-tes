import React from "react";
import { VehichleDougnut } from "./VehicleDougnut";
import { ComparisonChart1 } from "./ComparisonChart1";
import { ComparisonChart2 } from "./ComparisonChart2";
import { ComparisonChart3 } from "./ComparisonChart3";
import { ComparisonChart4 } from "./ComparisonChart4";

export const OverloadOverDimention: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* Kolom grafik total */}
        <VehichleDougnut />

        <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-col-2 gap-2">
            <ComparisonChart1 />
            <ComparisonChart2 />
          </div>
          <div className="grid grid-cols-1 md:grid-col-2 gap-2">
            <ComparisonChart4 />
            <ComparisonChart3 />
          </div>
        </div>
      </div>
    </div>
  );
};
