import React, { useEffect } from "react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { AchievementRing } from "./AchievementRing";

export const AchievementRingContainer: React.FC = () => {
  const {
    start_date,
    end_date,
    fetchAchievement,
    revenueAchievement,
    rkapPercent,
    rkapTarget,
  } = useTransactionStore();

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
