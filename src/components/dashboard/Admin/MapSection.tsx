import MapView from "./MapView";

const MapSection = () => {
  return (
    <div className="lg:col-span-2 rounded-lg relative overflow-hidden">
      <div className="w-full h-auto rounded-lg">
        <MapView />
      </div>
    </div>
  );
};

export default MapSection;
