import React, { useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { toast } from "sonner";

interface AddCctvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const initialFormState = {
  group_id: 0,
  name: "",
  url: "",
  url_local: "",
  latitude: "",
  longitude: "",
  description: "",
  status_id: 0,
};

export const AddCctvModal: React.FC<AddCctvModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "group_id" || name === "status_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/cctv", form);
      if (onSuccess) onSuccess();
      setForm(initialFormState); // Reset form
    } catch (err) {
      console.error(err);
      toast.error("Failed to add CCTV", {
        description: err.message,
      });
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
              <span className="text-white text-lg">Add CCTV</span>
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
              name="group_id"
              type="number"
              placeholder="Group ID"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.group_id}
              onChange={handleChange}
            />
            <input
              name="name"
              placeholder="Nama Kamera"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="url"
              placeholder="URL"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.url}
              onChange={handleChange}
            />
            <input
              name="url_local"
              placeholder="URL Local"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
              value={form.url_local}
              onChange={handleChange}
            />
            <input
              name="latitude"
              placeholder="Latitude"
              className="w-full px-3 py-2 rounded  bg-[#2a2a2a] text-white"
              value={form.latitude}
              onChange={handleChange}
            />
            <input
              name="longitude"
              placeholder="Longitude"
              className="w-full px-3 py-2 rounded  bg-[#2a2a2a] text-white"
              value={form.longitude}
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Description"
              className="w-full px-3 py-2 rounded  bg-[#2a2a2a] text-white"
              value={form.description}
              onChange={handleChange}
            />
            <input
              name="status_id"
              type="number"
              placeholder="Status ID"
              className="w-full px-3 py-2 rounded  bg-[#2a2a2a] text-white"
              value={form.status_id}
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