// src/components/IncidentNotification.tsx
import {
  useNotificationStore,
  useIncidentSocketStore,
} from "@/stores/useNotificationStore";
import { X } from "lucide-react";

const IncidentNotification = () => {
  const { popupIncident, setPopupIncident } = useNotificationStore();
  // const { incidents, clearIncidents } = useIncidentSocketStore();

  // if (incidents.length === 0) return null;
  if (!popupIncident) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center">
      {/* <div className="fixed top-20 right-5 z-50 bg-red-700 p-4 rounded text-white">
        <p className="font-bold">Insiden: {incidents[0].description}</p>
        <p>{incidents[0].cam_loc}</p>
        <video
          src={incidents[0].url_video}
          controls
          className="mt-2 max-w-xs"
        />
        <button className="mt-2 text-sm" onClick={clearIncidents}>
          Tutup
        </button>
      </div> */}
      {/* <div className="bg-white p-4 rounded-lg max-w-md w-full shadow-lg text-black relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => setPopupIncident(null)}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-2">🚨 Notifikasi Insiden</h2>
        <p className="mb-2">{popupIncident.description}</p>
        <video
          src={popupIncident.videoUrl}
          autoPlay
          controls
          className="w-full rounded"
        />
      </div> */}
    </div>
  );
};

export default IncidentNotification;
