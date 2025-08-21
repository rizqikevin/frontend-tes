import React from "react";
import LineChart from "../LineChart";
import DistribusiBebanChart from "../BarChart";
const Beban: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-full ">
      <LineChart
        title="Total Active Power (kW)"
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
            label: "Total Active Power",
            data: [65, 70, 80, 92, 88, 85, 89, 100, 95],
            borderColor: "limegreen",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
        ]}
      />

      <DistribusiBebanChart
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
      />
    </div>
  );
};

export default Beban;
