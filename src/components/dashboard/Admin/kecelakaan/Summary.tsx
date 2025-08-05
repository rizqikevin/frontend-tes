import React from "react";
import KecelakaanPieChart from "./summary/KecelakaanPieChart";
import { KecelakaanBarChart } from "./summary/KecelakaanBarChart";
import LakaFatalityChart from "./summary/LakaFatalityChart";

export const Summary: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-2 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <KecelakaanPieChart />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row-12 mb-2">
            <KecelakaanBarChart />
          </div>
          <div className="flex flex-row-12">
            <LakaFatalityChart />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-5">{/* <ComparisonChart5 /> */}</div>
        </div>
      </div>
    </div>
  );
};
