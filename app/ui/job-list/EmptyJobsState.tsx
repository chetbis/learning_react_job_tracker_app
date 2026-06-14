export type EmptyJobsStateProps = {
  searchQuery: string;
  statusFilter: string;
  onClearFilters: () => void;
};

export function EmptyJobsState({
  searchQuery,
  statusFilter,
  onClearFilters,
}: EmptyJobsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-xl shadow-2xs mt-4 animate-fade-in">
      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-full mb-4">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        No applications found
      </h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mb-4">
        We couldn&apos;t find any job applications matching &quot;{searchQuery || statusFilter}&quot;
        {statusFilter !== "Total" && searchQuery && ` with status "${statusFilter}"`}.
      </p>
      <button
        onClick={onClearFilters}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 text-sm font-medium rounded-lg transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );
}
