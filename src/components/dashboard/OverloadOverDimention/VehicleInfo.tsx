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
}) => {
  return (
    <div className="bg-dashboard-accent rounded-lg p-4 shadow-sm text-xl h-full space-y-9">
      <h4 className="text-lg font-bold mb-8">Informasi Data Kendaraan</h4>
      <div className="grid grid-cols-2 gap-y-7 text-lg">
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
        <span>Data Over Load</span>
        <span>: {berat}</span>
        <span>Data Over Dimension </span>
        <span>: {dimensi}</span>
        <span>Status :</span>
      </div>
      <div className="bg-red-900 w-full h-20 flex items-center justify-center text-6xl font-bold rounded-lg">
        {status}
      </div>
      <div className="text-center grid grid-cols-1 mt-5">
        <button className="bg-yellow-400 text-black font-semibold w-full py-2 mt-16 rounded-md">
          Export
        </button>
      </div>
    </div>
  );
};
