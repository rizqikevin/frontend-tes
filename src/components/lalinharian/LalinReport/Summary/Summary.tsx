import BarChart from "./BarChart";

const labels = [
  "CCTV A (1A)",
  "CCTV B (1B)",
  "CCTV C (1C)",
  "CCTV D (1D)",
  "CCTV E (1E)",
  "CCTV A (2A)",
  "CCTV B (2B)",
  "CCTV C (2C)",
  "CCTV D (2D)",
];

const tableData = [
  {
    id: 1,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) A (1A)",
    total: 621,
  },
  {
    id: 2,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) B (1B)",
    total: 1578,
  },
  {
    id: 3,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) C (1C)",
    total: 145,
  },
  {
    id: 4,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) D (1D)",
    total: 226,
  },
  {
    id: 5,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) E (1E)",
    total: 246,
  },
  {
    id: 6,
    location: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) A (2A)",
    total: 0,
  },
  {
    id: 7,
    location: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) B (2B)",
    total: 0,
  },
  {
    id: 8,
    location: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) C (2C)",
    total: 0,
  },
  {
    id: 9,
    location: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) D (2D)",
    total: 0,
  },
];

const datasets = [
  {
    label: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) A (1A)",
    data: [800, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "#FFBD35",
  },
  {
    label: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) B (1B)",
    data: [0, 3000, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "#6AC36A",
  },
  {
    label: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) C (1C)",
    data: [0, 0, 3000, 0, 0, 0, 0, 0, 0],
    backgroundColor: "#FF5C5C",
  },
  {
    label: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) D (1D)",
    data: [0, 0, 0, 2000, 0, 0, 0, 0, 0],
    backgroundColor: "#7DA7D9",
  },
  {
    label: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) E (1E)",
    data: [0, 0, 0, 0, 2500, 0, 0, 0, 0],
    backgroundColor: "#B566F4",
  },
  {
    label: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) A (2A)",
    data: [0, 0, 0, 0, 0, 3000, 0, 0, 0],
    backgroundColor: "#FFBD35",
  },
  {
    label: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) B (2B)",
    data: [0, 0, 0, 0, 0, 0, 2000, 0, 0],
    backgroundColor: "#567EFF",
  },
  {
    label: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) C (2C)",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "#AAAAAA",
  },
  {
    label: "CCTV COUNTING INDRAPURA (ANTRIAN EXIT) D (2D)",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "#AAAAAA",
  },
];

export const Summary: React.FC = () => {
  const grandTotal = tableData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
      <div className="p-1">
        <BarChart title="Summary" labels={labels} datasets={datasets} />
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
              <tr key={item.id}>
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
