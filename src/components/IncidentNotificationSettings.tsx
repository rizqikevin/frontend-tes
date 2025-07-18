// src/pages/IncidentNotificationSettings.tsx
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { useNotificationStore } from "@/stores/useNotificationStore";

const labelToKeyMap = {
  "Wrong Way": "wrongWay",
  "Slow Down": "slowDown",
  "Stop Vehicle in Fluid Traffic": "stopInFluid",
  "Stop Vehicle in Congested Traffic": "stopInCongested",
} as const;

function IncidentNotificationSettings() {
  const { settings, fetchSettings, updateSettings } = useNotificationStore();

  useEffect(() => {
    if (
      settings.wrongWay === true &&
      settings.slowDown === true &&
      settings.stopInFluid === true &&
      settings.stopInCongested === true
    ) {
      fetchSettings();
    }
  }, []);

  const handleToggle = (label: keyof typeof labelToKeyMap) => {
    const key = labelToKeyMap[label];
    const newValue = !settings[key];
    updateSettings({ [key]: newValue });
  };

  return (
    <div className="p-6 bg-dashboard-accent text-white rounded-xl max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Pengaturan Notifikasi</h2>
      {Object.entries(labelToKeyMap).map(([label, key]) => (
        <div key={label} className="flex justify-between items-center py-2">
          <span>{label}</span>
          <Switch
            checked={settings[key]}
            onCheckedChange={() =>
              handleToggle(label as keyof typeof labelToKeyMap)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default IncidentNotificationSettings;
