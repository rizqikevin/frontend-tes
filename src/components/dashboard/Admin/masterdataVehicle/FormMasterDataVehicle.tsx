import { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { AddVehicleModal } from "@/components/dashboard/Admin/masterdataVehicle/AddVehicleModal";
import api from "@/services/api";
import { EditVehicleModal } from "./EditVehicleModal";
import { toast } from "sonner";

export interface Vehicle {
  radio_id: string;
  vehicle_number: string;
  vehicle_name: string;
  status: string;
  created_at: string;
  type: string;
  target: number;
  average_fuel_consumption: string;
}

export const FormMasterDataVehicle: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // for paginated data
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicle");
      const data = response.data || [];
      setAllVehicles(data);
      setTotal(data.length);
      setPage(1);
    } catch (error) {
      toast.error("Error fetching vehicles");
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setVehicles(allVehicles.slice(startIndex, endIndex));
  }, [allVehicles, page, limit]);

  const totalPages = Math.ceil(total / limit);

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
              <th>Target (Km)</th>
              <th>Penggunaan BBM (Km/L)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="bg-[#2a2a2a] rounded-md">
                <td className="px-2 py-2">{(page - 1) * limit + index + 1}</td>
                <td className="px-2 py-2">{vehicle.radio_id}</td>
                <td className="px-2 py-2">{vehicle.vehicle_number}</td>
                <td className="px-2 py-2">{vehicle.vehicle_name}</td>
                <td className="px-2 py-2">{vehicle.status}</td>
                <td className="px-2 py-2">
                  {vehicle.created_at.split("T")[0]}
                </td>
                <td className="px-2 py-2">{vehicle.type}</td>
                <td className="px-2 py-2">{vehicle.target}</td>
                <td className="px-1 py-2 text-center">
                  {vehicle.average_fuel_consumption}
                </td>
                <td className="px-2 py-2 flex gap-2">
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 text-sm text-white">
        <div>
          Rows per page:
          <select
            className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex items-center ml-5">
          <span className="mr-4">
            {Math.min((page - 1) * limit + 1, total)}-
            {Math.min(page * limit, total)} of {total}
          </span>
          <div className="inline-flex">
            <button
              className="px-2 py-1"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="px-2 py-1"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transform rotate-180"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AddVehicleModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {
          setAddModalOpen(false);
          fetchVehicles();
        }}
      />
      {selectedVehicle && (
        <EditVehicleModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          vehicle={selectedVehicle}
          onSuccess={() => {
            setEditModalOpen(false);
            fetchVehicles();
          }}
        />
      )}
    </div>
  );
};
