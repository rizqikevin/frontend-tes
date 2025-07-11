export const VehicleInfo: React.FC = () => {
  return (
    <div className="bg-dashboard-accent rounded-lg p-4 shadow-sm text-sm max-w-xl space-y-9">
      <h4 className="text-base font-semibold mb-8">Informasi Data Kendaraan</h4>
      <div className="grid grid-cols-2 gap-y-10">
        <span>Gerbang :</span>
        <span className="font-semibold">Tebing Tinggi</span>
        <span>Gardu :</span>
        <span>05</span>
        <span>Nomor Resi :</span>
        <span>244673</span>
        <span>Plat Nomor :</span>
        <span>BK8907GK</span>
        <span>Tanggal Transaksi :</span>
        <span>20/04/2025</span>
        <span>Waktu Transaksi :</span>
        <span>06:06:30</span>
        <span>Nomor Kartu :</span>
        <span>6013500615176501</span>
        <span>Golongan :</span>
        <span>5</span>
        <span>Data Over Load :</span>
        <span>30 Ton</span>
        <span>Data Over Dimension :</span>
        <span>15x5x3 Meter</span>
      </div>
      <div className="text-center mt-5">
        <button className="bg-yellow-400 text-black font-semibold px-52 py-2 mt-24 rounded-md">
          Export
        </button>
      </div>
    </div>
  );
};
