import React from "react";
import { VehichleDougnut } from "./VehicleDougnut";
import { ComparisonChart1 } from "./ComparisonChart1";
import { ComparisonChart2 } from "./ComparisonChart2";
import { ComparisonChart3 } from "./ComparisonChart3";
import { ComparisonChart4 } from "./ComparisonChart4";
import { ComparisonChart5 } from "./ComparisonChart5";
import { VehicleSummaryPanel } from "./VehicleSummaryPanel";
import VehicleStatusCard from "./VehicleStatusCard";

export const OverloadOverDimention: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* Kolom grafik total */}
        <VehichleDougnut />
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-row gap-4 justify-between">
            <div className="w-full h-full">
              <VehicleSummaryPanel />
            </div>

            <div className="w-full">
              <VehicleStatusCard />
            </div>
          </div>

          <div className="w-full"></div>
          <div className="flex flex-row-12">
            <ComparisonChart1 />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <ComparisonChart5 />
          </div>
          <div className="col-span-4">
            <ComparisonChart2 />
          </div>
          <div className="col-span-3">
            <ComparisonChart3 />
          </div>
        </div>
      </div>
    </div>
  );
};
