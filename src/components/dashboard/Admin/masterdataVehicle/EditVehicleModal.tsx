import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vehicle } from "./FormMasterDataVehicle";
import api from "@/services/api";

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  onSuccess?: () => void;
}

export const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onSuccess,
}) => {
  const [form, setForm] = useState(vehicle);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(vehicle);
  }, [vehicle]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "target" || name === "average_fuel_consumption"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/vehicle/${vehicle.radio_id}`, form);
      console.log("Vehicle updated:", res.data);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal mengedit kendaraan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative bg-[#1e1e1e] text-white rounded-lg w-full max-w-md p-6 z-10">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold">
              Edit Vehicle
              <p className="text-sm text-gray-400">Update vehicle data</p>
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="radio_id">
                Radio ID
              </label>
              <input
                name="radio_id"
                disabled
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-gray-400"
                value={form.radio_id}
              />
            </div>

            <div>
              <label
                className="block mb-1 text-gray-400"
                htmlFor="vehicle_number"
              >
                Vehicle Number
              </label>
              <input
                name="vehicle_number"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.vehicle_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block mb-1 text-gray-400"
                htmlFor="vehicle_name"
              >
                Vehicle Name
              </label>
              <input
                name="vehicle_name"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.vehicle_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="type">
                Type Vehicle
              </label>
              <select
                name="type"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.type}
                onChange={handleChange}
              >
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="bus">Bus</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="target">
                Target
              </label>
              <input
                name="target"
                type="number"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.target.toString()}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block mb-1 text-gray-400"
                htmlFor="average_fuel_consumption"
              >
                Average Fuel Consumption
              </label>

              <input
                name="average_fuel_consumption"
                type="number"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.average_fuel_consumption.toString()}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between space-x-2">
            <Button
              className="bg-red-600 text-white hover:bg-red-700 w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="w-full bg-green-600 text-white hover:bg-green-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
