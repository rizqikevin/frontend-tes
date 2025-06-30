import React, { useEffect, useState } from "react";
import LineChart from "./Linechart";
import api from "@/services/api";

const colorPalette = [
  "#FACC15",
  "#22C55E",
  "#EF4444",
  "#3B82F6",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#64748B",
];

export const Daily: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [datasets, setDatasets] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const fetchData = async (targetDate: Date) => {
    try {
      const d = targetDate.getDate();
      const m = targetDate.getMonth() + 1;
      const y = targetDate.getFullYear();

      const response = await api.get(`/counting/daily/${d}/${m}/${y}`);
      const data = response.data;

      const sample = data[0];
      const locationNames = Object.keys(sample).filter(
        (key) => key !== "Location"
      );

      const generatedLabels = data.map((item: string) => item["Location"]);

      const desiredLabels = generatedLabels.map((label: string) => {
        const parts = label.split("-");
        return parts[1];
      });
      console.log(desiredLabels);

      const generatedDatasets = locationNames.map((name, idx) => ({
        label: name,
        data: data.map((row: any) => parseInt(row[name] || "0", 10)),
        borderColor: colorPalette[idx % colorPalette.length],
        backgroundColor: colorPalette[idx % colorPalette.length],
        tension: 0.3,
      }));

      setLabels(desiredLabels);
      setDatasets(generatedDatasets);

      const generatedTableData = locationNames.map((name, i) => ({
        id: i + 1,
        location: name,
        hourlyData: data.map((row: any) => parseInt(row[name] || "0", 10)),
      }));

      setTableData(generatedTableData);
    } catch (error) {
      console.error("Gagal ambil data daily:", error);
    }
  };

  useEffect(() => {
    fetchData(date);
  }, [date]);

  const handleApply = () => {
    setDate(tempDate);
  };

  const grandTotal = tableData.reduce(
    (sum, item) => sum + item.hourlyData.reduce((s, n) => s + n, 0),
    0
  );

  return (
    <>
      <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
        <div className="p-1">
          <LineChart
            title="Daily"
            labels={labels}
            datasets={datasets}
            date={tempDate}
            onDateChange={setTempDate}
            onApply={handleApply}
          />
        </div>
      </div>

      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
        <table className="min-w-[1000px] w-full text-xs text-gray-200 table-auto">
          <thead>
            <tr className="text-gray-300">
              <th className="px-2 py-1 text-left font-medium whitespace-nowrap">
                #
              </th>
              <th className="px-2 py-1 text-left font-medium whitespace-nowrap">
                Location
              </th>
              {labels.map((label, i) => (
                <th
                  key={i}
                  className="px-1 py-1 font-medium text-center whitespace-nowrap"
                >
                  {label.slice(0, 2)}-
                  {String(Number(label.slice(0, 2)) + 1).padStart(2, "0")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tableData.map((item, index) => (
              <tr key={item.id}>
                <td className="px-2 py-5 text-left align-top whitespace-nowrap">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-2 py-5 text-left align-top whitespace-nowrap">
                  {item.location}
                </td>
                {item.hourlyData.map((value: number, i: number) => (
                  <td
                    key={i}
                    className="px-1 py-1 text-center whitespace-nowrap"
                  >
                    {value.toLocaleString("id-ID")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-700 text-white">
              <td colSpan={25} className="px-4 py-3 text-sm font-semibold">
                Grand Total
              </td>
              <td className="px-4 py-3 text-sm text-right font-semibold">
                {grandTotal.toLocaleString("id-ID")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
