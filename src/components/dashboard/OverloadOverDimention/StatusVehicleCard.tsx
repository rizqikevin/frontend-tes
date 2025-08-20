import api from "@/services/api";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import React, { useEffect, useState } from "react";

interface StatusVehicleCardProps {
  title: string;
  value: number;
  title2?: string;
  value2?: number;
  title3?: string;
  value3?: number;
  percentage?: number;
  percentage2?: number;
}

interface VehicleStatus {
  total_odol: number;
  total_od: number;
  total_ol: number;
  total_normal: number;
  total: number;
}

export const StatusVehicleCard: React.FC<StatusVehicleCardProps> = ({
  title,
  value,
  title2,
  value2,
  title3,
  value3,
  percentage,
  percentage2,
}) => {
  const { start_date, end_date } = useDateFilterStore();
  const [data, setData] = useState<VehicleStatus>({
    total_odol: 0,
    total_od: 0,
    total_ol: 0,
    total_normal: 0,
    total: 0,
  });

  // console.log(start_date, end_date);

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
    // { label: "Normal", value: data.total_normal, color: "bg-green-500" },
  ];
  return (
    <div className="bg-dashboard-accent p-4  h-full w-full text-white shadow-sm flex flex-col justify-start ">
      <div>
        <span className="flex justify-end text-xs mb-2  text-gray-400 text-right">
          Tanggal :{start_date}
        </span>
      </div>
      <div>
        <h3 className="text-xs text-gray-400 ">{title}</h3>
        <p className="text-xl font-bold mt-1 mb-2">{value} Kendaraan</p>
        <hr className=" border-gray-500 mb-7" />
      </div>

      <div>
        <h3 className="text-xs text-gray-400 ">{title2}</h3>
        <p className="text-xl font-bold mt-1 mb-7">
          {`${value2} (${percentage2}%)`}
        </p>
      </div>

      <div>
        <h3 className="text-sm text-gray-400">{title3}</h3>
        <p className="text-xl font-bold mb-10">{`${value3} (${percentage}%)`}</p>
      </div>
      <h2 className="text-xs text-gray-400 mb-4">Status Kendaraan</h2>

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
    </div>
  );
};
