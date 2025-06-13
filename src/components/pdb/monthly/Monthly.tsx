// Mock data for the table
const mockTransactionData = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  date: "28/02/2025",
  time: "14:09:35 PM",
  name: "-",
  number: "-",
  powerpln: "-",
  powerups: "-",
  apparentpln: "-",
  apparentups: "-",
  currentpln: "-",
  currentups: "-",
  frequency: "-",
  factorpln: "-",
  factorups: "-",
  voltagepln: "-",
  voltageups: "-",
}));

export const Monthly: React.FC = () => {
  return (
    <>
      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
        <div className="flex justify-between items-center px-0">
          <div>
            <h1 className="text-xl font-medium">Logs Monthly PDB</h1>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-dashboard-accent text-white">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">Date</th>
                <th className="p-5">Time</th>
                <th className="p-5">Name</th>
                <th className="p-5">Number</th>
                <th className="p-5">Power Pln</th>
                <th className="p-5">Power Ups</th>
                <th className="p-5">Apparent Pln</th>
                <th className="p-5">Apparent Ups</th>
                <th className="p-5">Current Pln</th>
                <th className="p-5">Current Ups</th>
                <th className="p-5">Frequency</th>
                <th className="p-5">Factor Pln</th>
                <th className="p-5">Factor Ups</th>
                <th className="p-5">Voltage Pln</th>
                <th className="p-5">Voltage Ups</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactionData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-700">
                  <td className="p-5">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-5">{row.date}</td>
                  <td className="p-5">{row.time}</td>
                  <td className="p-5">{row.name}</td>
                  <td className="p-5">{row.number}</td>
                  <td className="p-5">{row.powerpln}</td>
                  <td className="p-5">{row.powerups}</td>
                  <td className="p-5">{row.apparentpln}</td>
                  <td className="p-5">{row.apparentups}</td>
                  <td className="p-5">{row.currentpln}</td>
                  <td className="p-5">{row.currentups}</td>
                  <td className="p-5">{row.frequency}</td>
                  <td className="p-5">{row.factorpln}</td>
                  <td className="p-5">{row.factorups}</td>
                  <td className="p-5">{row.voltagepln}</td>
                  <td className="p-5">{row.voltageups}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm">
          <div>
            Rows per page:
            <select className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1">
              <option value="09">09</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center ml-5">
            <span className="mr-4">1-09 of 100</span>
            <div className="inline-flex">
              <button className="px-2 py-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="px-2 py-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
