import MapView from "./MapView";
import Filters from "./Filters";
import { useHeartbeatStore } from "@/stores/useHeartbeatStore";

const MapSection = () => {
  const {
    selectedAlat,
    selectedStatus,
    setSelectedStatus,
    setSelectedAlat,
    selectedRuas,
    setSelectedRuas,
  } = useHeartbeatStore();

  return (
    <div className="lg:col-span-2 rounded-lg relative overflow-hidden">
      <div className=" h-auto rounded-lg">
        <div className="my-2 mr-0 w-full flex flex-row justify-end">
          <Filters
            selectedAlat={selectedAlat}
            setSelectedAlat={setSelectedAlat}
            selectedRuas={selectedRuas}
            setSelectedRuas={setSelectedRuas}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>

        <MapView />
      </div>
    </div>
  );
};

export default MapSection;
