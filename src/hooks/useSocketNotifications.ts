import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  useNotificationStore,
  useIncidentSocketStore,
} from "@/stores/useNotificationStore";
import { toast } from "sonner";
import { camLocationMap } from "@/components/dashboard/Admin/dummydata/camLocations";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
});
export const useSocketNotifications = () => {
  const { settings } = useNotificationStore();
  const { addIncident } = useIncidentSocketStore();

  useEffect(() => {
    socket.on("incident:data", (data) => {
      const coords = camLocationMap[data.cam_loc] ?? [3.22477, 99.22196];
      const { description } = data;
      const shouldNotify =
        (description.includes("WrongWay") && settings.wrongWay) ||
        (description.includes("StopVeh") && settings.stopInCongested) ||
        (description.includes("SlowVeh") && settings.slowDown) ||
        (description.includes("Stop Vehicle in Fluid Traffic") &&
          settings.stopInFluid);

      if (shouldNotify) {
        const incident = {
          ...data,
          lat: coords[0],
          lng: coords[1],
        };
        console.log(shouldNotify);
        addIncident(incident);
      }
      console.log(
        `Insiden baru from Socket Notification : ${data.description}`,
        {
          description: data.cam_loc,
        }
      );
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
