import { useEffect, useState } from "react";
import { Cloud } from "lucide-react"; // Assuming Cloud is used elsewhere or for a generic icon
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
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
        console.error("Failed to fetch weather data:", err); // Log the actual error
        toast.error("Gagal memuat data cuaca. Silakan coba lagi nanti."); // User-friendly error message
        setError(true); // Set error to true
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-between mb-4">
        <div className="flex justify-between items-center px-0">
          <div className="rounded-lg p-4 w-full h-full text-center text-gray-400">
            Memuat data cuaca...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between mb-4">
        <div className="flex justify-between items-center px-0">
          <div className="rounded-lg p-4 w-full h-full text-center text-red-400">
            <Cloud className="mx-auto h-12 w-12 text-red-500 mb-2" />
            <p className="font-semibold">Data cuaca tidak tersedia.</p>
            <p className="text-sm">
              Kami tidak dapat mengambil data cuaca saat ini.
            </p>
            <p className="text-sm">
              Silakan periksa koneksi internet Anda atau coba lagi nanti.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex justify-between mb-4">
        <div className="flex justify-between items-center px-0">
          <div className="rounded-lg p-4 w-full h-full text-center text-gray-400">
            Tidak ada data cuaca yang tersedia.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-4 ">
      <div className="flex justify-between items-center px-0">
        <div className="rounded-lg p-4 w-full h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {weather.location || "tidak ada data"}
            </h2>
            <p className="text-sm text-gray-400">{weather.localTime || "-"}</p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <img src={weather.icon} alt="Icon Weather" />
            <div>
              <p className="text-3xl font-bold">{weather.temperature || "-"}</p>
              <p className="text-sm text-gray-400">
                {weather.condition || "-"}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm grid grid-cols-2 gap-y-2 gap-x-4 text-gray-300">
            <p>
              Wind Dir:{" "}
              <span className="text-white">{weather.windDirection || "-"}</span>
            </p>
            <p>
              Wind Spd:{" "}
              <span className="text-white">{weather.windSpeed || "-"}</span>
            </p>
            <p>
              Humidity:{" "}
              <span className="text-white">{weather.humidity || "-"}</span>
            </p>
            <p>
              Pressure:{" "}
              <span className="text-white">{weather.pressure || "-"}</span>
            </p>
            <p>
              Rainfall:{" "}
              <span className="text-white">{weather.rainfall || "-"}</span>
            </p>
            <p>
              UV: <span className="text-white">{weather.uv || "-"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
