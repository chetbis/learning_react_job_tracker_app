import Link from "next/link";
import { Job } from "../lib/jobs";
import { StatusBadge } from "./StatusBadge";
import { getViewJobRoute } from "../lib/routes";

export type JobListProps = {
  jobs: Job[];
};

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <Link
            href={getViewJobRoute(job.id)}
            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {job.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {job.role}
              </p>
            </div>
            <StatusBadge status={job.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
