import { Switch } from "@/components/ui/switch";
import api from "@/services/api";
import { useEffect, useState } from "react";

const descriptions = [
  "Wrong Way",
  "Slow Down",
  "Stop Vehicle in Fluid Traffic",
  "Stop Vehicle in Congested Traffic",
];

function IncidentNotificationSettings() {
  const [status, setStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.get("/incident/notif").then((res) => {
      const s: Record<string, boolean> = {};
      for (const row of res.data.data) {
        s[row.description] = row.status;
      }
      setStatus(s);
    });
  }, []);

  const toggle = (desc: string) => {
    const newStatus = !status[desc];
    setStatus((prev) => ({ ...prev, [desc]: newStatus }));
    api.put("/incident/notif", { description: desc, status: newStatus });
  };

  return (
    <div className="p-6  bg-dashboard-accent text-white rounde">
      <h2 className="text-lg font-semibold mb-4d">Pengaturan Notifikasi</h2>
      {descriptions.map((desc) => (
        <div key={desc} className="flex justify-between items-center py-2">
          <span>{desc}</span>
          <Switch checked={status[desc]} onCheckedChange={() => toggle(desc)} />
        </div>
      ))}
    </div>
  );
}

export default IncidentNotificationSettings;
