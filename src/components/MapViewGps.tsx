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
import { toast } from "sonner";
import api from "@/services/api";
import ViolationValidationModal from "./ViolationValidationModal";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

export const getVehicleIcon = (type: string) => {
  switch (type) {
    case "ambulance":
      return new L.Icon({
        iconUrl: "/icons/Ambulance.svg",
        iconSize: [25, 25],
      });
    case "rescue":
      return new L.Icon({
        iconUrl: "/icons/Towing.svg",
        iconSize: [25, 25],
      });
    case "car":
    default:
      return new L.Icon({
        iconUrl: "/icons/Car.svg",
        iconSize: [25, 25],
      });
  }
};

export const getVehicleIconOutOfBounds = (type: string) => {
  switch (type) {
    case "ambulance":
      return new L.Icon({
        iconUrl: "/icons/Ambulance.svg",
      });
    case "rescue":
      return new L.Icon({
        iconUrl: "/icons/Towing.svg",
        iconSize: [25, 25],
      });
    case "car":
    default:
      return new L.DivIcon({
        className: "incident-pulse-icon",
        html: `
    <div class="blink-container">
      <img src="/icons/Car.svg" class="blink-icon-img" />
      <div class="pulse-circle"></div>
    </div>
  `,
        iconUrl: "/icons/Car.svg",
        iconSize: [25, 25],
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

export default function MapViewGps({
  vehicles,
  onVehicleClick,
  trackCoordinates,
}: MapViewGpsProps) {
  const { user } = useAuth();
  const [internalVehicles, setInternalVehicles] = useState<VehicleData[]>([]);

  useEffect(() => {
    setInternalVehicles(vehicles);
  }, [vehicles]);

  if (!user) {
    return null;
  }
  const isAdmin = user.role === UserRole.ADMIN;
  const mapRef = useRef<Map | null>(null);
  const [locationDetails, setLocationDetails] = useState<
    Record<string, string>
  >({});
  const [reportedViolations, setReportedViolations] = useState<Set<string>>(
    new Set()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
    null
  );

  const handleOpenModal = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setIsModalOpen(false);
  };

  const handleValidationComplete = (vehicleId: string, isValid: boolean) => {
    setInternalVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v.radio_id === vehicleId ? { ...v, is_valid: isValid } : v
      )
    );
  };

  useEffect(() => {
    const reportViolations = async () => {
      for (const vehicle of internalVehicles) {
        const lat = parseFloat(vehicle.lat);
        const lon = parseFloat(vehicle.lon);
        const status = vehicle.status.toLowerCase();

        if (isNaN(lat) || isNaN(lon)) continue;

        const point = turf.point([lon, lat]);
        const isInside = turf.booleanPointInPolygon(point, polygon);
        const location = locationDetails[vehicle.radio_id];

        if (isInside && status === "out") {
          await api.patch(`/vehicle/${vehicle.radio_id}`, {
            status: "in",
          });
          toast.success(
            `Status kendaraan ${vehicle.vehicle_name} (${vehicle.radio_id}) telah diubah menjadi "masuk".`
          );
        }

        if (
          !isInside &&
          location &&
          !reportedViolations.has(vehicle.radio_id)
        ) {
          if (status === "in") {
            await api.patch(`/vehicle/${vehicle.radio_id}`, {
              status: "out",
            });
            toast.success(
              `Status kendaraan ${vehicle.vehicle_name} (${vehicle.radio_id}) telah diubah menjadi "keluar".`
            );

            try {
              console.log(
                `Reporting violation for ${vehicle.radio_id} at ${location}`
              );
              await api.post("/violation/vehicle", {
                radio_id: vehicle.radio_id,
                area: location,
              });

              toast.success(
                `Pelanggaran oleh ${vehicle.vehicle_name} (${vehicle.radio_id}) telah dilaporkan.`
              );

              setReportedViolations((prev) => {
                const newSet = new Set(prev);
                newSet.add(vehicle.radio_id);
                return newSet;
              });
            } catch (error) {
              console.error(
                `Gagal melaporkan pelanggaran untuk ${vehicle.radio_id}:`,
                error
              );
              toast.error(
                `Gagal melaporkan pelanggaran untuk ${vehicle.vehicle_name}.`
              );
            }
          }
        }
      }
    };

    if (
      internalVehicles.length > 0 &&
      Object.keys(locationDetails).length > 0
    ) {
      reportViolations();
    }
  }, [internalVehicles, locationDetails, reportedViolations]);

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

  const hasFitBoundsRef = useRef(false);

  // Fetch addresses once for all vehicles
  useEffect(() => {
    const fetchAllAddresses = async () => {
      const pending = internalVehicles.filter(
        (v) => !locationDetails[v.radio_id]
      );

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
          // console.error("Gagal ambil alamat:", error);
          setLocationDetails((prev) => ({
            ...prev,
            [vehicle.radio_id]: "Gagal mengambil alamat",
          }));
        }
      }
    };

    if (internalVehicles.length > 0) {
      fetchAllAddresses();
    }
  }, [internalVehicles]);

  // Hitung posisi rata-rata sebagai fallback center
  const center = useMemo<[number, number]>(() => {
    if (!internalVehicles.length) return [3.226, 99.227];
    const total = internalVehicles.reduce(
      (acc, v) => {
        acc.lat += parseFloat(v.lat);
        acc.lon += parseFloat(v.lon);
        return acc;
      },
      { lat: 0, lon: 0 }
    );
    return [
      total.lat / internalVehicles.length,
      total.lon / internalVehicles.length,
    ];
  }, [internalVehicles]);

  // Zoom otomatis ke semua marker
  useEffect(() => {
    if (
      !mapRef.current ||
      internalVehicles.length === 0 ||
      hasFitBoundsRef.current
    )
      return;

    const bounds = L.latLngBounds(
      internalVehicles.map(
        (v) => [parseFloat(v.lat), parseFloat(v.lon)] as [number, number]
      )
    );

    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    hasFitBoundsRef.current = true;
  }, [internalVehicles]);

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

      {internalVehicles.map((vehicle) => {
        const lat = parseFloat(vehicle.lat);
        const lon = parseFloat(vehicle.lon);

        if (isNaN(lat) || isNaN(lon)) return null;

        const point = turf.point([lon, lat]);
        const isInside = turf.booleanPointInPolygon(point, polygon);

        const icon =
          isInside || vehicle.is_valid
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
                {!isInside && (
                  <p className="text-sm">
                    Validasi:{" "}
                    <span
                      className={
                        vehicle.is_valid ? "text-blue-600" : "text-orange-500"
                      }
                    >
                      {vehicle.is_valid
                        ? "Sudah Divalidasi"
                        : "Belum Divalidasi"}
                    </span>
                  </p>
                )}
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
                {!isInside && isAdmin && !vehicle.is_valid && (
                  <button
                    onClick={() => handleOpenModal(vehicle)}
                    className="w-full bg-orange-500 text-white px-3 py-1 rounded-md mt-2 text-sm"
                  >
                    Validasi Pelanggaran
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* <Polygon
        positions={polygonRef}
        pathOptions={{
          color: "red",
          fill: false,
          fillOpacity: 0,
          weight: 2,
        }}
      /> */}
      {trackCoordinates && trackCoordinates.length > 1 && (
        <Polyline
          positions={trackCoordinates}
          pathOptions={{ color: "#1aff66", weight: 6 }}
        />
      )}

      {isModalOpen && selectedVehicle && (
        <ViolationValidationModal
          vehicle={selectedVehicle}
          location={locationDetails[selectedVehicle.radio_id]}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onValidationComplete={handleValidationComplete}
        />
      )}
    </MapContainer>
  );
}
