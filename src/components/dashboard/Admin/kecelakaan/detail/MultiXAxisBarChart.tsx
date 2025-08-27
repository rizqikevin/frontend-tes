import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Chart as ChartType,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MultiXAxisBarChartProps {
  title?: string;
  labels: { sub: string; group: string }[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
  height?: number;
}

const MultiXAxisBarChart: React.FC<MultiXAxisBarChartProps> = ({
  title,
  labels,
  datasets,
  height = 400,
}) => {
  const data = {
    labels: labels.map((l) => `${l.sub};${l.group}`),
    datasets: datasets.map((ds) => ({
      ...ds,
      borderRadius: (ctx: any) => {
        const { dataIndex } = ctx;
        if (dataIndex !== undefined) {
          return {
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0,
          };
        }
        return 0;
      },
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "#fff" } },
      title: {
        display: !!title,
        text: title,
        color: "#fff",
        font: { size: 14, weight: "bold" },
        align: "start",
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#fff",
          callback: function (val, index) {
            const rawLabel = (this as any).getLabelForValue(index) as string;
            return rawLabel.split(";")[0];
          },
        },
        grid: { color: "#444" },
      },
      x2: {
        type: "category",
        position: "bottom",
        grid: { drawOnChartArea: false },
        ticks: {
          color: "#0000",
          callback: function (val, index) {
            const labels = (this as any).chart.data.labels as string[];
            const rawLabel = labels[index];
            const group = rawLabel.split(";")[1];
            const prevLabel = labels[index - 1];
            const prevGroup = prevLabel ? prevLabel.split(";")[1] : null;
            return group !== prevGroup ? group : "";
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
    },
  };

  // plugin pembagi group
  const groupDividerPlugin = {
    id: "groupDivider",
    afterDatasetsDraw: (chart: ChartType) => {
      const { ctx, scales } = chart;
      const xAxis = scales.x;
      const yAxis = scales.y;
      const allLabels = chart.data.labels as string[];

      ctx.save();
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "15px sans-serif";

      let lastGroup = "";
      let startIndex = 0;

      allLabels.forEach((raw, index) => {
        const group = raw.split(";")[1];

        if (group !== lastGroup && index > 0) {
          const firstCenter = xAxis.getPixelForTick(startIndex);
          const lastCenter = xAxis.getPixelForTick(index - 1);

          const mid = (firstCenter + lastCenter) / 2;
          ctx.fillText(lastGroup, mid, yAxis.bottom + 30);

          const dividerX = (lastCenter + xAxis.getPixelForTick(index)) / 2;
          ctx.beginPath();
          ctx.moveTo(dividerX, yAxis.top);
          ctx.lineTo(dividerX, yAxis.bottom);
          ctx.stroke();

          startIndex = index;
        }

        lastGroup = group;

        if (index === allLabels.length - 1) {
          const firstCenter = xAxis.getPixelForTick(startIndex);
          const lastCenter = xAxis.getPixelForTick(index);
          const mid = (firstCenter + lastCenter) / 2;
          ctx.fillText(group, mid, yAxis.bottom + 30);
        }
      });

      ctx.restore();
    },
  };

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-md p-4">
      <div className="relative h-[400px]" style={{ height: `${height}px` }}>
        <Bar data={data} options={options} plugins={[groupDividerPlugin]} />
      </div>
    </div>
  );
};

export default MultiXAxisBarChart;
