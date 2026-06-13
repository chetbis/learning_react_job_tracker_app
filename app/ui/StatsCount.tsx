import { getStats } from "../lib/jobs";
import { StatusBadge } from "./StatusBadge";

type StatsResult = Awaited<ReturnType<typeof getStats>>;
export type StatsCountProps = {
  stats: Extract<StatsResult, { success: true }>["data"];
};

export default function StatsCount({ stats }: StatsCountProps) {
  return ((
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg">
        {stats.map((status) => (
          <div key={status.name} className="flex items-center gap-2">
            <StatusBadge status={status.name} />
            <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
              {status.count}
            </span>
          </div>
        ))}
      </div>
    )
  );
}
