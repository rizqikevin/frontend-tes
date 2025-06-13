import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const marker = new L.Icon({
  iconUrl: "/icons/sport-car.png",
  iconSize: [50, 50],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const marker2 = new L.Icon({
  iconUrl: "/icons/rescue-boat.png",
  iconSize: [50, 50],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const marker3 = new L.Icon({
  iconUrl: "/icons/ambulance.png",
  iconSize: [50, 50],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const center: [number, number] = [3.226, 99.227];
const positions: [number, number][] = [
  [3.305, 99.353],
  [3.384, 99.175],
  [3.152, 99.097],
  [3.025, 99.07],
  [3.134, 99.152],
  [3.134, 99.384],
];

export default function MapViewGps() {
  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[3.025, 99.07]} icon={marker}>
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
      <Marker position={[3.134, 99.384]} icon={marker}>
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
      <Marker position={[3.134, 99.0]} icon={marker3}>
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
