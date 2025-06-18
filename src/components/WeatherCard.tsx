import { Cloud } from "lucide-react";

interface WeatherData {
  id: number;
  tanggal: string;
  jam: string;
  lokasi: string;
  windDirection: number;
  windSpeed: string;
  temperature: string;
  humidity: string;
  pressure: string;
  rainfall: string;
}

const weatherData = [
  {
    id: 1,
    tanggal: "28/02/2025",
    jam: "15:30:32 PM",
    lokasi: "Kuala Tanjung",
    windDirection: 318,
    windSpeed: "2.22 m/sec",
    temperature: "30",
    humidity: "66%",
    pressure: "1009 hPa",
    rainfall: "0 mm",
  },
];

const WeatherCard: React.FC = () => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex justify-between items-center px-0">
        <div className="bg-[#082d72] rounded-lg p-4 mb-0 w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{weatherData[0].lokasi}</h2>
            <p className="text-sm text-gray-400">
              {weatherData[0].tanggal} <span>{weatherData[0].jam}</span>
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Cloud className="text-yellow-400 text-4xl" />
            <div>
              <p className="text-3xl font-bold">{weatherData[0].temperature}</p>
              <p className="text-sm text-gray-400">Sunny Cloudy</p>
            </div>
          </div>
          <div className="mt-4 text-sm grid grid-cols-2 gap-y-2 gap-x-4 text-gray-300">
            <p>
              Wind Direction: <span className="text-white">303</span>
            </p>
            <p>
              Wind Speed: <span className="text-white">30 Rpm</span>
            </p>
            <p>
              Temperature: <span className="text-white">32°</span>
            </p>
            <p>
              Humidity: <span className="text-white">64%</span>
            </p>
            <p>
              Atmospheric Pressure: <span className="text-white">1008 hPa</span>
            </p>
            <p>
              Rainfall/Hour: <span className="text-white">0 mm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
