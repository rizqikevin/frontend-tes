// src/components/WeatherCard.tsx
import React from "react";
import { Cloud } from "lucide-react";

interface WeatherCardProps {
  lokasi: string;
  tanggal: string;
  jam: string;
  temperature: string;
  windDirection: string;
  windSpeed: string;
  humidity: string;
  pressure: string;
  rainfall: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  lokasi,
  tanggal,
  jam,
  temperature,
  windDirection,
  windSpeed,
  humidity,
  pressure,
  rainfall,
}) => {
  return (
    <div className="bg-[#082d72] rounded-lg p-4 h-full">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold">{lokasi}</h2>
        <p className="text-sm text-gray-300">
          {tanggal} <span>{jam}</span>
        </p>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <Cloud className="text-yellow-400 text-4xl" />
        <div>
          <p className="text-3xl font-bold">{temperature}</p>
          <p className="text-sm text-gray-300">Sunny Cloudy</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-300">
        <p>
          Wind Direction: <span className="text-white">{windDirection}</span>
        </p>
        <p>
          Wind Speed: <span className="text-white">{windSpeed}</span>
        </p>
        <p>
          Temperature: <span className="text-white">{temperature}</span>
        </p>
        <p>
          Humidity: <span className="text-white">{humidity}</span>
        </p>
        <p>
          Atmospheric Pressure: <span className="text-white">{pressure}</span>
        </p>
        <p>
          Rainfall/Hour: <span className="text-white">{rainfall}</span>
        </p>
      </div>
    </div>
  );
};
