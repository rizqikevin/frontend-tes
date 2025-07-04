// src/hooks/useSocketNotifications.ts
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useNotificationStore } from "@/stores/useNotificationStore";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["polling"],
});
export const useSocketNotifications = () => {
  const { settings, setPopupIncident } = useNotificationStore();

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
