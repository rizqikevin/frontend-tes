import React from "react";

interface SummaryCardProps {
  title: string;
  dateRange: string;
  value: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  dateRange,
  value,
}) => {
  return (
    <div className="bg-dashboard-accent p-4 text-white shadow-md w-full">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-gray-400">{dateRange}</div>
      <div className="mt-4">
        <div className="text-sm text-gray-400">Pendapatan</div>
        <div className="text-xl font-bold text-white">
          Rp {value.toLocaleString("id-ID")}
        </div>
      </div>
      <hr className="my-3 border-gray-600" />
    </div>
  );
};
