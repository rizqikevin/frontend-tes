import React, { useEffect } from "react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { AchievementRing } from "./AchievementRing";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

interface AchievementRingContainerProps {
  title: string;
  color: string;
  freq: "monthly" | "yearly" | "daily";
}

export const AchievementRingContainer: React.FC<
  AchievementRingContainerProps
> = ({ title, color, freq }) => {
  const { fetchAchievement, [freq]: achievementData } = useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchAchievement(freq);
  }, [start_date, end_date, freq]);

  const mappedTarget = achievementData.otherTargets.map((target) => ({
    label: target.target_name,
    value: target.percent_lhr,
  }));

  const colors = ["#FF9800", "#2196F3", "#4CAF50", "#FF69B4", "#8BC34A"];

  return (
    <AchievementRing
      color={color}
      title={title}
      percent={Number(achievementData.rkapPercent)}
      revenue={`${Number(achievementData.revenueAchievement).toLocaleString(
        "id-ID"
      )}`}
      target={`Rp ${Number(achievementData.rkapTarget).toLocaleString(
        "id-ID"
      )}`}
      bars={mappedTarget.map((target, index) => ({
        label: target.label,
        value: target.value,
        color: colors[index % colors.length],
      }))}
    />
  );
};
