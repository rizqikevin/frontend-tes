import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  title: string;
  total: string;
  labels: string[];
  data: number[];
  backgroundColors: string[];
};

export const DoughnutChart = ({
  title,
  total,
  labels,
  data,
  backgroundColors,
}: DoughnutChartProps) => {
  return (
    <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-64 h-full">
      <h4 className="text-base font-semibold mb-2">{title}</h4>
      <p className="text-center mt-4 font-semibold py-2">{total}</p>
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: backgroundColors,
              borderWidth: 0,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "white" },
            },
          },
        }}
      />
    </div>
  );
};
