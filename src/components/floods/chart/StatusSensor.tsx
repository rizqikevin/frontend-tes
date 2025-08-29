import React from "react";

interface StatusSensorProps {
  sensors: string[];
}

const StatusSensor: React.FC<StatusSensorProps> = ({ sensors }) => {
  const dummySensor = ["Flood_Sensor_2", "Flood_Sensor_3"];

  const spreadsensor = [...sensors, ...dummySensor];

  return (
    <div className="w-full text-white rounded-md p-0 flex flex-col gap-4">
      {/* Row atas - Threshold Inputs */}
      <div className="bg-dashboard-accent p-4 rounded-md">
        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="block text-sm mb-1">Siaga 3 (m)</label>
            <input
              type="text"
              value="1"
              className="w-full bg-[#3b3b3b] rounded-md px-3 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Siaga 2 (m)</label>
            <input
              type="text"
              value="2,04"
              className="w-full bg-[#3b3b3b] rounded-md px-3 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Siaga 1 (m)</label>
            <input
              type="text"
              value="3"
              className="w-full bg-[#3b3b3b] rounded-md px-3 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Bahaya (m)</label>
            <select className="w-full bg-[#3b3b3b] rounded-md px-3 py-2">
              <option>4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Rate alert (cm/menit)</label>
            <input
              type="text"
              value="3"
              className="w-full bg-[#3b3b3b] rounded-md px-3 py-2"
              readOnly
            />
          </div>
        </div>

        {/* Row kedua - Sensor selector + detail box */}
        <div className="flex items-center mt-4 mb-4 gap-2">
          <span className="text-sm">Sensor :</span>
          {spreadsensor.map((s) => (
            <span
              key={s}
              className="bg-orange-600 px-3 py-1 rounded-full text-xs cursor-pointer"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Sensor 1 */}
          <div className="bg-[#3b3b3b] rounded-md p-4 text-sm space-y-7">
            <h3 className="font-semibold">Flood_Sensor_1</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <span>Date</span>
              <span>: 23 sampel</span>
              <span>Zero (Kering)</span>
              <span>: 0%</span>
              <span>Max Gap</span>
              <span>: 3 menit</span>
              <span>Flat-linr</span>
              <span>: Tidak</span>
            </div>
          </div>

          {/* Sensor 2 */}
          <div className="bg-[#3b3b3b] rounded-md p-4 text-sm space-y-2">
            <h3 className="font-semibold">Flood_Sensor_2</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <span>Date</span>
              <span>: 23 sampel</span>
              <span>Zero (Kering)</span>
              <span>: 0%</span>
              <span>Max Gap</span>
              <span>: 3 menit</span>
              <span>Flat-linr</span>
              <span>: Tidak</span>
            </div>
          </div>
        </div>
      </div>
      {/* Row ketiga - Summary boxes */}
      <div className="grid grid-cols-4 gap-4 text-sm">
        {/* Level Terkini */}
        <div className="bg-dashboard-accent rounded-md p-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold mb-2">Level Terkini</p>
            <p>Flood_Sensor_2 : 0 m</p>
            <p>Flood_Sensor_1 : 2,766 m</p>
            <p className="text-gray-400 text-xs">0.000 = kering</p>
          </div>
        </div>

        {/* Puncak */}
        <div className="bg-dashboard-accent rounded-md p-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold mb-2">Puncak (m)</p>
            <p className="text-xl font-bold">3,61 m</p>
            <p className="text-xs text-gray-400">Zona tertinggi: Siaga 1</p>
          </div>
        </div>

        {/* Rate of rise */}
        <div className="bg-[#3b3b3b] rounded-md p-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold mb-2">Rate of rise</p>
            <p>Flood_Sensor_2 : 0 cm/mnt</p>
            <p>Flood_Sensor_1 : 319,9 cm/mnt</p>
            <p className="text-xs text-gray-400">Alert jika = 3 cm/menit</p>
          </div>
        </div>

        {/* Sensor */}
        <div className="bg-[#3b3b3b] rounded-md p-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold mb-2">Sensor</p>
            <p>2</p>
            <p className="text-xs text-gray-400">Terpilih</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSensor;
