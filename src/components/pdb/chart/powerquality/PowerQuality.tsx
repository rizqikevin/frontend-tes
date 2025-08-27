import React, { useEffect, useState } from "react";
import LineChart from "../LineChart";
import { useBebanActiveStore } from "@/stores/useBebanActiveStore";
import { ChartPlaceholder } from "../beban/Beban";
import { usePdbHistoryStore } from "@/stores/useStatsCardPdbStore";

const PowerQuality: React.FC = () => {
  const data = useBebanActiveStore((state) => state.data);
  const fetchChartData = useBebanActiveStore((state) => state.fetchChartData);
  const sensorName = usePdbHistoryStore((state) => state.sensorName);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchChartData("power_factor");
      await fetchChartData("frequency");
    };
    const interval = setInterval(fetchAll, 1000);
    return () => clearInterval(interval);
  }, [sensorName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 h-full ">
      <div className="flex flex-col gap-x-4">
        {data.power_factor.datasets.length > 0 ? (
          <LineChart
            title={data.power_factor.metadata.title}
            labels={data.power_factor.labels}
            datasets={[
              {
                label: data.power_factor.datasets[0].label,
                data: data.power_factor.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="PowerFactor (Overall)" />
        )}
        {data.frequency.datasets.length > 0 ? (
          <LineChart
            title={data.frequency.metadata.title}
            labels={data.frequency.labels}
            datasets={[
              {
                label: data.frequency.datasets[0].label,
                data: data.frequency.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Frekuensi (Hz)" />
        )}

        <LineChart
          title="Imbalance"
          labels={[
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
            "08:55:55",
          ]}
          datasets={[
            {
              label: "Frekuensi (Hz)",
              data: [65, 100, 80, 92, 88, 85, 89, 100, 95],
              borderColor: "limegreen",
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              tension: 0.4,
              fill: true,
              pointRadius: 0,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PowerQuality;
