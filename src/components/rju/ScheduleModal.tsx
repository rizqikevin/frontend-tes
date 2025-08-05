import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "@/services/api";

interface OperationalHourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OperationalHourModal: React.FC<OperationalHourModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [jamMenyala, setJamMenyala] = useState("17:00");
  const [jamMati, setJamMati] = useState("06:00");

  const postJamOperasional = async () => {
    await api.post("/scheduler/pju", {
      on_time: jamMenyala,
      off_time: jamMati,
    });
  };

  useEffect(() => {
    postJamOperasional();
  }, []);

  const handleSave = () => {
    postJamOperasional();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-30" />

        {/* Modal wrapper */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#1F1F1F] p-6 text-white shadow-xl transition-all">
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-lg font-semibold">
                  Atur Jam Operasional
                </DialogTitle>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-1 text-sm">Jam Menyala</label>
                  <select
                    className="w-full bg-[#2C2C2C] text-white p-2 rounded"
                    value={jamMenyala}
                    onChange={(e) => setJamMenyala(e.target.value)}
                  >
                    {generateTimeOptions()}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Jam Mati</label>
                  <select
                    className="w-full bg-[#2C2C2C] text-white p-2 rounded"
                    value={jamMati}
                    onChange={(e) => setJamMati(e.target.value)}
                  >
                    {generateTimeOptions()}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

function generateTimeOptions() {
  const options = [];
  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, "0");
    options.push(
      <option key={hour} value={`${hour}:00`}>{`${hour}:00 WIB`}</option>
    );
  }
  return options;
}
