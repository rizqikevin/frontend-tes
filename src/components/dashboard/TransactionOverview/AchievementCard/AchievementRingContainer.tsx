import React, { useEffect } from "react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { AchievementRing } from "./AchievementRing";
import { useDateFilterStore } from "@/stores/useDateFilterStore";

export const AchievementRingContainer: React.FC = () => {
  const { fetchAchievement, revenueAchievement, rkapPercent, rkapTarget } =
    useTransactionStore();
  const { start_date, end_date } = useDateFilterStore();

  useEffect(() => {
    fetchAchievement();
  }, [start_date, end_date]);

  return (
    <AchievementRing
      percent={rkapPercent}
      revenue={`Rp ${Number(revenueAchievement).toLocaleString("id-ID")}`}
      target={`Rp ${Number(rkapTarget).toLocaleString("id-ID")}`}
    />
  );
};
