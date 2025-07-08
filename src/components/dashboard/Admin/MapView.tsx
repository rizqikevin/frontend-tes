import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import { useNotificationStore } from "@/stores/useNotificationStore";

const incidentIcon = new L.Icon({
  iconUrl: "/marker/red.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const center: [number, number] = [3.226, 99.227]; // pusat peta

export default function MapView() {
  const { popupIncident, setPopupIncident } = useNotificationStore();

  const dummyLatLng: [number, number] = [3.15, 99.22];

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "70vh", width: "100%" }}
    >
      <FullscreenControl />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {popupIncident && (
        <Marker position={dummyLatLng} icon={incidentIcon}>
          <Popup>
            <div className="w-[250px] text-gray-900">
              <h2 className="text-base font-semibold mb-2">
                🚨 Notifikasi Insiden
              </h2>
              <p className="mb-2">{popupIncident.description}</p>
              <video
                src={popupIncident.videoUrl}
                autoPlay
                controls
                className="w-full rounded"
              />
              <button
                onClick={() => setPopupIncident(null)}
                className="mt-3 w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
              >
                Tutup Notifikasi
              </button>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
