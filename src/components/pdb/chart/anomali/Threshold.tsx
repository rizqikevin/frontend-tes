import React, { useState } from "react";

const ThresholdAlert: React.FC = () => {
  const [freqMin, setFreqMin] = useState(49.53);
  const [freqMax, setFreqMax] = useState(50.5);
  const [pfMin, setPfMin] = useState(0.85);
  const [vImb, setVImb] = useState(5);
  const [iImb, setIImb] = useState(25);

  return (
    <div className="bg-dashboard-accent rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Threshold Alert</h2>
      <p className="text-sm text-gray-300 mb-4">
        Frekuensi (Hz) {freqMin.toFixed(2)} - {freqMax.toFixed(2)}
      </p>
      <div className="flex flex-row gap-12">
        {/* Frequency Range */}
        <div className="flex items-start gap-2 mb-6 w-full">
          <input
            type="number"
            step="0.01"
            value={freqMin}
            onChange={(e) => setFreqMin(Number(e.target.value))}
            className="bg-[#2b2a2a] rounded px-2 py-1 w-24 text-center"
          />
          <span className="text-xl">{">"}</span>
          <input
            type="number"
            step="0.01"
            value={freqMax}
            onChange={(e) => setFreqMax(Number(e.target.value))}
            className="bg-[#2b2a2a] rounded px-2 py-1 w-24 text-center"
          />
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-3 gap-6 mb-4 w-full">
          <div>
            <label className="block text-sm mb-2">
              PF Minimum: {pfMin.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={pfMin}
              onChange={(e) => setPfMin(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              Voltage Imbalance max: {vImb}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={vImb}
              onChange={(e) => setVImb(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              Current Imbalance max: {iImb}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={iImb}
              onChange={(e) => setIImb(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400">
        Gunakan bahasa sesuai kontak layanan & SOP Internal (mis: PF &gt;0.85,
        Freq 49.5-50.5 Hz, V-Imb &lt; 2% I-imb &lt; 10%).
      </p>
    </div>
  );
};

export default ThresholdAlert;
