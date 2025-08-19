import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { useStreetLightStore } from "@/stores/useStreetlightStore";

// ICONS
const iconOn = new L.Icon({
  iconUrl: "/marker/light-on.png",
  iconSize: [50, 50],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const iconOff = new L.Icon({
  iconUrl: "/marker/light-off.png",
  iconSize: [50, 50],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const center: [number, number] = [3.373, 99.166];

export default function MapView() {
  const { lights } = useStreetLightStore();
  // console.log(lights);

  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
    >
      <FullscreenControl />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render lampu berdasarkan data */}
      {lights.map((light) => {
        if (
          typeof light.latitude !== "string" ||
          typeof light.longitude !== "string"
        )
          return null;

        const icon = light.status === 1 ? iconOn : iconOff;

        return (
          <Marker
            key={light.id}
            position={[light.latitude, light.longitude]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm space-y-1 text-white">
                <p>
                  <strong>ID:</strong> {light.id}
                </p>
                <p>
                  <strong>Nama:</strong> {light.sensor_name}
                </p>
                <p>
                  <strong>Status:</strong> {light.status === 1 ? "On" : "Off"}
                </p>
                <p>
                  <strong>Updated:</strong>{" "}
                  {new Date(light.updated_at).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
