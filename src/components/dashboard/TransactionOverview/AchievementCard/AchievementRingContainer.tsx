import React, { useEffect } from "react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { AchievementRing } from "./AchievementRing";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

interface AchievementRingContainerProps {
  title: string;
  frequensi: string;
  color: string;
}

export const AchievementRingContainer: React.FC<
  AchievementRingContainerProps
> = ({ frequensi, title, color }) => {
  const {
    fetchAchievement,
    revenueAchievement,
    rkapPercent,
    rkapTarget,
    otherTargets,
  } = useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchAchievement(frequensi);
  }, [start_date, end_date, frequensi]);

  // console.log(frequensi);

  // console.log(rkapPercent);
  // console.log(revenueAchievement);
  // console.log(rkapTarget);
  // console.log(otherTargets);

  const mappedTarget = otherTargets.map((target) => {
    return {
      label: target.target_name,
      value: target.percent,
    };
  });

  console.log(mappedTarget);

  const colors = ["#FF9800", "#2196F3", "#4CAF50", "#FF69B4", "#8BC34A"];

  return (
    <AchievementRing
      color={color}
      title={title}
      percent={Number(rkapPercent)}
      revenue={`Rp ${Number(revenueAchievement).toLocaleString("id-ID")}`}
      target={`Rp ${Number(rkapTarget).toLocaleString("id-ID")}`}
      bars={[
        ...mappedTarget.map((target, index) => ({
          label: target.label,
          value: target.value,
          color: colors[index % colors.length],
        })),
      ]}
    />
  );
};
