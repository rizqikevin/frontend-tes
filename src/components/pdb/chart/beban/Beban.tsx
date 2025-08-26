import React, { useEffect } from "react";
import LineChart from "../LineChart";
import DistribusiBebanChart from "../BarChart";
import { useBebanActiveStore } from "@/stores/useBebanActiveStore";
import { usePdbHistoryStore } from "@/stores/useStatsCardPdbStore";

export const ChartPlaceholder = ({ title }: { title: string }) => (
  <div className="w-full bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4 text-white px-4 py-3 flex flex-1 flex-col">
    <h2 className="text-md font-semibold mb-2">{title}</h2>
    <div className="h-[250px] w-full bg-dashboard-accent animate-pulse rounded-md">
      <div className="h-full items-center flex justify-center">
        {" "}
        Memuat data...
      </div>
    </div>
  </div>
);

const Beban: React.FC = () => {
  const data = useBebanActiveStore((state) => state.data);
  const fetchChartData = useBebanActiveStore((state) => state.fetchChartData);
  const sensorName = usePdbHistoryStore((state) => state.sensorName);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchChartData("active_power");
      await fetchChartData("tegangan");
      await fetchChartData("active_power_weekly");
      await fetchChartData("active_power_monthly");
    };
    const interval = setInterval(fetchAll, 1000);
    return () => clearInterval(interval);
  }, [sensorName]);

  // console.log(data?.active_power.datasets[0].data);

  return (
    <div className="flex flex-col gap-1 h-full ">
      <div className="flex flex-col gap-x-4">
        {data.active_power.datasets.length > 0 ? (
          <LineChart
            title={data.active_power.metadata.title}
            labels={data.active_power.labels}
            datasets={[
              {
                label: data.active_power.datasets[0].label,
                data: data.active_power.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Active Power" />
        )}
        {data.tegangan.datasets.length > 0 ? (
          <LineChart
            title="Tegangan (Volt)"
            labels={data.tegangan.labels}
            datasets={[
              {
                label: data.tegangan.datasets[0].label,
                data: data.tegangan.datasets[0].data,
                borderColor: "orange",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Tegangan (Volt)" />
        )}
      </div>

      <div className="flex flex-row gap-x-4">
        {data.active_power_weekly.datasets.length > 0 ? (
          <LineChart
            title={data.active_power_weekly.metadata.title}
            labels={data.active_power_weekly.labels}
            datasets={[
              {
                label: data.active_power_weekly.datasets[0].label,
                data: data.active_power_weekly.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Active Power Weekly" />
        )}
        {data.active_power_monthly.datasets.length > 0 ? (
          <LineChart
            title={data.active_power_monthly.metadata.title}
            labels={data.active_power_monthly.labels}
            datasets={[
              {
                label: data.active_power_monthly.datasets[0].label,
                data: data.active_power_monthly.datasets[0].data,
                borderColor: "limegreen",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ]}
          />
        ) : (
          <ChartPlaceholder title="Active Power Monthly" />
        )}
      </div>

      {/* <DistribusiBebanChart
        title="Distribusi beban (Histogram kW)"
        labels={["8.0-8.5", "8.5-9.0"]}
        datasets={[
          {
            label: "Distribusi Beban",
            data: [95, 70],
            backgroundColor: "limegreen",
            borderWidth: 0,
          },
        ]}
      /> */}
    </div>
  );
};

export default Beban;
