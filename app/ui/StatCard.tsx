import React from "react";

export const STATUS_CONFIG: Record<
  string,
  {
    colorClass: string;
    bgClass: string;
    darkBgClass: string;
    borderClass: string;
    progressBarClass: string;
    icon: React.ReactNode;
  }
> = {
  Total: {
    colorClass: "text-zinc-650 dark:text-zinc-350",
    bgClass: "bg-zinc-50/50 border-zinc-200 hover:border-zinc-300",
    darkBgClass: "dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:border-zinc-700",
    borderClass: "border-l-4 border-l-zinc-400 dark:border-l-zinc-500",
    progressBarClass: "bg-zinc-400 dark:bg-zinc-500",
    icon: (
      <svg
        className="w-4 h-4 text-zinc-550 dark:text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  New: {
    colorClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-50/30 border-sky-100 hover:border-sky-200",
    darkBgClass: "dark:bg-sky-950/10 dark:border-sky-900/30 dark:hover:border-sky-800/50",
    borderClass: "border-l-4 border-l-sky-500",
    progressBarClass: "bg-sky-500",
    icon: (
      <svg
        className="w-4 h-4 text-sky-500 dark:text-sky-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  Applied: {
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50/30 border-blue-100 hover:border-blue-200",
    darkBgClass: "dark:bg-blue-950/10 dark:border-blue-900/30 dark:hover:border-blue-800/50",
    borderClass: "border-l-4 border-l-blue-500",
    progressBarClass: "bg-blue-500",
    icon: (
      <svg
        className="w-4 h-4 text-blue-500 dark:text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-2-9-18-9 18 9 2zm0 0v-8" />
      </svg>
    ),
  },
  Interviewing: {
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50/30 border-amber-100 hover:border-amber-200",
    darkBgClass: "dark:bg-amber-950/10 dark:border-amber-900/30 dark:hover:border-amber-800/50",
    borderClass: "border-l-4 border-l-amber-500",
    progressBarClass: "bg-amber-500",
    icon: (
      <svg
        className="w-4 h-4 text-amber-500 dark:text-amber-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  Offer: {
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50/30 border-emerald-100 hover:border-emerald-200",
    darkBgClass: "dark:bg-emerald-950/10 dark:border-emerald-900/30 dark:hover:border-emerald-800/50",
    borderClass: "border-l-4 border-l-emerald-500",
    progressBarClass: "bg-emerald-500",
    icon: (
      <svg
        className="w-4 h-4 text-emerald-500 dark:text-emerald-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  Accepted: {
    colorClass: "text-green-600 dark:text-green-400",
    bgClass: "bg-green-50/30 border-green-100 hover:border-green-200",
    darkBgClass: "dark:bg-green-950/10 dark:border-green-900/30 dark:hover:border-green-800/50",
    borderClass: "border-l-4 border-l-green-500",
    progressBarClass: "bg-green-500",
    icon: (
      <svg
        className="w-4 h-4 text-green-500 dark:text-green-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  Rejected: {
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-50/30 border-red-100 hover:border-red-200",
    darkBgClass: "dark:bg-red-950/10 dark:border-red-900/30 dark:hover:border-red-800/50",
    borderClass: "border-l-4 border-l-red-500",
    progressBarClass: "bg-red-500",
    icon: (
      <svg
        className="w-4 h-4 text-red-500 dark:text-red-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  Declined: {
    colorClass: "text-zinc-550 dark:text-zinc-400",
    bgClass: "bg-zinc-50/50 border-zinc-200 hover:border-zinc-300",
    darkBgClass: "dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:border-zinc-700",
    borderClass: "border-l-4 border-l-zinc-400 dark:border-l-zinc-500",
    progressBarClass: "bg-zinc-400 dark:bg-zinc-500",
    icon: (
      <svg
        className="w-4 h-4 text-zinc-550 dark:text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    ),
  },
  Withdrawn: {
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50/30 border-purple-100 hover:border-purple-200",
    darkBgClass:
      "dark:bg-purple-950/10 dark:border-purple-900/30 dark:hover:border-purple-800/50",
    borderClass: "border-l-4 border-l-purple-500",
    progressBarClass: "bg-purple-500",
    icon: (
      <svg
        className="w-4 h-4 text-purple-500 dark:text-purple-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H3m12 0l-4-4m4 4l-4 4m5-8V4a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-4"
        />
      </svg>
    ),
  },
};

export type StatCardProps = {
  name: string;
  count: number;
};

export function StatCard({ name, count }: StatCardProps) {
  const config = STATUS_CONFIG[name] || STATUS_CONFIG.Declined;
  return (
    <div
      className={`flex flex-col justify-between p-3.5 bg-white dark:bg-zinc-900 border rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-[1.02] hover:shadow-sm ${config.bgClass} ${config.darkBgClass} ${config.borderClass}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
          {name}
        </span>
        <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 shadow-[0_1px_1px_0_rgba(0,0,0,0.03)] border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
          {config.icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {count}
        </span>
        <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium">
          {name === "Total" ? "applications" : "jobs"}
        </span>
      </div>
    </div>
  );
}
