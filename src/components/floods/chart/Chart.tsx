import React, { useEffect } from "react";
import StatusSensor from "./StatusSensor";
import LineChart from "@/components/pdb/chart/LineChart";
import FloodEventTable from "./FloodEventTable";
import { useChartFloodStore } from "@/stores/useChartFloodStore";
import { ChartPlaceholder } from "@/components/pdb/chart/beban/Beban";

const Chart: React.FC = () => {
  const optionsSensor = useChartFloodStore((state) => state.optionsSensor);
  const setSensorName = useChartFloodStore((state) => state.setSensorName);
  const sensorName = useChartFloodStore((state) => state.sensorName);
  const fetchOptionsData = useChartFloodStore(
    (state) => state.fetchOptionsData
  );
  const data = useChartFloodStore((state) => state.data);
  const fetchChartData = useChartFloodStore((state) => state.fetchChartData);
  const sensor = optionsSensor.map((item) => item.sensor_name);

  useEffect(() => {
    const fetchAll = async () => {
      fetchOptionsData();
      fetchChartData("level_air");
      fetchChartData("level_air");
    };

    fetchAll();
  }, [sensorName]);

  // console.log("data", data);
  // console.log("optionsSensor", optionsSensor);

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
      <div className="flex flex-row mb-3">
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-semibold">Flood Sensor</h1>
          <p className="text-sm text-gray-400">Overview Flood Sensor</p>
        </div>
        <div className="flex flex-col ml-auto">
          <div className="bg-dashboard-accent border  border-white flex rounded text-white">
            <select
              value={sensorName}
              onChange={(e) => setSensorName(e.target.value)}
              className="text-white  bg-dashboard-accent p-3 rounded-lg outline-none"
            >
              {optionsSensor.map((g) => (
                <option key={g.sensor_name} value={g.sensor_name}>
                  {g.sensor_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Status Sensor Section */}
      <div className="w-full  text-white rounded-md p-0">
        <StatusSensor sensors={sensor} />
      </div>

      {/* Level Air Section */}
      <div className="grid grid-cols-2 gap-4">
        {data.level_air.datasets.length > 0 ? (
          <LineChart
            title={data.level_air.metadata.title}
            showLegends={true}
            labels={data.level_air.labels}
            datasets={[
              {
                label: data.level_air.datasets[0].label,
                data: data.level_air.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Level Air" />
        )}

        {data.level_air.datasets.length > 0 ? (
          <LineChart
            title="Level Air - Flood_Sensor_1"
            showLegends={true}
            labels={data.level_air.labels}
            datasets={[
              {
                label: data.level_air.datasets[0].label,
                data: data.level_air.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Level Air" />
        )}
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
