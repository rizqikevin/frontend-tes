import MapView from "./MapView";
import Filters from "../GeographicInfoSystem/Filters";
import { useState } from "react";

const MapSection = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <div className="lg:col-span-2 rounded-lg relative overflow-hidden">
      <div className=" h-auto rounded-lg">
        <div className="my-2 mr-0 w-full flex flex-row justify-end">
          <Filters
            selectedDeviceType={selectedDeviceType}
            setSelectedDeviceType={setSelectedDeviceType}
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
