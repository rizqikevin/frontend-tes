import { useEffect, useState } from "react";
import { Cloud } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

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
  uv: string;
  icon: string;
}

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(false);
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const location = "Kuala Tanjung";
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
        );
        const data = response.data;

        setWeather({
          icon: data.current.condition.icon,
          location: data.location.name,
          localTime: data.location.localtime,
          temperature: data.current.temp_c + "°C",
          condition: data.current.condition.text,
          windDirection: data.current.wind_dir,
          windSpeed: `${data.current.wind_kph} km/h`,
          humidity: `${data.current.humidity}%`,
          pressure: `${data.current.pressure_mb} hPa`,
          rainfall: `${data.current.precip_mm} mm`,
          uv: `${data.current.uv}`,
        });
      } catch (err) {
        toast.error("Gagal memuat data cuaca.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading || error || !weather) {
    return (
      <div className="w-full p-4 text-center text-sm text-gray-400 bg-[#082d72] rounded-lg">
        {error ? (
          <>
            <Cloud className="mx-auto h-8 w-8 text-red-500 mb-2" />
            <p className="text-red-400 font-semibold">Cuaca tidak tersedia</p>
            <p className="text-xs">Coba lagi nanti.</p>
          </>
        ) : (
          <>Memuat data cuaca...</>
        )}
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg p-1 text-sm text-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">{weather.location}</h2>
        <p className="text-xs text-gray-400">{weather.localTime}</p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <img src={weather.icon} alt="Weather Icon" className="h-11 w-11" />
        <div>
          <p className="text-2xl font-bold">{weather.temperature}</p>
          <p className="text-xs text-gray-400">{weather.condition}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 text-center gap-2 text-xs text-gray-300">
        <p>
          Wind Dir: <span className="text-white">{weather.windDirection}</span>
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
        <p>
          UV: <span className="text-white">{weather.uv}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
