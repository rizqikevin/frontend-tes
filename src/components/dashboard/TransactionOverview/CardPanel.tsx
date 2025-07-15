import React from "react";

interface CardPanelProps {
  title: string;
  value: number;
  percentage: number;
  location: string;
  dateRange: string;
}

export const CardPanel: React.FC<CardPanelProps> = ({
  value,
  location,
  dateRange,
}) => {
  const formatCurrency = (value: number) =>
    `Rp ${value
      .toLocaleString("id-ID")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;

  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-full h-full flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14">
          <img src="/icons/tol_gate.svg" alt="Gate" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold"></div>
        </div>

        <div className="flex-1">
          <div className="font-semibold text-sm truncate">{location}</div>
          <div className="text-[10px] text-gray-400">{dateRange}</div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-400">Pendapatan</p>
        <p className="text-xl font-bold">{formatCurrency(value)}</p>
      </div>
    </div>
  );
};
