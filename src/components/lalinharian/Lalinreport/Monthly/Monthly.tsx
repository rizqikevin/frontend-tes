import React, { useEffect, useState } from "react";
import api from "@/services/api";
import LineChart from "./LineChart";

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
  "#0EA5E9",
];

export const Monthly: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMonthlyData = async (targetDate: Date) => {
    setLoading(true);
    try {
      const m = targetDate.getMonth() + 1;
      const y = targetDate.getFullYear();
      const res = await api.get(`/counting/monthly/${m}/${y}`);
      const data = res.data;

      if (!Array.isArray(data) || data.length === 0) {
        setLabels([]);
        setDatasets([]);
        setTableData([]);
        return;
      }

      const sample = data[0];
      const locationNames = Object.keys(sample).filter((k) => k !== "Location");

      const labelList = data.map((row: any) => row["Location"]);
      const cleanLabels = labelList.map((l: string) => {
        const [start] = l.split("-");
        return `${start.padStart(2, "0")}`;
      });

      const ds = locationNames.map((name, idx) => ({
        label: name,
        data: data.map((row: any) => parseInt(row[name] || "0", 10)),
        borderColor: colorPalette[idx % colorPalette.length],
        backgroundColor: colorPalette[idx % colorPalette.length],
        tension: 0.3,
      }));

      const tData = locationNames.map((name, i) => ({
        id: i + 1,
        location: name,
        hourlyData: data.map((row: any) => parseInt(row[name] || "0", 10)),
      }));

      setLabels(cleanLabels);
      setDatasets(ds);
      setTableData(tData);
    } catch (error) {
      console.error("Failed to fetch monthly data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyData(date);
  }, [date]);

  const handleDateChange = (newDate: Date) => setDate(newDate);

  const grandTotal = tableData.reduce(
    (sum, item) => sum + item.hourlyData.reduce((s, n) => s + n, 0),
    0
  );

  return (
    <>
      <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
        <div className="p-1">
          <LineChart
            title="Monthly"
            labels={labels}
            datasets={datasets}
            date={date}
            onDateChange={handleDateChange}
            loading={loading}
          />
        </div>
      </div>

      <div className="bg-dashboard-accent rounded-lg p-4 mt-4 overflow-x-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Memuat data...</div>
        ) : (
          <div className="w-full overflow-x-auto">
            {" "}
            {/* tetap gunakan scroll dalam tabel saja */}
            <table className="w-full text-xs text-gray-200 table-auto border-collapse">
              <thead>
                <tr className="text-gray-300">
                  <th className="px-2 py-1 text-left font-medium">#</th>
                  <th className="px-2 py-1 text-left font-medium">Location</th>
                  {labels.map((label, i) => (
                    <th
                      key={i}
                      className="px-1 py-1 text-center whitespace-nowrap"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tableData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-2 py-5">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-2 py-5">{item.location}</td>
                    {item.hourlyData.map((val: number, i: number) => (
                      <td key={i} className="px-1 py-1 text-center">
                        {val.toLocaleString("id-ID")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-700 text-white">
                  <td
                    colSpan={labels.length + 1}
                    className="px-4 py-3 font-semibold"
                  >
                    Grand Total
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {grandTotal.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
