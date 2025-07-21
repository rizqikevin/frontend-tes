import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import { useIncidentSocketStore } from "@/stores/useNotificationStore";
import { useGismapsStore } from "@/stores/useGisMapsStore";
import { Link } from "react-router-dom";
import "../../../incident-marker.css";
import { useEffect } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useGpsStore } from "@/stores/useGpsStore";

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

const car = new L.Icon({
  iconUrl: "/icons/car.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const center: [number, number] = [3.35094, 99.25094];

function MapAutoCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);

  return null;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const toRad = (angle: number) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function MapView() {
  const { incidents, clearIncidents, removeIncident } =
    useIncidentSocketStore();
  const { gismaps, fetchGismaps } = useGismapsStore();
  const { vehicles, fetchVehicles } = useGpsStore();
  console.log("vehicles from map : ", vehicles);
  // console.log("incidents from map : ", incidents);
  // console.log("gismaps from map : ", gismaps);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchGismaps();
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (incidents.length > 0) {
      fetchVehicles();
    }
  }, [incidents]);

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "70vh", width: "100%" }}
    >
      <FullscreenControl />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {incidents.length > 0 && (
        <MapAutoCenter lat={incidents[0].lat} lng={incidents[0].lng} />
      )}
      {incidents.map((incident, index) => (
        <Marker
          key={index}
          position={[incident.lat, incident.lng]}
          icon={incidentIcon}
        >
          <Popup>
            <div className="w-[250px] text-gray-900">
              <h2 className="text-base font-semibold mb-2">
                🚨 Notifikasi Insiden - {incident.id}
              </h2>
              <p className="mb-1">
                <span className="font-semibold ">Lokasi:</span>{" "}
                {incident.cam_loc}
              </p>
              <p className="mb-1">
                <span className="font-semibold ">Jenis Insiden:</span>{" "}
                {incident.description}
              </p>
              <p className="mb-1">
                <span className="font-semibold ">Lokasi:</span> {incident.lat} -{" "}
                {incident.lng}
              </p>
              <video
                src={incident.url_video}
                autoPlay
                controls
                loop
                className="w-full rounded"
              />
              <button
                onClick={() => removeIncident(incident.id)}
                className="mt-3 w-full bg-green-600 text-white py-1.5 rounded hover:bg-red-700"
              >
                Clear
              </button>
              <button
                onClick={clearIncidents}
                className="mt-3 w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
              >
                Clear All
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
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `
        <div class="custom-cluster-wrapper">
          <img src="/marker/green.png" class="custom-cluster-image" />
          <span class="custom-cluster-count text-black">${count}</span>
        </div>
      `,
            className: "custom-cluster-icon",
            iconSize: L.point(50, 50),
          });
        }}
      >
        {gismaps.map((gismap, index) => {
          const lat =
            typeof gismap.latitude === "string"
              ? parseFloat((gismap.latitude as string).replace(",", "."))
              : gismap.latitude;

          const lng =
            typeof gismap.longitude === "string"
              ? parseFloat((gismap.longitude as string).replace(",", "."))
              : gismap.longitude;

          if (isNaN(lat) || isNaN(lng)) return null;
          // if (!isNaN(lat) && !isNaN(lng)) {
          //   console.log(`Rendering vehicle marker at ${lat}, ${lng}`);
          // }

          return (
            <Marker key={index} position={[lat, lng]} icon={marker}>
              <Popup>
                <div className="w-[250px] text-gray-900">
                  <h2 className="text-base font-semibold mb-2">
                    🚨 Info Gerbang - {gismap.id_alat} - {gismap.id_lokasi}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">Lokasi:</span>{" "}
                    {gismap.id_lokasi}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Deskripsi:</span>{" "}
                    {gismap.deskripsi || "-"}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      {vehicles
        .filter((vehicle) => {
          const lat = parseFloat(vehicle.lat);
          const lon = parseFloat(vehicle.lon);

          if (isNaN(lat) || isNaN(lon)) return false;

          return incidents.some((incident) => {
            const distance = haversineDistance(
              incident.lat,
              incident.lng,
              lat,
              lon
            );
            return distance <= 2;
          });
        })
        .map((vehicle, index) => {
          const lat = parseFloat(vehicle.lat);
          const lon = parseFloat(vehicle.lon);

          return (
            <Marker key={`vehicle-${index}`} position={[lat, lon]} icon={car}>
              <Popup>
                <div className="text-gray-900">
                  <h2 className="text-base font-semibold mb-2">🚗 Kendaraan</h2>
                  <p>
                    <span className="font-semibold">Posisi:</span> {lat}, {lon}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
