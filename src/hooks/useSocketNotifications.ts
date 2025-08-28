import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  useNotificationStore,
  useIncidentSocketStore,
} from "@/stores/useNotificationStore";
import { toast } from "sonner";
import { camLocationMap } from "@/components/dashboard/Admin/dummydata/camLocations";
import { isAuthenticated } from "@/services/auth-service";
import { User } from "lucide-react";
import { UserRole } from "@/types";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
});
export const useSocketNotifications = () => {
  const { settings, setPopupIncident, addPopupIncident } =
    useNotificationStore();
  const { addIncident } = useIncidentSocketStore();

  useEffect(() => {
    socket.on("incident:data", (data) => {
      const coords = camLocationMap[data.cam_loc] ?? [3.22477, 99.22196];
      const incident = {
        ...data,
        lat: coords[0],
        lng: coords[1],
      };
      const { description, url_video, cam_loc, ...rest } = data;
      const shouldNotify =
        (description.includes("WrongWay") && settings.wrongWay) ||
        (description.includes("StopVeh") && settings.stopInCongested) ||
        (description.includes("SlowVeh") && settings.slowDown) ||
        (description.includes("Stop Vehicle in Fluid Traffic") &&
          settings.stopInFluid);

      if (!shouldNotify || !isAuthenticated()) return;

      addPopupIncident({
        id: data.id,
        description,
        url_video,
        cam_loc: data.cam_loc,
        time_logging: data.time_logging,
        date_logging: data.date_logging,
        lat: data.lat,
        lng: data.lng,
      });

      setPopupIncident({
        description: description,
        url_video: url_video,
        cam_loc: cam_loc,
        ...rest,
      });
      addIncident(incident);

      // console.log(
      //   `Insiden baru from Socket Notification : ${data.description}`,
      //   {
      //     description: data.cam_loc,
      //   }
      // );
    });

    const isSupport = UserRole.SUPPORT;

    if (isSupport || !isAuthenticated()) return;

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
