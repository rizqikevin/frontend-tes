import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  useNotificationStore,
  useIncidentSocketStore,
} from "@/stores/useNotificationStore";
import { toast } from "sonner";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
});
export const useSocketNotifications = () => {
  const { settings, setPopupIncident } = useNotificationStore();
  const { addIncident } = useIncidentSocketStore();

  useEffect(() => {
    socket.on("incident:data", (data) => {
      addIncident(data);
      console.log(data);

      // Opsional: trigger popup sonner atau modal
      toast(`Insiden baru: ${data.description}`, {
        description: data.cam_loc,
      });

      const { description, url_video } = data;
      const shouldNotify =
        (description.includes("WrongWay") && settings.wrongWay) ||
        (description.includes("StopVeh") && settings.stopInCongested) ||
        (description.includes("SlowVeh") && settings.slowDown) ||
        (description.includes("Stop Vehicle in Fluid Traffic") &&
          settings.stopInFluid);

      console.log(shouldNotify);

      if (shouldNotify) {
        setPopupIncident({ description, videoUrl: url_video });
      }
    });

    socket.on("flood:data", (data) => {
      toast("Peringatan banjir", {
        description: data.location || "Lokasi tidak diketahui",
      });
    });

    return () => {
      socket.off("incident:data");
      socket.off("flood:data");
    };
  }, [settings]);
};
