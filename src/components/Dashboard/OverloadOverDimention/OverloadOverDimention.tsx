import React from "react";
import { SummaryCard } from "./SummaryCard";
import { ImageCard } from "./ImageCard";
import { VehicleInfo } from "./VehicleInfo";
import { VehichleDougnut } from "./VehicleDougnut";

export const OverloadOverDimention: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4 space-y-4">
      {/* Ringkasan per golongan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((golongan) => (
          <SummaryCard
            key={golongan}
            golongan={golongan}
            tanggal="27 February, 2025"
            total={500}
            patuh={1248}
            tidakPatuh={90}
          />
        ))}
      </div>

      {/* Baris utama - 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kolom gambar */}
        <div className="space-y-4">
          <ImageCard
            title="Gambar Transaksi"
            imageUrl="https://imgx.gridoto.com/crop/3x34:891x460/750x500/photo/2018/12/29/129762105.jpg"
          />
          <ImageCard
            title="Gambar Plat Nomor (ANPR)"
            imageUrl="https://imgx.gridoto.com/crop/0x0:700x393/700x465/photo/gridoto/2018/05/21/2594849356.jpg"
          />
        </div>

        {/* Kolom informasi kendaraan */}
        <VehicleInfo />

        {/* Kolom grafik total */}
        <VehichleDougnut />
      </div>
    </div>
  );
};
