// src/hooks/useSocketNotifications.ts
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

      // Opsional: trigger popup sonner atau modal
      toast(`Insiden baru: ${data.description}`, {
        description: data.cam_loc,
      });
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
  }, []);

  useEffect(() => {
    socket.on("incident_event", (data) => {
      const { description, url_video } = data;
      console.log("📥 Received incident-notif:", data);
      console.log("✅ Connected to Socket.IO server");
      const shouldNotify =
        (description.includes("Wrong Way") && settings.wrongWay) ||
        (description.includes("Stop Vehicle in Congested Traffic") &&
          settings.stopInCongested) ||
        (description.includes("Slow Down") && settings.slowDown) ||
        (description.includes("Stop Vehicle in Fluid Traffic") &&
          settings.stopInFluid);

      if (shouldNotify) {
        setPopupIncident({ description, videoUrl: url_video });
      }
    });

    return () => {
      socket.off("incident_event");
    };
  }, [settings]);
};
