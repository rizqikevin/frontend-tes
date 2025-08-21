import React from "react";
import LineChart from "../LineChart";

const PowerQuality: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
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
      <LineChart
        title="Power Factor (Overall)"
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
  );
};

export default PowerQuality;
