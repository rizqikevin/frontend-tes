import React, { useEffect, useState } from "react";
import LineChart from "../LineChart";
import { useBebanActiveStore } from "@/stores/useBebanActiveStore";
import { usePdbHistoryStore } from "@/stores/useStatsCardPdbStore";
import { ChartPlaceholder } from "../beban/Beban";

const Fasa: React.FC = () => {
  const data = useBebanActiveStore((state) => state.data);
  const fetchChartData = useBebanActiveStore((state) => state.fetchChartData);
  const sensorName = usePdbHistoryStore((state) => state.sensorName);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchChartData("tegangan_per_fasa");
      await fetchChartData("arus_per_fasa");
    };
    const interval = setInterval(fetchAll, 1000);
    return () => clearInterval(interval);
  }, [sensorName]);

  // console.log(data.tegangan_per_fasa.datasets[0].label);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 h-full">
      <div className="flex flex-col gap-4">
        {data.tegangan_per_fasa.datasets.length > 0 ? (
          <LineChart
            title={data.tegangan_per_fasa.metadata.title}
            showLegends={true}
            labels={data.tegangan_per_fasa.labels}
            datasets={[
              {
                label: data.tegangan_per_fasa.datasets[0].label,
                data: data.tegangan_per_fasa.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0,255,0,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
              {
                label: data.tegangan_per_fasa.datasets[1].label,
                data: data.tegangan_per_fasa.datasets[1].data,
                borderColor: "dodgerblue",
                backgroundColor: "rgba(30,144,255,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
              {
                label: data.tegangan_per_fasa.datasets[2].label,
                data: data.tegangan_per_fasa.datasets[2].data,
                borderColor: "orange",
                backgroundColor: "rgba(255,165,0,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Tegangan Per Fasa" />
        )}

        {data.arus_per_fasa.datasets.length > 0 ? (
          <LineChart
            title={data.arus_per_fasa.metadata.title}
            showLegends={true}
            labels={data.arus_per_fasa.labels}
            datasets={[
              {
                label: data.tegangan_per_fasa.datasets[0].label,
                data: data.tegangan_per_fasa.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0,255,0,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
              {
                label: data.tegangan_per_fasa.datasets[1].label,
                data: data.tegangan_per_fasa.datasets[1].data,
                borderColor: "dodgerblue",
                backgroundColor: "rgba(30,144,255,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
              {
                label: data.tegangan_per_fasa.datasets[2].label,
                data: data.tegangan_per_fasa.datasets[2].data,
                borderColor: "orange",
                backgroundColor: "rgba(255,165,0,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Arus Per Fasa" />
        )}
      </div>
    </div>
  );
};

export default Fasa;
