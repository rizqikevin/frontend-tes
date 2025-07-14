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
}) => {
  return (
    <div className="bg-dashboard-accent rounded-lg p-4 shadow-sm text-sm max-w-xl space-y-9">
      <h4 className="text-base font-semibold mb-8">Informasi Data Kendaraan</h4>
      <div className="grid grid-cols-2 gap-y-7">
        <span>Gerbang :</span>
        <span className="font-semibold">{gerbang}</span>
        <span>Gardu :</span>
        <span>{gardu}</span>
        <span>Nomor Resi :</span>
        <span>{noresi}</span>
        <span>Plat Nomor :</span>
        <span>{platnomor}</span>
        <span>Tanggal Transaksi :</span>
        <span>{new Date(tanggal).toLocaleDateString("id-ID")}</span>
        <span>Waktu Transaksi :</span>
        <span>{jam}</span>
        <span>Nomor Kartu :</span>
        <span>{kartu}</span>
        <span>Golongan :</span>
        <span>{golongan}</span>
        <span>Data Over Load :</span>
        <span>{berat}</span>
        <span>Data Over Dimension :</span>
        <span>{dimensi}</span>
      </div>
      <div className="text-center mt-5">
        <button className="bg-yellow-400 text-black font-semibold px-52 py-2 mt-24 rounded-md">
          Export
        </button>
      </div>
    </div>
  );
};
