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
    <div className="bg-dashboard-accent p-4  h-full w-full text-white shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">Tanggal: {dateRange}</p>
      </div>
      <p className="text-2xl font-bold mt-4">{value}</p>
    </div>
  );
};
