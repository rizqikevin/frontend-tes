import React from "react";

interface SeksiCardProps {
  name: string;
  panjang: number;
  persen: number;
  nilaiA: number;
  nilaiB: number;
}

const SeksiCard: React.FC<SeksiCardProps> = ({
  name,
  panjang,
  persen,
  nilaiA,
  nilaiB,
}) => {
  return (
    <div className="w-44 bg-gray-100 border border-white shadow-md text-black">
      <div className="px-2 py-1 font-semibold text-sm text-center">
        {name} ({panjang.toLocaleString("id-ID")}Km)
      </div>
      <div className="flex h-16">
        <div className="flex-1 bg-red-600 text-white font-bold text-xl flex items-center justify-center">
          {persen}%
        </div>
        <div className="flex flex-col flex-1 text-center text-white text-sm font-bold">
          <div className="bg-blue-500 flex-1 flex items-center justify-center">
            {nilaiA.toLocaleString("id-ID")}
          </div>
          <div className="bg-white text-black flex-1 flex items-center justify-center">
            {nilaiB.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeksiCard;
