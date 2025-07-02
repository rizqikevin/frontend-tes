import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleData } from "@/types";
import { useEffect, useMemo, useRef } from "react";

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

interface MapViewGpsProps {
  vehicles: VehicleData[];
  onVehicleClick: (vehicle: VehicleData) => void;
}

export default function MapViewGps({
  vehicles,
  onVehicleClick,
}: MapViewGpsProps) {
  const mapRef = useRef<Map | null>(null);

  // Rata-rata posisi sebagai fallback center
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

  // Fit bounds ketika kendaraan berubah
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
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      whenReady={() => {}}
      ref={(instance: Map | null) => {
        if (instance) {
          mapRef.current = instance;
        }
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {vehicles.map((vehicle) => {
        const lat = parseFloat(vehicle.lat);
        const lon = parseFloat(vehicle.lon);

        if (isNaN(lat) || isNaN(lon)) return null;

        return (
          <Marker
            key={vehicle.radio_id}
            position={[lat, lon]}
            icon={getVehicleIcon(vehicle.type)}
            eventHandlers={{ click: () => onVehicleClick(vehicle) }}
          >
            <Popup>
              <div className="w-[250px] text-black">
                <h4 className="font-bold text-md">{vehicle.vehicle_name}</h4>
                <p className="text-sm">Plat: {vehicle.vehicle_number}</p>
                <p className="text-sm">Kecepatan: {vehicle.speed} Km/h</p>
                <p className="text-sm">
                  Terakhir: {new Date(vehicle.updated).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
