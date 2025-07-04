import React, { useEffect } from "react";
import { useIncidentStore } from "@/stores/useIncidentStore";

const IncidentCard: React.FC = () => {
  const { data, fetchData, total } = useIncidentStore();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-dashboard-accent text-white p-4 rounded-xl w-full max-w-sm h-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-semibold">Insiden Terbaru</h2>
          <p className="text-xs text-gray-400">Monitoring Insiden</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">
            {new Date().toLocaleDateString("id-ID")}
          </p>
          <p className="text-2xl font-bold text-red-500 leading-none">
            {total}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {data.slice(0, 4).map((incident) => (
          <div
            key={incident.id}
            className="bg-[#3A3A3C] p-3 rounded-lg flex justify-between items-start"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-md flex-shrink-0">
                <img
                  src={incident.url_image}
                  alt="preview"
                  className="w-20 h-10 object-cover rounded-lg"
                />
              </div>
              <div className="text-xs">
                <p className="font-semibold mb-0.5">{incident.description}</p>
                <p className="text-gray-400">{incident.cam_loc}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
              {new Date(incident.time_logging).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            Tidak ada insiden hari ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncidentCard;
