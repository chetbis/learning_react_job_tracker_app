import Link from "next/link";
import { getStats } from "../lib/jobs";
import StatsCount from "../ui/StatsCount";
import JobList from "../ui/job-list/JobList";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { fetchMoreJobsAction } from '../lib/actions';

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
        </div>
      </div>

      {stats.success && stats.data.length > 0 && <StatsCount stats={stats.data} />}

      {!jobs.success && <ErrorState error={jobs.error} />}
      {jobs.success && jobs.data.length === 0 && <EmptyState />}
      {jobs.success && jobs.data.length > 0 && <JobList initialJobs={jobs.data} pageSize={PAGE_SIZE} />}
    </div>
  );
}
