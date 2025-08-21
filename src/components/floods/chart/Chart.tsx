import React from "react";
import StatusSensor from "./StatusSensor";
import LineChart from "@/components/pdb/chart/LineChart";
import FloodEventTable from "./FloodEventTable";

const Chart: React.FC = () => {
  const dummyLabels = [
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
    "08:55:55",
  ];

  const dummyDatasetLevel = [
    {
      label: "Level (m)",
      data: [65, 100, 80, 92, 88, 85, 89, 100, 95],
      borderColor: "limegreen",
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
  ];

  const dummyDatasetRate = [
    {
      label: "Rate (cm/mnt)",
      data: [65, 100, 80, 92, 88, 85, 89, 100, 95],
      borderColor: "limegreen",
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {/* Status Sensor Section */}
      <div className="w-full bg-dashboard-accent text-white rounded-md p-4">
        <StatusSensor />
      </div>

      {/* Level Air Section */}
      <div className="grid grid-cols-2 gap-4">
        <LineChart
          title="Level Air - Flood_Sensor_2"
          showLegends={true}
          labels={dummyLabels}
          datasets={dummyDatasetLevel}
        />
        <LineChart
          title="Level Air - Flood_Sensor_1"
          showLegends={true}
          labels={dummyLabels}
          datasets={dummyDatasetLevel}
        />
      </div>

      {/* Rate Section */}
      <div className="grid grid-cols-2 gap-4">
        <LineChart
          title="Rate - Flood_Sensor_2"
          showLegends={true}
          labels={dummyLabels}
          datasets={dummyDatasetRate}
        />
        <LineChart
          title="Rate - Flood_Sensor_1"
          showLegends={true}
          labels={dummyLabels}
          datasets={dummyDatasetRate}
        />
      </div>

      {/* Event Table Section */}
      <div className="w-full bg-dashboard-accent text-white mt-4 rounded-md p-4">
        <FloodEventTable />
      </div>
    </div>
  );
};

export default Chart;
