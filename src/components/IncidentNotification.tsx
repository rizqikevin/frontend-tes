import { useNotificationStore } from "@/stores/useNotificationStore";

const IncidentNotification = () => {
  const { popupIncident, setPopupIncident } = useNotificationStore();

  if (!popupIncident) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center">
      <div className="fixed bottom-10 right-5 z-50 bg-red-700 p-4 rounded-lg text-white">
        <p className="font-bold">Insiden: {popupIncident.description}</p>
        <p>{popupIncident.cam_loc}</p>
        <video
          src={popupIncident.url_video}
          autoPlay
          controls
          loop
          className="mt-2 max-w-xs"
        />
        <button
          className="mt-2 text-sm bg-blue-500 text-white rounded-md hover:bg-gray-500 px-2 py-2"
          onClick={() => setPopupIncident(null)}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default IncidentNotification;
