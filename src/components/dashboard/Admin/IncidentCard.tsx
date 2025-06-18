// components/IncidentCard.tsx
import React from "react";

const incidents = [
  {
    id: 1,
    time: "09:14",
    location: "KM 25",
    vehicle: "PJR, Ambulance",
  },
  {
    id: 2,
    time: "09:14",
    location: "KM 25",
    vehicle: "PJR, Ambulance",
  },
  {
    id: 3,
    time: "09:14",
    location: "KM 25",
    vehicle: "PJR, Ambulance",
  },
];

const IncidentCard: React.FC = () => {
  return (
    <div className="bg-dashboard-accent text-white p-4 rounded-xl w-full h-96 max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-semibold">Incident</h2>
          <p className="text-xs text-gray-400">Monitoring Incident</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">27/02/2025</p>
          <p className="text-2xl font-bold text-red-500 leading-none">321</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-1 text-xs mb-2">
        <span className="text-green-400">Normal</span>
        <span className="flex-1 h-2 bg-green-600 rounded-full"></span>
        <span className="text-red-400 ml-2">Tindak Lanjut</span>
        <span className="flex-[2] h-2 bg-red-600 rounded-full relative">
          <span className="absolute right-0 top-0 h-2 w-[40%] bg-blue-400 rounded-r-full"></span>
        </span>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-[#3A3A3C] p-2 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-400 rounded"></div>
              <div className="text-xs">
                <p className="font-semibold">Incident</p>
                <p>{incident.location}</p>
                <p className="text-gray-300 text-[11px]">
                  Kendaraan terdekat: {incident.vehicle}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400">{incident.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentCard;
