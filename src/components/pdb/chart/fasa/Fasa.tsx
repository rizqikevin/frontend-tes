import React from "react";
import LineChart from "../LineChart";
const Fasa: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <LineChart
        title="Tegangan per Fasa (V)"
        showLegends={true}
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
            label: "R",
            data: [0, 70, 80, 92, 88, 85, 89, 100, 95],
            borderColor: "limegreen",
            backgroundColor: "rgba(0,255,0,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
          {
            label: "S",
            data: [55, 60, 68, 75, 0, 85, 90, 95, 100],
            borderColor: "dodgerblue",
            backgroundColor: "rgba(30,144,255,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
          {
            label: "T",
            data: [20, 30, 40, 50, 20, 70, 80, 90, 10],
            borderColor: "orange",
            backgroundColor: "rgba(255,165,0,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
        ]}
      />
      <LineChart
        title="Arus per Fasa (A)"
        showLegends={true}
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
            label: "R",
            data: [65, 70, 80, 92, 88, 85, 89, 100, 95],
            borderColor: "limegreen",
            backgroundColor: "rgba(0,255,0,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
          {
            label: "S",
            data: [55, 60, 68, 75, 80, 85, 90, 95, 100],
            borderColor: "dodgerblue",
            backgroundColor: "rgba(30,144,255,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
          {
            label: "T",
            data: [20, 30, 40, 50, 60, 70, 80, 90, 10],
            borderColor: "orange",
            backgroundColor: "rgba(255,165,0,0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
        ]}
      />
    </div>
  );
};

export default Fasa;
