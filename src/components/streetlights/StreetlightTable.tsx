import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStreetLightStore } from "@/stores/streetlightStore";

const StreetLightManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [newLight, setNewLight] = useState({
    name: "",
    latitude: "",
    longitude: "",
    gatewayId: "HMW-101",
  });
  const {
    lights,
    gateways,
    selectedGateway,
    setSelectedGateway,
    fetchGateways,
    fetchLights,
    toggleLights,
    addLight,
  } = useStreetLightStore();

  const handleAddLight = async () => {
    await addLight({
      name: newLight.name,
      latitude: newLight.latitude,
      longitude: newLight.longitude,
      gatewayId: newLight.gatewayId,
    });

    setShowModal(false);
    setNewLight({
      name: "",
      latitude: "",
      longitude: "",
      gatewayId: "HMW-101",
    });
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  useEffect(() => {
    if (selectedGateway) {
      fetchLights();
    }
  }, [selectedGateway]);

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">STREETLIGHTS</h2>
          <select
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
            className="bg-dashboard-accent borderpx-3 py-2 rounded text-white mt-2"
          >
            {gateways.map((gw) => (
              <option key={gw.id} value={gw.id}>
                {gw.name}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add</Button>
      </div>

      {/* Table */}
      <div className=" rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#37474F]">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">UpdatedAt</th>
              <th className="text-left px-4 py-2">ON</th>
            </tr>
          </thead>
          <tbody>
            {lights.map((light) => (
              <tr key={light.id} className="border-b border-[#455A64]">
                <td className="px-4 py-2">{light.sensor_name}</td>
                <td className="px-4 py-2">
                  {new Date(light.updated_at).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <Switch
                    checked={light.status === 1}
                    onCheckedChange={() => toggleLights(light.id, light.status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-dashboard-dark text-white z-[9999]">
            <h3 className="text-lg font-bold mb-4">Add Light</h3>
            <div className="space-y-3">
              <select
                className="bg-dashboard-accent w-full px-2 py-2 rounded"
                value={newLight.gatewayId}
                onChange={(e) =>
                  setNewLight((prev) => ({
                    ...prev,
                    gatewayId: e.target.value,
                  }))
                }
              >
                {gateways.map((gw) => (
                  <option key={gw.id} value={gw.id}>
                    {gw.name}
                  </option>
                ))}
              </select>

              <Input
                placeholder="Masukkan nama lampu"
                value={newLight.name}
                className="bg-dashboard-accent"
                onChange={(e) =>
                  setNewLight((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="Masukkan latitude"
                type="number"
                className="bg-dashboard-accent"
                value={newLight.latitude}
                onChange={(e) =>
                  setNewLight((prev) => ({ ...prev, latitude: e.target.value }))
                }
              />
              <Input
                placeholder="Masukkan longitude"
                type="number"
                className="bg-dashboard-accent"
                value={newLight.longitude}
                onChange={(e) =>
                  setNewLight((prev) => ({
                    ...prev,
                    longitude: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="ghost"
                className="bg-dashboard-accent border border-gray-300 px-3 py-2 rounded text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddLight}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StreetLightManager;
