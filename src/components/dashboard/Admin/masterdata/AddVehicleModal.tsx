import React, { useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    radio_id: "",
    vehicle_number: "",
    vehicle_name: "",
    type: "car",
    target: 0,
    average_fuel_consumption: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "target" || name === "average_fuel_consumption"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/vehicle", form);
      console.log("Vehicle added:", res.data);

      if (!res) throw new Error("Failed to add vehicle");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan kendaraan");
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
              <span className="text-white text-lg">Add Vehicle</span>
              <p className="text-sm text-gray-400">
                Please fill out the form below
              </p>
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              name="radio_id"
              placeholder="Radio ID"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.radio_id}
              onChange={handleChange}
            />
            <input
              name="vehicle_number"
              placeholder="Vehicle Number"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.vehicle_number}
              onChange={handleChange}
            />
            <input
              name="vehicle_name"
              placeholder="Vehicle Name"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.vehicle_name}
              onChange={handleChange}
            />
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
            <input
              name="target"
              type="number"
              placeholder="Target"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.target}
              onChange={handleChange}
            />
            <input
              name="average_fuel_consumption"
              type="number"
              placeholder="Average Fuel Consumption"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.average_fuel_consumption}
              onChange={handleChange}
            />
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
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
