import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

function generateColor(index: number) {
  const colors = [
    "#FFBD35", // yellow
    "#6AC36A", // green
    "#FF5C5C", // red
    "#7DA7D9", // blue
    "#B566F4", // purple
    "#567EFF", // blue variant
    "#AAAAAA", // gray
    "#F47C57", // orange
    "#3DDAD7", // teal
  ];

  return colors[index % colors.length];
}

export const Summary: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState<
    { location: string; total: number }[]
  >([]);

  const fetchData = async (d: number, m: number, y: number) => {
    try {
      const response = await api.get(`/counting/summary/${d}/${m}/${y}`);
      const data = response.data;

      // const labels = data.map((item: any) => item["Nama Lokasi"]);

      const labels = data.map((item: string) => {
        const match = item["Nama Lokasi"].match(
          /CCTV\s.*?\s([A-E])\s(\(\d[A-Z]\))/
        );
        if (match && match.length >= 3) {
          const group = match[1].replace(" ", " ");
          // return `CCTV ${match[1]} ${match[2]}`;
          return group;
        }
        return item["Nama Lokasi"];
      });

      // console.log(labels);

      const datasets = data.map((item: any, index: number) => ({
        label: item["Nama Lokasi"],
        data: labels.map((label: string, i: number) =>
          i === index ? parseInt(item.Total) : 0
        ),
        backgroundColor: generateColor(index),
      }));

      const table = data.map((item: any) => ({
        location: item["Nama Lokasi"],
        total: parseInt(item.Total),
      }));

      setChartData({ labels, datasets });
      setTableData(table);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    fetchData(d, m, y);
  }, [date]);

  const grandTotal = tableData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
      <div className="p-1">
        <BarChart
          title="Summary"
          labels={chartData.labels}
          datasets={chartData.datasets}
          date={date}
          onDateChange={setDate}
        />
      </div>
      <div className="bg-dashboard-accent rounded-lg p-2">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Location
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-gray-200">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-200">
                  {item.location}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-200">
                  {item.total.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-700">
              <td colSpan={2} className="px-4 py-3 text-sm font-semibold">
                Grand Total
              </td>
              <td className="px-4 py-3 text-sm text-right font-semibold">
                {grandTotal.toLocaleString("id-ID")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
