import MapView from "../../MapView";

const MapSection = () => {
  return (
    <div className="lg:col-span-2 rounded-lg border relative overflow-hidden">
      <div className="w-full h-3/6 rounded-lg">
        <MapView />
      </div>
    </div>
  );
};

export default MapSection;
