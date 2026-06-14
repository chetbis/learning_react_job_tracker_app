import { getStats } from "../lib/jobs";
import { StatCard, STATUS_CONFIG } from "./StatCard";

type StatsResult = Awaited<ReturnType<typeof getStats>>;
export type StatsCountProps = {
  stats: Extract<StatsResult, { success: true }>["data"];
  activeStatus?: string;
  onStatusSelect?: (status: string) => void;
};

export default function StatsCount({ stats, activeStatus = "Total", onStatusSelect }: StatsCountProps) {
  const totalCount = stats.reduce((acc, curr) => acc + curr.count, 0);

  const allStats = [{ name: "Total", count: totalCount }, ...stats];

  return (
    <div className="space-y-4 mb-6 animate-fade-in">
      {/* Grid of status cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {allStats.map((item) => (
          <StatCard 
            key={item.name} 
            name={item.name} 
            count={item.count} 
            active={activeStatus === item.name}
            onClick={onStatusSelect ? () => onStatusSelect(item.name) : undefined}
          />
        ))}
      </div>

      {/* Pipeline Distribution Visualizer */}
      {totalCount > 0 && (
        <div className="p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Application Funnel
            </span>
            <span className="text-[11px] font-medium text-gray-400 dark:text-zinc-500">
              {totalCount} total applications
            </span>
          </div>

          {/* Segmented bar */}
          <div className="h-2.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
            {stats.map((status) => {
              const percentage = totalCount > 0 ? (status.count / totalCount) * 100 : 0;
              if (percentage === 0) return null;
              const config = STATUS_CONFIG[status.name] || STATUS_CONFIG.Declined;
              return (
                <div
                  key={status.name}
                  style={{ width: `${percentage}%` }}
                  className={`${config.progressBarClass} h-full transition-all duration-500 hover:opacity-90`}
                  title={`${status.name}: ${status.count} (${percentage.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/80">
            {stats.map((status) => {
              const percentage = totalCount > 0 ? (status.count / totalCount) * 100 : 0;
              if (percentage === 0) return null;
              const config = STATUS_CONFIG[status.name] || STATUS_CONFIG.Declined;
              return (
                <div key={status.name} className="flex items-center gap-2 text-[11px]">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${config.progressBarClass} shadow-2xs`}
                  />
                  <span className="text-gray-600 dark:text-zinc-300 font-medium">
                    {status.name}
                  </span>
                  <span className="text-gray-400 dark:text-zinc-500">
                    {status.count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
