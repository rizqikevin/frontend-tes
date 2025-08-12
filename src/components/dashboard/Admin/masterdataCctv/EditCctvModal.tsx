import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cctv } from "./FormMasterDataCctv";
import api from "@/services/api";
import { toast } from "sonner";

interface EditCctvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cctv: Cctv;
  onSuccess?: () => void;
}

export const EditCctvModal: React.FC<EditCctvModalProps> = ({
  isOpen,
  onClose,
  cctv,
  onSuccess,
}) => {
  const [form, setForm] = useState(cctv);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(cctv);
  }, [cctv]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await api.put(`/cctv/${cctv.id}`, form);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit CCTV", {
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
              Edit CCTV
              <p className="text-sm text-gray-400">Update CCTV data</p>
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="id">
                ID
              </label>
              <input
                name="id"
                disabled
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-gray-400"
                value={form.id}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="group_id">
                Group ID
              </label>
              <input
                name="group_id"
                type="number"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.group_id}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="name">
                Name
              </label>
              <input
                name="name"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="url">
                URL
              </label>
              <input
                name="url"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.url}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="url_local">
                URL Local
              </label>
              <input
                name="url_local"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.url_local}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="latitude">
                Latitude
              </label>
              <input
                name="latitude"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.latitude}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="longitude">
                Longitude
              </label>
              <input
                name="longitude"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.longitude}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="description">
                Description
              </label>
              <input
                name="description"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400" htmlFor="status_id">
                Status ID
              </label>
              <input
                name="status_id"
                type="number"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                value={form.status_id}
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