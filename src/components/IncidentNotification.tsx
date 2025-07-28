import { useNotificationStore } from "@/stores/useNotificationStore";
import { isAuthenticated } from "@/services/auth-service";
import { XCircle } from "lucide-react";

const IncidentNotification = () => {
  const { popupIncident, setPopupIncident, popupQueue, dismissPopupIncident } =
    useNotificationStore();

  const isAuth = isAuthenticated();
  const current = popupQueue?.[0];

  if (!isAuth || !popupIncident || !current) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed bottom-10 right-5 z-50 bg-dashboard-accent p-4 rounded-xl text-white w-[400px]">
        <button
          onClick={dismissPopupIncident}
          className="absolute top-2 right-2 text-white hover:text-red-400"
          title="Clear Notification"
        >
          <XCircle size={30} />
        </button>

        <p className="font-bold">Insiden: {current.description}</p>
        <p>{current.cam_loc}</p>
        <video
          src={current.url_video}
          autoPlay
          controls
          loop
          className="mt-2 max-w-full rounded-lg"
        />
        <button
          className="mt-3 text-sm bg-red-500 text-white rounded-md hover:bg-gray-500 px-3 py-2 w-full"
          onClick={() => setPopupIncident(null)}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default IncidentNotification;
