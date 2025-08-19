// src/components/AqiHeader.tsx
import React from "react";
import { getAqiColor } from "./AqiTable";
import { LucideAArrowDown } from "lucide-react";

interface AqiHeaderProps {
  data: any[];
}

const AqiHeader: React.FC<AqiHeaderProps> = ({ data }) => {
  const aqi = data[0];
  // console.log(aqi);

  const getAqiCategory = (aqi: number): string => {
    if (aqi == undefined) return "--";
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy";
    if (aqi <= 200) return "Unhealthy for Sensitive Groups";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="bg-dashboard-accent p-4 rounded-xl flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <div
          className={`${getAqiColor(
            aqi?.ispu || undefined
          )} text-white px-4 py-2 rounded-lg text-center`}
        >
          <p className="text-2xl font-bold">{aqi?.ispu}</p>
          <p className="text-sm">AQI US</p>
        </div>
        <div>
          <p className="text-sm">Live Air Quality (AQI)</p>
          <p className="font-semibold text-lg">
            {getAqiCategory(aqi?.ispu || undefined)}
          </p>
        </div>
      </div>

      <div className="flex items-center text-left gap-24 text-sm">
        <div>
          <p className="text-gray-400">Sensor Name</p>
          <p>{aqi?.sensor_name || "--"}</p>
        </div>
        <div>
          <p className="text-gray-400">CO</p>
          <p>{aqi?.co.slice(0, 4) || "--"} ug/m3</p>
        </div>
        <div>
          <p className="text-gray-400">O³</p>
          <p>{aqi?.o3.slice(0, 4) || "--"} ug/m3</p>
        </div>
        <div>
          <p className="text-gray-400">SO³</p>
          <p>{aqi?.so2.slice(0, 4) || "--"} ug/m3</p>
        </div>
        <div>
          <p className="text-gray-400">CO³</p>
          <p>{aqi?.no2.slice(0, 4) || "--"} ppm</p>
        </div>
        <div>
          <p className="text-gray-400">NO³</p>
          <p>{aqi?.no2.slice(0, 4) || "--"} ug/m3</p>
        </div>

        <div>
          <p className="text-gray-400">PM10</p>
          <p>{aqi?.pm10.slice(0, 5) || "--"} ug/m3</p>
        </div>
        <div>
          <p className="text-gray-400">PM2.5</p>
          <p>{aqi?.pm25.slice(0, 5) || "--"} ug/m3</p>
        </div>
      </div>

      <div>
        <div
          className={`${getAqiColor(
            aqi?.ispu || undefined
          )} px-4 py-2 rounded-lg text-center`}
        >
          <img src="/icons/paru.svg" alt="Air Quality" className="w-15" />
        </div>
      </div>
    </div>
  );
};

export default AqiHeader;
