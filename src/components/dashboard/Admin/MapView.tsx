import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import { useIncidentSocketStore } from "@/stores/useNotificationStore";
import { Link } from "react-router-dom";
import "../../../../public/marker/incident-marker.css";

const incidentIcon = new L.DivIcon({
  className: "incident-pulse-icon",
  html: `
    <div class="blink-container">
      <img src="/marker/pulse.png" class="blink-icon-img" />
      <div class="pulse-circle"></div>
    </div>
  `,
  iconUrl: "/marker/pulse.png",
  iconSize: [100, 100],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const marker = new L.Icon({
  iconUrl: "/marker/tollstation.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const marker2 = new L.Icon({
  iconUrl: "/marker/green.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const center: [number, number] = [3.22628, 99.22696];

export default function MapView() {
  const { incidents, clearIncidents } = useIncidentSocketStore();
  console.log("incidents from map : ", incidents);

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "70vh", width: "100%" }}
    >
      <FullscreenControl />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {incidents.map((incident, index) => (
        <Marker
          key={index}
          position={[incident.lat, incident.lng]}
          icon={incidentIcon}
        >
          <Popup>
            <div className="w-[250px] text-gray-900">
              <h2 className="text-base font-semibold mb-2">
                🚨 Notifikasi Insiden
              </h2>
              <p className="mb-2">{incident.description}</p>
              <video
                src={incident.url_video}
                autoPlay
                controls
                className="w-full rounded"
              />
              <button
                onClick={clearIncidents}
                className="mt-3 w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
              >
                Tutup Semua
              </button>
              <Link to={`/incident`}>
                <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                  Selengkapnya
                </button>
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      <Marker position={[3.025, 99.07]} icon={incidentIcon}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Selengkapnya
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.025, 99.03]} icon={marker2}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.152, 99.097]} icon={marker}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.152, 99.08]} icon={marker2}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.384, 99.175]} icon={marker}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.305, 99.353]} icon={marker}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.134, 99.152]} icon={marker}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.1, 99.384]} icon={marker}>
        <Popup>
          <div className="w-[250px] rounded-lg overflow-hidden text-gray-800">
            <img
              src="/img/tol.jpg"
              alt="CCTV"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-lg mb-2">
                CCTV Akses Dolok Merawan - Sinaksak
              </h4>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">
                    📍 Ruas <span className="pl-5">Jalan</span>
                  </span>{" "}
                  : Dolok Merawan - Sinaksak
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📌 Lokasi</span> : KM 10
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">⚠️ Kondisi</span> : Offline
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-600">📍 Posisi</span> : Kiri
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Laporkan
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
