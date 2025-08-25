import api from "@/services/api";
import { MoveUpRightIcon } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  satuan: string;
}

interface StatsCard {
  energy: string;
  avg_frequency: string;
  avg_energy_perhour: string;
  beban_puncak: string;
}

const StatsCard = ({ title, value, satuan }: StatsCardProps) => {
  const [stats, setStats] = useState<StatsCard>({
    energy: "",
    avg_frequency: "",
    avg_energy_perhour: "",
    beban_puncak: "",
  });

  return (
    <div className=" bg-dashboard-accent p-4 rounded-md text-white w-full max-w-[307px]">
      <h3 className="text-sm font-bold mb-4">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">
            {value}
            <span className="text-sm">{satuan}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
