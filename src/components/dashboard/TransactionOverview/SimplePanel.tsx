import React from "react";

interface SimplePanelProps {
  title: string;
  value: string;
  dateRange: string;
}

export const SimplePanel: React.FC<SimplePanelProps> = ({
  title,
  value,
  dateRange,
}) => {
  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full">
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-2">Tanggal: {dateRange}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
};
