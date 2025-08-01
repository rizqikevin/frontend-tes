import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Polygon,
} from "react-leaflet";
import L, { LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleData } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { FullscreenControl } from "react-leaflet-fullscreen";
import * as turf from "@turf/turf";
import { Polyline } from "react-leaflet";

export const getVehicleIcon = (type: string) => {
  switch (type) {
    case "ambulance":
      return new L.Icon({
        iconUrl: "/icons/ambulance.png",
        iconSize: [50, 50],
      });
    case "rescue":
      return new L.Icon({
        iconUrl: "/icons/rescue-boat.png",
        iconSize: [50, 50],
      });
    case "car":
    default:
      return new L.Icon({
        iconUrl: "/icons/car.png",
        iconSize: [50, 50],
      });
  }
};

export const getVehicleIconOutOfBounds = (type: string) => {
  switch (type) {
    case "ambulance":
      return new L.Icon({
        iconUrl: "/icons/ambulance-out.png",
      });
    case "rescue":
      return new L.Icon({
        iconUrl: "/icons/rescue-boat-out.png",
        iconSize: [50, 50],
      });
    case "car":
    default:
      return new L.Icon({
        iconUrl: "/icons/car-warning.png",
        iconSize: [50, 50],
      });
  }
};

interface MapViewGpsProps {
  vehicles: VehicleData[];
  onVehicleClick: (vehicle: VehicleData) => void;
  trackCoordinates?: [number, number][];
}

const polygon = turf.polygon([
  [
    [99.47624550906254, 3.3481490716505355],
    [99.39394104712702, 3.1231999327377857],
    [99.18406466919147, 3.2341399936075925],
    [99.10278901303015, 2.894092626910605],
    [98.90525830438493, 2.9701245818541464],
    [98.99167798941721, 3.305012037922486],
    [99.18200705764308, 3.4775486758569403],
    [99.47624550906254, 3.3481490716505355],
  ],
]);

const point = turf.point([3.0522134461444947, 99.1946832627015]);
const inside = turf.booleanPointInPolygon(point, polygon);
console.log(inside);

export default function MapViewGps({
  vehicles,
  onVehicleClick,
  trackCoordinates,
}: MapViewGpsProps) {
  const mapRef = useRef<Map | null>(null);
  const [locationDetails, setLocationDetails] = useState<
    Record<string, string>
  >({});

  const polygonRef: LatLngExpression[] = [
    [3.3481490716505355, 99.47624550906254],
    [3.1231999327377857, 99.39394104712702],
    [3.2341399936075925, 99.18406466919147],
    [2.894092626910605, 99.10278901303015],
    [2.9701245818541464, 98.90525830438493],
    [3.305012037922486, 98.99167798941721],
    [3.4775486758569403, 99.18200705764308],
    [3.3481490716505355, 99.47624550906254],
  ];

  // Fetch addresses once for all vehicles
  useEffect(() => {
    const fetchAllAddresses = async () => {
      const pending = vehicles.filter((v) => !locationDetails[v.radio_id]);

      for (const vehicle of pending) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${vehicle.lat}&lon=${vehicle.lon}&zoom=18&addressdetails=1`,
            {
              headers: {
                "User-Agent": "Dashboard/1.0 (kevin.octavian@delameta.com)",
              },
            }
          );
          const data = await res.json();
          const address = data.display_name || "Alamat tidak ditemukan";
          setLocationDetails((prev) => ({
            ...prev,
            [vehicle.radio_id]: address,
          }));
        } catch (error) {
          console.error("Gagal ambil alamat:", error);
          setLocationDetails((prev) => ({
            ...prev,
            [vehicle.radio_id]: "Gagal mengambil alamat",
          }));
        }
      }
    };

    if (vehicles.length > 0) {
      fetchAllAddresses();
    }
  }, [vehicles]);

  // Hitung posisi rata-rata sebagai fallback center
  const center = useMemo<[number, number]>(() => {
    if (!vehicles.length) return [3.226, 99.227];
    const total = vehicles.reduce(
      (acc, v) => {
        acc.lat += parseFloat(v.lat);
        acc.lon += parseFloat(v.lon);
        return acc;
      },
      { lat: 0, lon: 0 }
    );
    return [total.lat / vehicles.length, total.lon / vehicles.length];
  }, [vehicles]);

  // Zoom otomatis ke semua marker
  useEffect(() => {
    if (!mapRef.current || vehicles.length === 0) return;

    const bounds = L.latLngBounds(
      vehicles.map(
        (v) => [parseFloat(v.lat), parseFloat(v.lon)] as [number, number]
      )
    );

    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  }, [vehicles]);

  return (
    <MapContainer
      // center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      whenReady={() => {}}
      ref={(instance: Map | null) => {
        if (instance) {
          mapRef.current = instance;
        }
      }}
    >
      <FullscreenControl />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {vehicles.map((vehicle) => {
        const lat = parseFloat(vehicle.lat);
        const lon = parseFloat(vehicle.lon);

        if (isNaN(lat) || isNaN(lon)) return null;

        const point = turf.point([lon, lat]);
        const isInside = turf.booleanPointInPolygon(point, polygon);

        console.log(vehicle.vehicle_name, { lat, lon, isInside });
        const icon = isInside
          ? getVehicleIcon(vehicle.type)
          : getVehicleIconOutOfBounds(vehicle.type);

        return (
          <Marker
            key={vehicle.radio_id}
            position={[lat, lon]}
            icon={icon}
            eventHandlers={{ click: () => onVehicleClick(vehicle) }}
          >
            <Popup>
              <div className="w-[250px] text-black">
                <h4 className="font-bold text-md">{vehicle.vehicle_name}</h4>
                <p className="text-sm">Plat: {vehicle.vehicle_number}</p>
                <p className="text-sm">Kecepatan: {vehicle.speed} Km/h</p>
                <p className="text-sm">
                  Jarak Tempuh : {vehicle.gps.mileage} Km
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={isInside ? "text-green-600" : "text-red-600"}
                  >
                    {isInside ? "Di dalam batas" : "Melewati batas"}
                  </span>
                </p>
                <p className="text-sm">Lokasi:</p>
                <p className="text-sm italic">
                  {locationDetails[vehicle.radio_id] || "Memuat alamat..."}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                >
                  View on Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}

      <Polygon
        positions={polygonRef}
        pathOptions={{
          color: "red",
          fill: false,
          fillOpacity: 0,
          weight: 2,
        }}
      />
      {trackCoordinates && trackCoordinates.length > 1 && (
        <Polyline
          positions={trackCoordinates}
          pathOptions={{ color: "#1aff66", weight: 6 }}
        />
      )}
    </MapContainer>
  );
}
