import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleData } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { FullscreenControl } from "react-leaflet-fullscreen";

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
  const [locationDetails, setLocationDetails] = useState<
    Record<string, string>
  >({});

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
      <FullscreenControl />
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
    </MapContainer>
  );
}
