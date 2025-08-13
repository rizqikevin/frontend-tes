import { useEffect, useState } from "react";
import { useStreetLightStore } from "@/stores/useStreetlightStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";

const EnergiCard: React.FC = () => {
  const {
    lights,
    gateways,
    selectedGateway,
    setSelectedGateway,
    fetchGateways,
    searchTerm,
    setSearchTerm,
  } = useStreetLightStore();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [dataPju, setDataPju] = useState({
    total_active: "0",
    total_inactive: "0",
  });

  const fetchTotalLights = async () => {
    const res = await api.get("/sensor/pju/total");
    const { total_active, total_inactive } = res.data.data[0];
    setDataPju({ total_active, total_inactive });
  };

  useEffect(() => {
    fetchTotalLights();
  }, []);

  // console.log(dataPju);

  useEffect(() => {
    fetchGateways();
    return () => {
      setSearchTerm("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchTerm) {
        setSearchTerm(localSearch);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, searchTerm, setSearchTerm]);

  return (
    <>
      <div>
        <h3 className="text-md font-semibold mt-5 mb-2">Energy Summary</h3>
        <div className="flex justify-between">
          <p className="text-sm">⚡ {dataPju.total_active} Streetlight on</p>
          <p className="text-sm text-red-400">
            🔴 {dataPju.total_inactive} StreetLIght off
          </p>
        </div>

        <div className="flex justify-evenly mt-5 space-y-1 text-sm">
          <p>
            Average: <strong>499.0688 kWh</strong>
          </p>
          <p>
            Actual Usage: <strong>3493.4817 kWh</strong>
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold mt-4 mb-2">Streetlight</h3>
        <div className="flex flex-row justify-between items-center">
          <div>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-2 py-1 text-black rounded"
            />
          </div>
          <div>
            <Select
              onValueChange={(value) => setSelectedGateway(value)}
              value={selectedGateway}
            >
              <SelectTrigger className="w-48 bg-dashboard-accent">
                <SelectValue placeholder="Semua Gerbang" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-dashboard-accent">
                <SelectItem value="all-gateways">Semua Gerbang</SelectItem>
                {gateways
                  .filter((gateway) => gateway && gateway.id)
                  .map((gateway) => (
                    <SelectItem key={gateway.id} value={String(gateway.id)}>
                      {gateway.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <table className="w-full mt-2  text-xs">
          <thead>
            <tr className="text-gray-400">
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {lights.map((light) => (
              <tr key={light.id} className="border-b border-gray-600">
                <td className="py-3 px-3 text-center">{light.sensor_name}</td>
                {light.status === 0 ? (
                  <td className="py-3 px-3 text-red-400 text-center">off</td>
                ) : (
                  <td className="py-3 px-3 text-green-400 text-center">on</td>
                )}

                <td className="py-3 px-3 text-center">
                  {new Date(light.updated_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EnergiCard;
