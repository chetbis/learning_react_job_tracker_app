import Link from "next/link";
import { Job } from "../../lib/jobs";
import { StatusBadge } from "../StatusBadge";
import { getViewJobRoute } from "../../lib/routes";
import { getCompanyGradient, getInitials } from "./utils";

export type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={getViewJobRoute(job.id)}
      className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slide-up"
    >
      <div className="flex items-center gap-3">
        {/* Dynamic colored avatar */}
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${getCompanyGradient(
            job.company
          )} shadow-inner select-none shrink-0`}
        >
          {getInitials(job.company)}
        </div>

        <div>
          <p className="font-semibold text-blue-500 dark:text-blue-400">
            {job.company}
          </p>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">
            {job.role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <StatusBadge status={job.status} />

        <svg
          className="w-4 h-4 text-gray-300 dark:text-zinc-600 group-hover:text-gray-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
