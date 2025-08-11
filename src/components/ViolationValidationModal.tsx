import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { VehicleData } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Violation extends VehicleData {
  id: string;
  reason: string | null;
  area: string;
}

interface ViolationValidationModalProps {
  vehicle: VehicleData;
  location: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViolationValidationModal({
  vehicle,
  location,
  isOpen,
  onClose,
}: ViolationValidationModalProps) {
  const [violation, setViolation] = useState<Violation | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchViolation = async () => {
      try {
        setLoading(true);
        const response = await api.get("/violation/vehicle");
        const violations: Violation[] = response.data.data || response.data;
        const foundViolation = violations.find(
          (v) => v.radio_id === vehicle.radio_id
        );

        if (foundViolation) {
          setViolation(foundViolation);
          setReason(foundViolation.reason || "");
        } else {
          setViolation({ ...vehicle, id: "", reason: "", area: location });
          setReason("");
          toast.info(
            "Kendaraan ini belum tercatat sebagai pelanggaran. Masukkan alasan untuk membuat laporan baru."
          );
        }
      } catch (error) {
        console.error("Gagal mengambil data pelanggaran:", error);
        toast.error("Gagal mengambil data pelanggaran.");
        setViolation({ ...vehicle, id: "", reason: "", area: location });
        setReason("");
      } finally {
        setLoading(false);
      }
    };

    fetchViolation();
  }, [vehicle, isOpen, location]);

  const handleExport = () => {
    if (!violation) return;

    const data = [
      {
        Tanggal: violation.created_at,
        Waktu: violation.created_at.split(" ")[1],
        "ID Kendaraan": violation.radio_id,
        "Area Pelanggaran": violation.area,
        "Alasan Pelanggaran": violation.reason || "Tidak ada alasan",
        "Status Pelanggaran": violation.status,
        "Status Validasi": violation.type || "Belum divalidasi",
        "ID Pelanggaran": violation.id,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Log Pelanggaran");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "log_pelanggaran.xlsx");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!violation) return;

    try {
      if (violation.id) {
        await api.put(`/violation/vehicle/${violation.id}`, {
          reason: reason,
        });
      } else {
        await api.post(`/violation/vehicle`, {
          radio_id: vehicle.radio_id,
          area: location,
          reason: reason,
        });
      }

      toast.success("Alasan pelanggaran berhasil disimpan.");
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan alasan:", error);
      toast.error("Gagal menyimpan alasan.");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-lg z-50">
          <Dialog.Title className="text-2xl font-bold mb-5 text-gray-800">
            Validasi Pelanggaran Kendaraan
          </Dialog.Title>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading data pelanggaran...</p>
            </div>
          ) : !violation ? (
            <div className="flex justify-center items-center h-40">
              <p>Data pelanggaran tidak ditemukan.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Nama Kendaraan
                </label>
                <input
                  type="text"
                  value={violation.radio_id}
                  readOnly
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm bg-gray-100 p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Lokasi Pelanggaran
                </label>
                <textarea
                  value={violation.area}
                  readOnly
                  className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Alasan Keluar Wilayah
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm p-2 text-blackfocus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                  placeholder="Masukkan alasan..."
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Batal
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Ekspor Log Pelanggaran
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
