import React from "react";
import LineChart from "../LineChart";
import DistribusiBebanChart from "../BarChart";
const Beban: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 h-full ">
      <div className="flex flex-col gap-x-4">
        <LineChart
          title="Total Active Power (kW)"
          labels={[
            "08:50",
            "08:55",
            "09:00",
            "09:05",
            "09:10",
            "09:15",
            "09:20",
            "09:25",
            "09:30",
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
          title="Tegangan (Volt)"
          labels={[
            "08:50",
            "08:55",
            "09:00",
            "09:05",
            "09:10",
            "09:15",
            "09:20",
            "09:25",
            "09:30",
          ]}
          datasets={[
            {
              label: "Total Active Power",
              data: [65, 70, 80, 92, 88, 85, 89, 100, 95],
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
          title="Total Active Power (kW) (Mingguan)"
          labels={[
            "08:50",
            "08:55",
            "09:00",
            "09:05",
            "09:10",
            "09:15",
            "09:20",
            "09:25",
            "09:30",
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
          title="Total Active Power (kW) (Bulanan)"
          labels={[
            "08:50",
            "08:55",
            "09:00",
            "09:05",
            "09:10",
            "09:15",
            "09:20",
            "09:25",
            "09:30",
          ]}
          datasets={[
            {
              label: "Total Reactive Power",
              data: [65, 70, 80, 92, 88, 85, 89, 100, 95],
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
