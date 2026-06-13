export function JobItemPlaceholder({ className }: { className: string }) {

  const containerClass = "animate-pulse flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm";

  return (
    <div className={className ? `${containerClass} ${className}` : containerClass}>
      <div className="space-y-2">
        {/* Company Name placeholder */}
        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-700 rounded"></div>
        {/* Role placeholder */}
        <div className="h-3 w-36 bg-gray-200 dark:bg-zinc-700 rounded"></div>
      </div>
      {/* Status badge placeholder */}
      <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-700 rounded-full"></div>
    </div>
  )
}