import React from "react";

interface SeksiCardProps {
  name?: string;
  persen?: number;
  binisPlanLhr?: number;
  realisasiLhr?: number;
  variant?: "internal" | "external";
}

const SeksiCard: React.FC<SeksiCardProps> = ({
  name,
  persen,
  binisPlanLhr,
  realisasiLhr,
  variant = "internal",
}) => {
  if (variant === "external") {
    return (
      <div className="w-32 @lg:w-44 bg-gray-100 border border-white shadow-md text-black">
        <div className="px-2 py-1 font-semibold text-xs @lg:text-sm text-center">
          {name}
        </div>
        <div className="flex h-12 @lg:h-16">
          <div className="flex-1 bg-red-500 text-white font-bold text-lg @lg:text-xl flex items-center justify-center">
            {realisasiLhr?.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-32 @lg:w-44 bg-gray-100 border border-white shadow-md text-black">
      <div className="px-2 py-1 font-semibold text-xs @lg:text-sm text-center">{name}</div>
      <div className="flex h-12 @lg:h-16">
        <div className="flex-1 bg-red-600 text-white font-bold text-lg @lg:text-xl flex items-center justify-center">
          {persen}%
        </div>
        <div className="flex flex-col flex-1 text-center text-white text-xs @lg:text-sm font-bold">
          <div className="bg-blue-500 flex-1 flex items-center justify-center">
            {binisPlanLhr?.toLocaleString("id-ID")}
          </div>
          <div className="bg-white text-black flex-1 flex items-center justify-center">
            {realisasiLhr?.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeksiCard;
