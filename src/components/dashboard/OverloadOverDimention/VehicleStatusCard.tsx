import React, { useState, useEffect } from "react";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import api from "@/services/api";

interface VehicleStatus {
  total_odol: number;
  total_od: number;
  total_ol: number;
  total_normal: number;
  total: number;
}

const VehicleStatusCard: React.FC = () => {
  const { start_date, end_date } = useDateFilterStore();
  const [data, setData] = useState<VehicleStatus>({
    total_odol: 0,
    total_od: 0,
    total_ol: 0,
    total_normal: 0,
    total: 0,
  });

  console.log(start_date, end_date);

  const fetchVehicleStatusData = async () => {
    try {
      const response = await api.get("/odol/status", {
        params: {
          start_time: start_date,
          end_time: end_date,
        },
      });

      const fetched = response.data.data?.[0];
      if (fetched) {
        setData({
          total_odol: parseInt(fetched.total_odol),
          total_od: parseInt(fetched.total_od),
          total_ol: parseInt(fetched.total_ol),
          total_normal: parseInt(fetched.total_normal),
          total: parseInt(fetched.total),
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle status data:", error);
    }
  };

  useEffect(() => {
    fetchVehicleStatusData();
  }, [start_date, end_date]);

  const statusData = [
    { label: "ODOL", value: data.total_odol, color: "bg-red-600" },
    { label: "OD", value: data.total_od, color: "bg-yellow-400" },
    { label: "OL", value: data.total_ol, color: "bg-orange-500" },
    { label: "Normal", value: data.total_normal, color: "bg-green-500" },
  ];

  const totalTidakPatuh = data.total_odol + data.total_od + data.total_ol;

  return (
    <div className="bg-[#2D2D2D] p-4 rounded-lg text-white w-full">
      <h2 className="text-xl font-semibold mb-4">Status Kendaraan</h2>

      <div className="space-y-2 mb-5 text-sm">
        {statusData.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
            <span className="text-sm">{item.value} Kendaraan</span>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <div className="text-sm text-gray-400 mb-1">
          Total Kendaraan Tidak Patuh
        </div>
        <div className="text-sm font-bold">{totalTidakPatuh} Kendaraan</div>
      </div>

      <div className="mb-2">
        <div className="text-sm text-gray-400 mb-1">Total Normal</div>
        <div className="text-sm font-bold">{data.total_normal} Kendaraan</div>
      </div>
    </div>
  );
};

export default VehicleStatusCard;
