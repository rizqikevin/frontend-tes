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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = lights.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(lights.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

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
            {currentItems.map((light) => (
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
      <div className="flex text-sm justify-between items-center mt-4">
        <div>
          {/* <span className="text-sm text-gray-400">
            Showing {firstItemIndex + 1} to{" "}
            {Math.min(lastItemIndex, lights.length)} of {lights.length} entries
          </span> */}
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-2 py-1 rounded bg-dashboard-accent text-white text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-xs">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default EnergiCard;
