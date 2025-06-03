// src/components/TransactionOverview/VehicleDoughnutChart.tsx
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  patuh: number;
  tidakPatuh: number;
  size?: number;
};

const VehicleDoughnutChart: React.FC<Props> = ({
  patuh,
  tidakPatuh,
  size = 48,
}) => {
  const data = {
    labels: ["Patuh", "Tidak Patuh"],
    datasets: [
      {
        data: [patuh, tidakPatuh],
        backgroundColor: ["#22c55e", "#ef4444"], // green & red
        borderWidth: 0,
      },
    ],
  };

  return (
    <div style={{ width: size, height: size }}>
      <Doughnut
        data={data}
        options={{
          cutout: "70%",
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
        }}
      />
    </div>
  );
};

export default VehicleDoughnutChart;
export { VehicleDoughnutChart };
