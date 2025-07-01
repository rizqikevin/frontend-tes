import { useEffect, useState } from "react";
import { Cloud } from "lucide-react";
import axios from "axios";

interface WeatherData {
  location: string;
  localTime: string;
  temperature: string;
  condition: string;
  windDirection: string;
  windSpeed: string;
  humidity: string;
  pressure: string;
  rainfall: string;
}

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const location = "Kuala Tanjung";
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?q=${location}&lang=id&key=${apiKey}`
        );

        const data = response.data;
        // console.log(data);

        setWeather({
          location: data.location.name,
          localTime: data.location.localtime,
          temperature: data.current.temp_c + "°C",
          condition: data.current.condition.text,
          windDirection: data.current.wind_dir,
          windSpeed: `${data.current.wind_kph} km/h`,
          humidity: `${data.current.humidity}%`,
          pressure: `${data.current.pressure_mb} hPa`,
          rainfall: `${data.current.precip_mm} mm`,
        });
      } catch (error) {
        console.error("Gagal fetch data cuaca:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="flex justify-between mb-4">
      <div className="flex justify-between items-center px-0">
        <div className="rounded-lg p-4 w-full h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{weather.location}</h2>
            <p className="text-sm text-gray-400">{weather.localTime}</p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Cloud className="text-yellow-400 text-4xl" />
            <div>
              <p className="text-3xl font-bold">{weather.temperature}</p>
              <p className="text-sm text-gray-400">{weather.condition}</p>
            </div>
          </div>
          <div className="mt-4 text-sm grid grid-cols-2 gap-y-2 gap-x-4 text-gray-300">
            <p>
              Wind Dir:{" "}
              <span className="text-white">{weather.windDirection}</span>
            </p>
            <p>
              Wind Spd: <span className="text-white">{weather.windSpeed}</span>
            </p>
            <p>
              Humidity: <span className="text-white">{weather.humidity}</span>
            </p>
            <p>
              Pressure: <span className="text-white">{weather.pressure}</span>
            </p>
            <p>
              Rainfall: <span className="text-white">{weather.rainfall}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
