import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface VehicleInfoProps {
  gerbang: string;
  gardu: string;
  noresi: number;
  platnomor: string;
  tanggal: string;
  jam: string;
  kartu: string;
  golongan: string;
  berat: string;
  dimensi: string;
  status: string;
  StandarJBI?: string;
  OverWeight?: string;
}

export const VehicleInfo: React.FC<VehicleInfoProps> = ({
  gerbang,
  gardu,
  noresi,
  platnomor,
  tanggal,
  jam,
  kartu,
  golongan,
  berat,
  dimensi,
  status,
  StandarJBI,
  OverWeight,
}) => {
  const handleExport = () => {
    const data = [
      {
        Gerbang: gerbang,
        Gardu: gardu,
        "Nomor Resi": noresi,
        "Plat Nomor": platnomor,
        "Tanggal Transaksi": new Date(tanggal).toLocaleDateString("id-ID"),
        "Waktu Transaksi": jam,
        "Nomor Kartu": kartu,
        Golongan: golongan,
        "Data Over Load": berat,
        "Data Over Dimension": dimensi,
        Status: status,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Kendaraan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `data_kendaraan_${platnomor}.xlsx`);
  };

  const formatNumber = (value?: string) => {
    if (!value || value === "N/A") return "N/A";
    const number = parseInt(value, 10);
    if (isNaN(number)) return value;
    return number.toLocaleString("id-ID");
  };

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 shadow-sm text-xl h-full flex flex-col">
      <div className="flex-grow space-y-4">
        <h4 className="text-lg font-bold">Informasi Data Kendaraan</h4>
        <div className="grid grid-cols-2 gap-y-5 text-lg">
          <span>Gerbang</span>
          <span className="font-semibold">: {gerbang}</span>
          <span>Gardu</span>
          <span>: {gardu}</span>
          <span>Nomor Resi</span>
          <span>: {noresi}</span>
          <span>Plat Nomor</span>
          <span>: {platnomor}</span>
          <span>Tanggal Transaksi</span>
          <span>: {new Date(tanggal).toLocaleDateString("id-ID")}</span>
          <span>Waktu Transaksi</span>
          <span>: {jam}</span>
          <span>Nomor Kartu</span>
          <span>: {kartu}</span>
          <span>Golongan</span>
          <span>: {golongan}</span>
          <span>Data Berat</span>
          <span>: {formatNumber(berat)} Kg</span>
          <span>Standar JBI</span>
          <span>: {formatNumber(StandarJBI)} Kg</span>
          <span>Kelebihan Beban</span>
          <span>: {formatNumber(OverWeight)} Kg</span>
          <span>Data Dimensi (Lebar x Tinggi) </span>
          <span>: {dimensi.slice(5)}</span>
          <span>Status :</span>
        </div>
        {status === "PATUH" && (
          <div className="bg-green-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
            Patuh
          </div>
        )}
        {status === "OD" && (
          <div className="bg-red-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
            Over Dimention
          </div>
        )}
        {status === "OL" && (
          <div className="bg-red-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
            Overload
          </div>
        )}
        {status === "ODOL" && (
          <div className="bg-red-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
            Overload-Overdimention
          </div>
        )}
        {!status && (
          <div className="bg-red-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
            Tidak Diketahui
          </div>
        )}
      </div>

      <div className="text-center mt-auto pt-4">
        <button
          className="bg-yellow-400 text-black font-semibold w-full py-2 rounded-md"
          onClick={handleExport}
        >
          Export
        </button>
      </div>
    </div>
  );
};
