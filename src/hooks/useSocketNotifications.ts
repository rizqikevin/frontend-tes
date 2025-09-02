import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import {
  useNotificationStore,
  useIncidentSocketStore,
} from "@/stores/useNotificationStore";
import { toast } from "sonner";
import { camLocationMap } from "@/components/dashboard/Admin/dummydata/camLocations";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

export const useSocketNotifications = () => {
  const { settings, setPopupIncident, addPopupIncident } =
    useNotificationStore();
  const { addIncident } = useIncidentSocketStore();
  const { user } = useAuth();

  useEffect(() => {
    // Only connect if user is logged in and not a SUPPORT role
    if (user && user.role !== UserRole.SUPPORT) {
      const socket: Socket = io(import.meta.env.VITE_SOCKET_URL, {
        transports: ["websocket"],
      });

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

        if (!shouldNotify) return;

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
      });

      socket.on("flood:data", (data) => {
        // console.log(data);
        toast("Peringatan banjir", {
          description: `Nama Sensor : ${data.sensorName} Ketinggian : ${data.sensorValue} M `,
        });
      });

      // Disconnect and clean up listeners when the component unmounts or user changes
      return () => {
        socket.off("incident:data");
        socket.off("flood:data");
        socket.disconnect();
      };
    }
  }, [user, settings, addPopupIncident, setPopupIncident, addIncident]);
};
