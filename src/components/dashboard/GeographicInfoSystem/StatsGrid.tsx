import { MoveUpRightIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  date: string;
}

interface StatsGridProps {
  statsData: Stat[];
  isLoading: boolean;
}

const StatsGrid = ({ statsData, isLoading }: StatsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="p-2 rounded-lg border bg-dashboard-accent min-h-[88px] flex items-center justify-center"
          >
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsData.map((stat, index) => (
        <div key={index} className="p-2 rounded-lg border bg-dashboard-accent">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium">{stat.label}</span>
            <MoveUpRightIcon className="h-7 w-7 text-black bg-white rounded-sm" />
          </div>
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-xs">{stat.date}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
