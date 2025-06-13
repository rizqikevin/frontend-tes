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
];

const tableData = [
  {
    id: 1,
    location: "CCTV COUNTING TEBING TINGGI (ANTRIAN EXIT) A (1A)",
    hourlyData: Array(24).fill(2918),
  },
];

export const Chart: React.FC = () => {
  return (
    <>
      <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
        <div className="p-1">
          <LineChart title="UPS" labels={labels} datasets={datasets} />
        </div>
      </div>
    </>
  );
};
