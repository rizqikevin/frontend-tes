import React, { useEffect } from "react";
import LineChart from "../LineChart";
import DistribusiBebanChart from "../BarChart";
import { useBebanActiveStore } from "@/stores/useBebanActiveStore";
import { usePdbHistoryStore } from "@/stores/useStatsCardPdbStore";

const Beban: React.FC = () => {
  const { data, fetchChartData } = useBebanActiveStore();
  const { sensorName } = usePdbHistoryStore();

  useEffect(() => {
    const fetchAll = async () => {
      await fetchChartData("active_power");
      await fetchChartData("tegangan");
      await fetchChartData("active_power_weekly");
      await fetchChartData("active_power_monthly");
    };
    const interval = setInterval(fetchAll, 100);
    return () => clearInterval(interval);
  }, [sensorName]);

  // console.log(data.active_power.datasets[0].label);

  return (
    <div className="flex flex-col gap-1 h-full ">
      <div className="flex flex-col gap-x-4">
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
      </div>

      <div className="flex flex-row gap-x-4">
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
