import LineChart from "./LineChart";

const labels = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const datasets = [
  {
    label: "CCTV On Ramp TEBING TINGGI (1A)",
    data: [
      120, 150, 200, 240, 300, 500, 700, 1000, 1300, 1600, 1700, 1800, 1900,
      1850, 1900, 1950, 2000, 2100, 2200, 2300, 2400, 2600, 2800, 3000,
    ],
    borderColor: "#FACC15", // yellow-400
    backgroundColor: "#FACC15",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp TEBING TINGGI (1B)",
    data: [
      80, 100, 130, 160, 180, 200, 300, 400, 500, 600, 800, 1000, 1100, 1050,
      1020, 980, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
    ],
    borderColor: "#22C55E", // green-500
    backgroundColor: "#22C55E",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp TEBING TINGGI (1C)",
    data: [
      70, 90, 110, 140, 160, 180, 250, 300, 400, 500, 600, 750, 900, 950, 1000,
      1050, 1070, 1100, 1150, 1200, 1250, 1300, 1350, 1400,
    ],
    borderColor: "#EF4444", // red-500
    backgroundColor: "#EF4444",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp TEBING TINGGI (1D)",
    data: [
      65, 75, 100, 130, 170, 210, 270, 320, 400, 480, 550, 630, 700, 750, 780,
      820, 870, 910, 950, 980, 1000, 1100, 1200, 1300,
    ],
    borderColor: "#3B82F6", // blue-500
    backgroundColor: "#3B82F6",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp TEBING TINGGI (1E)",
    data: [
      90, 110, 140, 180, 230, 300, 350, 420, 500, 600, 720, 850, 950, 970, 990,
      1010, 1050, 1100, 1200, 1300, 1350, 1400, 1500, 1600,
    ],
    borderColor: "#A855F7", // purple-500
    backgroundColor: "#A855F7",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp INDRAPURA (2A)",
    data: [
      100, 130, 170, 200, 240, 300, 380, 460, 520, 600, 700, 800, 850, 880, 900,
      920, 950, 980, 1000, 1100, 1150, 1200, 1250, 1300,
    ],
    borderColor: "#EC4899", // pink-500
    backgroundColor: "#EC4899",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp INDRAPURA (2B)",
    data: [
      60, 85, 120, 160, 190, 230, 270, 320, 380, 460, 500, 550, 580, 600, 640,
      680, 710, 750, 800, 850, 900, 920, 940, 960,
    ],
    borderColor: "#14B8A6", // teal-500
    backgroundColor: "#14B8A6",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp INDRAPURA (2C)",
    data: [
      70, 100, 130, 170, 210, 260, 300, 370, 430, 500, 580, 630, 700, 740, 770,
      800, 830, 860, 880, 900, 930, 950, 970, 990,
    ],
    borderColor: "#F97316", // orange-500
    backgroundColor: "#F97316",
    tension: 0.3,
  },
  {
    label: "CCTV On Ramp INDRAPURA (2D)",
    data: [
      55, 75, 100, 130, 180, 230, 280, 340, 390, 450, 500, 560, 600, 630, 660,
      700, 730, 750, 770, 800, 820, 850, 880, 900,
    ],
    borderColor: "#64748B", // slate-500
    backgroundColor: "#64748B",
    tension: 0.3,
  },
];

const tableData = [
  {
    id: 1,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) A (1A)",
    hourlyData: Array(24).fill(2918),
  },
  {
    id: 2,
    location: "CCTV On Ramp TEBING TINGGI (ANTRIAN EXIT) B (1B)",
    hourlyData: Array(24).fill(1150),
  },
  {
    id: 3,
    location: "CCTV On Ramp TEBING TINGGI (ANTRIAN EXIT) C (1C)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 4,
    location: "CCTV On Ramp TEBING TINGGI (ANTRIAN EXIT) D (1D)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 5,
    location: "CCTV On Ramp TEBING TINGGI (ANTRIAN EXIT) E (1E)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 6,
    location: "CCTV On Ramp INDRAPURA (ANTRIAN EXIT) A (2A)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 7,
    location: "CCTV On Ramp INDRAPURA (ANTRIAN EXIT) B (2B)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 8,
    location: "CCTV On Ramp INDRAPURA (ANTRIAN EXIT) C (2C)",
    hourlyData: Array(24).fill(0),
  },
  {
    id: 9,
    location: "CCTV On Ramp INDRAPURA (ANTRIAN EXIT) D (2D)",
    hourlyData: Array(24).fill(0),
  },
];

export const Monthly: React.FC = () => {
  const grandTotal = tableData.reduce(
    (sum, item) => sum + item.hourlyData.reduce((s, n) => s + n, 0),
    0
  );

  return (
    <>
      <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
        <div className="p-1">
          <LineChart title="Monthly" labels={labels} datasets={datasets} />
        </div>
      </div>

      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
        <table className="min-w-[1000px] w-full text-xs text-gray-200 table-auto">
          <thead>
            <tr className=" text-gray-300">
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
                {item.hourlyData.map((value, i) => (
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
