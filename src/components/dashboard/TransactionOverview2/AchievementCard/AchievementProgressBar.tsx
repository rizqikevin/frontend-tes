import React, { useEffect, useState } from "react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { Nested } from "@alptugidin/react-circular-progress-bar";
import { Dayjs } from "dayjs";

interface AchievementProgressBarProps {
  title?: string;
  color: string;
  freq: "monthly" | "yearly" | "daily";
}

export const AchievementProgressBar: React.FC<AchievementProgressBarProps> = ({
  title,
  color,
  freq,
}) => {
  const { fetchAchievement, [freq]: achievementData } = useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchAchievement(freq);
  }, [start_date, end_date, freq]);

  // console.log("Achievement Data:", achievementData);

  const percent = Number(achievementData.rkapPercent);
  const LHRPercent = Number(achievementData.percent);
  const displayPercent = percent.toFixed(2);
  const percentLHR = LHRPercent.toFixed(2);

  const totalRevenue = Number(achievementData.rkapTarget) || 0;
  const totalLHR = Number(achievementData.lhr_achievement) || 0;

  const colorRevenue = "#FF9800";
  const colorLHR = "#4CAF50";

  const bars = achievementData.otherTargets.map((target) => ({
    section: target.target_name,
    items: [
      { label: "Revenue", value: target.percent, color: colorRevenue },
      { label: "LHR", value: target.percent_lhr, color: colorLHR },
    ],
  }));

  const businessPlan = achievementData.otherTargets.find(
    (t) => t.target_name === "BUSSINES PLAN"
  );
  const prognosa = achievementData.otherTargets.find(
    (t) => t.target_name === "PROGNOSA"
  );
  const BUSINESS_PLAN_REVENUE = businessPlan?.percent ?? 0;
  const BUSINESS_PLAN_LHR = businessPlan?.percent_lhr ?? 0;
  const PROGNOSA_REVENUE = prognosa?.percent ?? 0;
  const PROGNOSA_LHR = prognosa?.percent_lhr ?? 0;

  return (
    <div className="text-white p-6 rounded-lg w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="flex justify-start gap-10 items-start">
        <div className="text-left mb-4 border-r-2 border-gray-600 pr-7">
          <p className="text-xs text-gray-300">Total Pendapatan</p>
          <p className="text-xl font-bold">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="text-left mb-4">
          <p className="text-xs text-gray-300">Total LHR</p>
          <p className="text-xl font-bold">
            {totalLHR.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <hr className="w-full border-t border-gray-600 mb-4" />

      <div className="text-left w-full mb-3">
        <span className="text-sm font-semibold uppercase text-white">
          Presentase Pencapaian
        </span>
      </div>

      <div className="flex justify-between items-start">
        {/* Kiri */}
        <div className="flex flex-col items-center w-1/3">
          <div
            className="w-full max-w-[220px] relative my-2 aspect-square self-center text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Nested
              circles={[
                { text: "Revenue", value: percent, color: "#FF9800" },
                { text: "LHR", value: LHRPercent, color: "#4CAF50" },
              ]}
              sx={{
                bgColor: "#E5E7EB",
                gap: 20,
                textSize: 22,
                textColor: "#ffffff",
                roundedStroke: true,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-3xl text-white">
              <span className="font-bold">
                {isHovered ? percentLHR ?? 0 : displayPercent ?? 0}%
              </span>
              <p className="text-2xl text-white">
                {isHovered ? "LHR / RKAP" : "RKAP"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs mt-2">
            <div className="w-3 h-3 rounded-full bg-[#FF9800]" />
            Revenue
            <div className="w-3 h-3 rounded-full bg-[#4CAF50] ml-4" />
            LHR
          </div>
        </div>

        {/* Kanan */}
        <div className="w-2/3 pl-8">
          {bars.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="text-sm font-semibold mb-2">{section.section}</h4>
              {section.items.map((bar, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${bar.value}%`,
                        backgroundColor: bar.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
