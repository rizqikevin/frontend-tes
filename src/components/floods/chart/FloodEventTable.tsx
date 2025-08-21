import React from "react";
import { Button } from "@/components/ui/button";

const FloodEventTable: React.FC = () => {
  const events = [
    {
      id: "01",
      sensor: "Flood_Sensor_1",
      mulai: "03 Jul 13:57:27",
      selesai: "03 Jul 14:01:40",
      durasi: "4m",
      puncak: "3,61",
      zona: "Siaga 1",
      rate: "65,3",
      rapid: "Ya",
    },
    {
      id: "02",
      sensor: "Flood_Sensor_2",
      mulai: "03 Jul 13:57:27",
      selesai: "03 Jul 14:01:40",
      durasi: "4m",
      puncak: "3,61",
      zona: "Siaga 1",
      rate: "65,3",
      rapid: "Ya",
    },
  ];

  return (
    <div className="w-full bg-dashboard-accent text-white rounded-md p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-md font-semibold">Event Banjir (=Siaga 3)</h2>
          <p className="text-xs text-gray-300">
            {events.length} event terdekat
          </p>
        </div>
        <Button className="bg-white text-black px-3 py-1 rounded text-sm">
          Add Event
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-gray-600 text-gray-300">
            <tr>
              <th className="py-2 px-3 text-left">#</th>
              <th className="py-2 px-3 text-left">Sensor</th>
              <th className="py-2 px-3 text-left">Mulai</th>
              <th className="py-2 px-3 text-left">Selesai</th>
              <th className="py-2 px-3 text-left">Durasi</th>
              <th className="py-2 px-3 text-left">Puncak (m)</th>
              <th className="py-2 px-3 text-left">Zona</th>
              <th className="py-2 px-3 text-left">Rate avg (cm/mnt)</th>
              <th className="py-2 px-3 text-left">Rapid?</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-gray-700">
                <td className="py-2 px-3">{e.id}</td>
                <td className="py-2 px-3">{e.sensor}</td>
                <td className="py-2 px-3">{e.mulai}</td>
                <td className="py-2 px-3">{e.selesai}</td>
                <td className="py-2 px-3">{e.durasi}</td>
                <td className="py-2 px-3">{e.puncak}</td>
                <td className="py-2 px-3">{e.zona}</td>
                <td className="py-2 px-3">{e.rate}</td>
                <td className="py-2 px-3">{e.rapid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FloodEventTable;
