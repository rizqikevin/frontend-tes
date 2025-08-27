import React from "react";
import StripMapsChart from "./detail/StripMapsChart";
import MultiXAxisChart from "./detail/MultiXAxisBarChart";

const DetailKecelakaan: React.FC = () => {
  return (
    <div className=" text-white p-0 space-y-4 ">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="flex flex-col gap-3">
          <div className=" bg-dashboard-accent rounded-lg">
            <StripMapsChart
              title="STRIP MAPS KECELAKAAN"
              labels={[
                ["GT", "Kuala Tjg"],
                ["KM", "92 T"],
                ["KM", "94 T"],
                ["KM", "96 T"],
                ["GT", "Tebing Tinggi"],
                ["KM", "100 S"],
                ["KM", "102 S"],
                ["GT", "Sinaksak"],
              ]}
              datasets={[
                {
                  label: "Jalur A",
                  data: [7, 6, 8, 7, 6, 7, 8, 7],
                  backgroundColor: "#2196f3",
                },
                {
                  label: "Jalur B",
                  data: [12, 13, 11, 12, 13, 12, 11, 13],
                  backgroundColor: "#ff9800",
                },
              ]}
            />{" "}
          </div>
          <div className=" bg-dashboard-accent rounded-lg">
            <MultiXAxisChart
              title="DETAIL PENYEBAB KECELAKAAN"
              labels={[
                { sub: "Kurang Antisipasi", group: "Pengemudi" },
                { sub: "Lengah", group: "Pengemudi" },
                { sub: "Mengantuk", group: "Pengemudi" },
                { sub: "Mabuk", group: "Pengemudi" },
                { sub: "Pecah Ban", group: "Kendaraan" },
                { sub: "Rem Blong", group: "Kendaraan" },
                { sub: "Lain-lain", group: "Kendaraan" },
                { sub: "Kerusakan Jalan", group: "Jalan" },
                { sub: "Perlengkapan Jalan", group: "Jalan" },
                { sub: "Hewan", group: "Lingkungan" },
                { sub: "Material Jalan", group: "Lingkungan" },
              ]}
              datasets={[
                {
                  label: "Bulan lalu Jumlah",
                  data: [6, 5, 7, 4, 5, 6, 3, 4, 5, 2, 3, 4],
                  backgroundColor: "#2196f3",
                },
                {
                  label: "Bulan ini Jumlah",
                  data: [14, 13, 12, 10, 11, 13, 8, 9, 7, 6, 5, 7],
                  backgroundColor: "#ff9800",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKecelakaan;
