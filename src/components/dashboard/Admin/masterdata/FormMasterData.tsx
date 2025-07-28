import { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { AddVehicleModal } from "@/components/dashboard/Admin/masterdata/AddVehicleModal";
import api from "@/services/api";

interface Vehicle {
  radio_id: string;
  vehicle_number: string;
  vehicle_name: string;
  status: string;
  created_at: string;
  type: string;
  target: number;
  average_fuel_consumption: string;
}

export const FormMasterData: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicle");

      setVehicles(response.data);
      console.log("Fetched vehicles:", response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  console.log("Vehicles from FormMasterData:", vehicles);

  return (
    <div className="bg-dashboard-accent text-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Master Data</h2>
          <p className="text-sm text-gray-400">Daftar Vehicle</p>
        </div>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          Add Vehicle
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white border-separate border-spacing-y-2">
          <thead className="text-xs text-gray-300 uppercase">
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Vehicle Number</th>
              <th>Vehicle Name</th>
              <th>Status</th>
              <th>Create Date</th>
              <th>Type</th>
              <th>Target</th>
              <th>Penggunaan Bahan Bakar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="bg-[#2a2a2a] rounded-md">
                <td className="px-2 py-2">
                  {(index + 1).toString().padStart(2, "0")}
                </td>
                <td className="px-2 py-2">{vehicle.radio_id}</td>
                <td className="px-2 py-2">{vehicle.vehicle_number}</td>
                <td className="px-2 py-2">{vehicle.vehicle_name}</td>
                <td className="px-2 py-2">{vehicle.status}</td>
                <td className="px-2 py-2">{vehicle.created_at}</td>
                <td className="px-2 py-2">{vehicle.type}</td>
                <td className="px-2 py-2">{vehicle.target}</td>
                <td className="px-1 py-2 text-center">
                  {vehicle.average_fuel_consumption}
                </td>
                <td className="px-2 py-2">
                  <Button className="bg-[#FFA500] text-white hover:bg-[#e69500]">
                    Archieve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddVehicleModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {
          setAddModalOpen(false);
          // TODO: Trigger refetch vehicle list here
          console.log("Vehicle successfully added!");
        }}
      />
    </div>
  );
};
