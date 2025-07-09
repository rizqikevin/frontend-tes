// src/components/IncidentNotification.tsx
import { useIncidentSocketStore } from "@/stores/useNotificationStore";

const IncidentNotification = () => {
  const { incidents, clearIncidents } = useIncidentSocketStore();

  if (incidents.length === 0) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center">
      <div className="fixed top-20 right-5 z-50 bg-red-700 p-4 rounded text-white">
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
      </div>
    </div>
  );
};

export default IncidentNotification;
