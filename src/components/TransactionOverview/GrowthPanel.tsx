import React from "react";

export const GrowthPanel: React.FC = () => {
  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full md:w-40 h-full">
      <div className="text-sm font-semibold mb-4 leading-tight">
        Akumulasi Pertumbuhan dan <p>Penurunan</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-green-400">
            <span className="text-lg leading-3">✓</span> RKAP
          </span>
          <span className="text-white">100%</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-green-400">
            <span className="text-lg leading-3">✓</span> Prognosa
          </span>
          <span className="text-white">100%</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-red-500">
            <span className="text-lg leading-3">✗</span> Business Plan
          </span>
          <span className="text-white">21%</span>
        </div>
      </div>
    </div>
  );
};
