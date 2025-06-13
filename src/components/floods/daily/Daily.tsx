// Mock data for the table
const mockTransactionData = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  time: "14:09:35 PM",
  sensorname: "-",
  sensornumber: "-",
  sensorvalue: "-",
}));

export const Daily: React.FC = () => {
  return (
    <>
      <div className="bg-dashboard-accent rounded-lg p-4 overflow-x-auto mt-4">
        <div className="flex justify-between items-center px-0">
          <div>
            <h1 className="text-xl font-medium">Logs Daily Floods</h1>
            <p className="text-gray-400">Riwayat Pemakaian</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-dashboard-accent text-white">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">time</th>
                <th className="p-5">sensorname</th>
                <th className="p-5">sensornumber</th>
                <th className="p-5">sensorvalue</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactionData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-700">
                  <td className="p-5">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-5">{row.time}</td>
                  <td className="p-5">{row.sensorname}</td>
                  <td className="p-5">{row.sensornumber}</td>
                  <td className="p-5">{row.sensorvalue}</td>
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
