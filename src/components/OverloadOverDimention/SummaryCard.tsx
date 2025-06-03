import React from "react";
import VehicleDoughnutChart from "./VehicleDoughnutChart";

type Props = {
  golongan: number;
  tanggal: string;
  total: number;
  patuh: number;
  tidakPatuh: number;
};

export const SummaryCard: React.FC<Props> = ({
  golongan,
  tanggal,
  total,
  patuh,
  tidakPatuh,
}) => {
  return (
    <div className="bg-dashboard-accent p-4 rounded-lg shadow-sm w-72">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Golongan {golongan}</p>
          <p className="text-sm text-gray-400">Tanggal: {tanggal}</p>
        </div>
        <VehicleDoughnutChart patuh={patuh} tidakPatuh={tidakPatuh} size={48} />
      </div>
      <div className="mt-4 text-sm space-y-1">
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-white font-semibold">
            <span className="text-lg leading-3"></span> Total Kendaraan
          </span>
          <span className="text-white">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-white">
            <span className="text-lg leading-3 text-green-500">●</span> Patuh
          </span>
          <span className="text-green-500">{patuh}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-white">
            <span className="text-lg leading-3 text-red-500">●</span> Tidak
            Patuh
          </span>
          <span className="text-red-500">{tidakPatuh}</span>
        </div>
      </div>
    </div>
  );
};
