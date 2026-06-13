"use client";

import Link from "next/link";
import { Job } from "../../lib/jobs";
import { StatusBadge } from "../StatusBadge";
import { getViewJobRoute } from "../../lib/routes";
import { useEffect, useRef, useState } from "react";
import { JobItemPlaceholder } from "./JobItemPlaceholder";
import { fetchMoreJobsAction } from "@/app/lib/actions";

export type JobListProps = {
  initialJobs: Job[];
  pageSize?: number;
};

export default function JobList({ initialJobs, pageSize = 20 }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [offset, setOffset] = useState(initialJobs.length);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(offset);
  const hasMoreRef = useRef(hasMore);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => { offsetRef.current = offset; }, [offset]);
  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingRef.current) {

        isLoadingRef.current = true;
        setIsLoading(true);

        const result = await fetchMoreJobsAction(pageSize, offsetRef.current);

        if (result.success && result.data) {
          const newJobs = result.data;
          if (newJobs.length) {
            setJobs((prevJobs) => [...prevJobs, ...newJobs]);
            setOffset((prevOffset) => prevOffset + newJobs.length);
          }
          if (newJobs.length < pageSize) {
            setHasMore(false);
          }
        }
        isLoadingRef.current = false;
        setIsLoading(false);
      }

    }, { threshold: 0.1 });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect();

  }, [pageSize]);

  return (
    <>
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
      </ul>{
        hasMore && (
          <div ref={sentinelRef}>
            {isLoading && <JobItemPlaceholder className="mt-3" />}
          </div>
        )
      }
    </>
  );
}
