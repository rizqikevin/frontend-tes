const statusData = [
  { label: "ODOL", value: 2100, color: "bg-red-600" },
  { label: "OD", value: 1000, color: "bg-yellow-400" },
  { label: "OL", value: 443, color: "bg-orange-500" },
];

const VehicleStatusCard: React.FC = () => {
  const totalTidakPatuh = statusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-[#2D2D2D] p-4 rounded-lg text-white w-full">
      <h2 className="text-sm font-semibold mb-4">Status Kendaraan</h2>

      <div className="space-y-2 mb-5">
        {statusData.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
            <span className="text-sm">
              {item.value.toLocaleString("id-ID")} Kendaraan
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs text-gray-400 mb-2">
          Total Kendaraan tidak Patuh
        </div>
        <div className="text-xl font-bold">
          {totalTidakPatuh.toLocaleString("id-ID")} Kendaraan
        </div>
      </div>
    </div>
  );
};

export default VehicleStatusCard;
