import { useNotificationStore } from "@/stores/useNotificationStore";

const IncidentNotification = () => {
  const { popupIncident, setPopupIncident } = useNotificationStore();

  if (!popupIncident) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9] flex items-center justify-center">
      <div className="fixed bottom-20 right-5 z-50 bg-red-700 p-4 rounded text-white">
        <p className="font-bold">Insiden: {popupIncident.description}</p>
        <p>{popupIncident.cam_loc}</p>
        <video
          src={popupIncident.url_video}
          controls
          className="mt-2 max-w-xs"
        />
        <button className="mt-2 text-sm" onClick={() => setPopupIncident(null)}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default IncidentNotification;
