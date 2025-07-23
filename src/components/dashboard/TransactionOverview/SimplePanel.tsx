import React from "react";

interface SimplePanelProps {
  title: string;
  value: string;
  dateRange: string;
  title2?: string;
  value2?: string;
  title3?: string;
  value3?: string;
}

export const SimplePanel: React.FC<SimplePanelProps> = ({
  title,
  value,
  dateRange,
  title2,
  value2,
  title3,
  value3,
}) => {
  return (
    <div className="bg-dashboard-accent p-4  h-full w-full text-white shadow-sm flex flex-col justify-start">
      <div>
        <p className="text-xs text-gray-400 flex justify-end mb-1">
          Tanggal: {dateRange}
        </p>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-400 mb-3 mt-1">Total Pendapatan</p>
        <p className="text-2xl font-bold mt-1 mb-3">{value}</p>
        <hr className=" border-white mb-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title2}</h3>
        <p className="text-xs text-gray-400 mb-1 mt-1">Pendapatan</p>
        <p className="text-2xl font-bold mt-1 mb-3">{value2}</p>
        <hr className=" border-white mb-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title3}</h3>
        <p className="text-xs text-gray-400 mb-1 mt-1">Total Pendapatan</p>
        <p className="text-2xl font-bold ">{value3}</p>
      </div>
    </div>
  );
};
