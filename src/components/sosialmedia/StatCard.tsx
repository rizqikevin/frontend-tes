interface StatItem {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface StatCardProps {
  title: string;
  stats: StatItem[];
}

export default function StatCard({ title, stats }: StatCardProps) {
  return (
    <div className=" bg-dashboard-accent p-4 rounded-md text-white w-full max-w-xs">
      <h3 className="text-sm font-bold mb-4">{title}</h3>
      {stats.map((item, i) => (
        <div key={i} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full border-4`}
              style={{ borderColor: item.color }}
            >
              <div className="text-xs text-center mt-1">{item.percentage}%</div>
            </div>
            <div className="text-sm">{item.label}</div>
          </div>
          <div className="text-sm text-gray-400">
            Hasil Ditemukan {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
