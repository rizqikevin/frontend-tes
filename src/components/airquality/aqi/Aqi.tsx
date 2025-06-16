const AQIData = [
  {
    date: "21/02/2023",
    day: "Monday",
    level: "Unhealthy for Sensitive Groups",
    aqi: "120 AQI US",
    humidity: "65%",
    wind: "10/km",
    temp: "25 c",
    color: "bg-orange-500",
  },
  {
    date: "21/02/2023",
    day: "Sunday",
    level: "Unhealthy for Sensitive Groups",
    aqi: "120 AQI US",
    humidity: "65%",
    wind: "10/km",
    temp: "25 c",
    color: "bg-purple-500",
  },
  {
    date: "21/02/2023",
    day: "Saturday",
    level: "Unhealthy for Sensitive Groups",
    aqi: "120 AQI US",
    humidity: "65%",
    wind: "10/km",
    temp: "25 c",
    color: "bg-purple-600",
  },
  {
    date: "21/02/2023",
    day: "Friday",
    level: "Unhealthy for Sensitive Groups",
    aqi: "120 AQI US",
    humidity: "65%",
    wind: "10/km",
    temp: "25 c",
    color: "bg-red-500",
  },
];

export const Aqi: React.FC = () => {
  return (
    <div className="min-h-screen text-white p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="bg-dashboard-accent p-4 rounded-xl flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center">
            <p className="text-2xl font-bold">86</p>
            <p className="text-sm">AQI US</p>
          </div>
          <div>
            <p className="text-sm">Live Air Quality (AQI)</p>
            <p className="font-semibold text-lg">
              Unhealthy for Sensitive Groups
            </p>
          </div>
        </div>

        <div
          className="flex items-center text-left gap-32
         text-sm"
        >
          <div>
            <p className="text-gray-400">Location</p>
            <p>Kuala Tanjung</p>
          </div>
          <div>
            <p className="text-gray-400">Air Quality Index</p>
            <p>XXXX</p>
          </div>
          <div>
            <p className="text-gray-400">Weather</p>
            <p>XXXX</p>
          </div>
          <div>
            <p className="text-gray-400">PM10</p>
            <p>84 hg/m³</p>
          </div>
          <div>
            <p className="text-gray-400">PM2.5</p>
            <p>56 hg/m³</p>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-3 rounded-full">
            <span className="text-2xl">❤️</span>
          </div>
        </div>
      </div>

      {/* AQI Table */}
      <div className="bg-dashboard-accent rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Air Quality Indexes (AQI)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="p-2">Date</th>
                <th className="p-2">Day</th>
                <th className="p-2">Pollution level</th>
                <th className="p-2">Humidity</th>
                <th className="p-2">Wind</th>
                <th className="p-2">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {AQIData.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.day}</td>
                  <td className="p-2">
                    <div
                      className={`flex items-center justify-between px-3 py-1 rounded-md ${item.color}`}
                    >
                      <span>{item.level}</span>
                      <span className="ml-2 text-sm">{item.aqi}</span>
                      <span className="ml-2">❤️</span>
                    </div>
                  </td>
                  <td className="p-2">{item.humidity}</td>
                  <td className="p-2">{item.wind}</td>
                  <td className="p-2">{item.temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
