import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center: [number, number] = [3.134, 99.147];
const positions: [number, number][] = [
  [3.305, 99.353],
  [3.384, 99.175],
  [3.152, 99.097],
  [3.025, 99.07],
];

export default function MapView() {
  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline positions={positions} color="blue" weight={5} />

      <Marker position={[3.025, 99.07]}>
        <Popup>
          <div style={{ width: 250 }}>
            <img src="/cctv.jpg" width="100%" />
            <h4>CCTV Akses Dolok Merawan - Sinaksak</h4>
            <p>Ruas: Dolok Merawan - Sinaksak</p>
            <p>Lokasi: KM 5</p>
            <p>Kondisi: Online</p>
            <p>Posisi: Kanan</p>
            <button>Laporkan</button>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.152, 99.097]}>
        <Popup>
          <div style={{ width: 250 }}>
            <img src="/cctv.jpg" width="100%" />
            <h4>CCTV Akses Dolok Merawan - Sinaksak</h4>
            <p>Ruas: Dolok Merawan - Sinaksak</p>
            <p>Lokasi: KM 10</p>
            <p>Kondisi: Offline</p>
            <p>Posisi: Kiri</p>
            <button>Laporkan</button>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.384, 99.175]}>
        <Popup>
          <div style={{ width: 250 }}>
            <img src="/cctv.jpg" width="100%" />
            <h4>CCTV Akses Dolok Merawan - Sinaksak</h4>
            <p>Ruas: Dolok Merawan - Sinaksak</p>
            <p>Lokasi: KM 15</p>
            <p>Kondisi: Online</p>
            <p>Posisi: Kanan</p>
            <button>Laporkan</button>
          </div>
        </Popup>
      </Marker>
      <Marker position={[3.305, 99.353]}>
        <Popup>
          <div style={{ width: 250 }}>
            <img src="/cctv.jpg" width="100%" />
            <h4>CCTV Akses Dolok Merawan - Sinaksak</h4>
            <p>Ruas: Dolok Merawan - Sinaksak</p>
            <p>Lokasi: KM 20</p>
            <p>Kondisi: Online</p>
            <p>Posisi: Kiri</p>
            <button>Laporkan</button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
