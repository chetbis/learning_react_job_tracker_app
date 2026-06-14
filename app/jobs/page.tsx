import Link from "next/link";
import { getStats } from "../lib/jobs";
import JobList from "../ui/job-list/JobList";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { fetchMoreJobsAction } from '../lib/actions';
import { logout } from "../lib/auth";

const PAGE_SIZE = 10;

export default async function Jobs() {
  const stats = await getStats();
  const jobs = await fetchMoreJobsAction(PAGE_SIZE, 0);

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Job Applications
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href="/jobs/new"
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Add Job
          </Link>
          <form action={logout}>
            <button
              className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>

      {!jobs.success && <ErrorState error={jobs.error} />}
      {jobs.success && jobs.data.length === 0 && <EmptyState />}
      {jobs.success && jobs.data.length > 0 && (
        <JobList
          initialJobs={jobs.data}
          pageSize={PAGE_SIZE}
          stats={stats.success ? stats.data : undefined}
        />
      )}
    </div>
  );
}
