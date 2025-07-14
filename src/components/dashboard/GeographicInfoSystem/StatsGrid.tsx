import { ChartBarIcon, MoveUpRightIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  date: string;
}

const StatsGrid = ({ statsData }: { statsData: Stat[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsData.map((stat, index) => (
        <div key={index} className="p-2 rounded-lg border bg-dashboard-accent">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium">{stat.label}</span>
            <MoveUpRightIcon className="h-7 w-7 text-black bg-white rounded-sm" />
          </div>
          <p className="text-lg font-semibold">{stat.value}</p>
          <p className="text-xs">{stat.date}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
