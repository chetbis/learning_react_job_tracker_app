"use client";

import Link from "next/link";
import { Job } from "../../lib/jobs";
import { StatusBadge } from "../StatusBadge";
import { getViewJobRoute } from "../../lib/routes";
import { useEffect, useRef, useState } from "react";
import { JobItemPlaceholder } from "./JobItemPlaceholder";
import { fetchMoreJobsAction } from "@/app/lib/actions";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

export type JobListProps = {
  initialJobs: Job[];
  pageSize?: number;
};

export default function JobList({ initialJobs, pageSize = 20 }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [offset, setOffset] = useState(initialJobs.length);
  const [hasMore, setHasMore] = useState(initialJobs.length >= pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollMargin, setScrollMargin] = useState(400);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Safely measure the offset margin after the element is painted
  useEffect(() => {
    if (listRef.current) {
      setScrollMargin(listRef.current.offsetTop);
    }
  }, []);

  // Set up the window virtualizer
  const rowVirtualizer = useWindowVirtualizer({
    count: jobs.length,
    estimateSize: () => 88, // 76px card + 12px gap
    scrollMargin,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];
  const lastIndex = lastItem ? lastItem.index : -1;

  // Infinite Scroll loading trigger
  useEffect(() => {
    if (lastIndex === -1 || !hasMore || isLoading) return;

    if (lastIndex >= jobs.length - 3) {
      const loadMore = async () => {
        setIsLoading(true);
        const result = await fetchMoreJobsAction(pageSize, offset);

        if (result.success) {
          const newJobs = result.data;
          if (newJobs.length) {
            setJobs((prevJobs) => [...prevJobs, ...newJobs]);
            setOffset((prevOffset) => prevOffset + newJobs.length);
          }
          if (newJobs.length < pageSize) {
            setHasMore(false);
          }
        } else {
          console.error("Failed to fetch more jobs:", result.error);
        }
        setIsLoading(false);
      };

      loadMore();
    }
  }, [lastIndex, jobs.length, pageSize, hasMore, isLoading, offset]);

  return (
    <div ref={listRef} className="w-full">
      <ul
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const job = jobs[virtualItem.index];
          if (!job) return null;

          return (
            <li
              key={virtualItem.key}
              ref={rowVirtualizer.measureElement}
              data-index={virtualItem.index}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin
                  }px)`,
                paddingBottom: "12px", // Simulates the gap-3 between list items
              }}
            >
              <Link
                href={getViewJobRoute(job.id)}
                className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm hover:border-gray-300 dark:hover:border-zinc-600 transition-colors"
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
          );
        })}
      </ul>

      {/* Show the loading placeholder below the list container */}
      {hasMore && isLoading && (
        <JobItemPlaceholder className="mt-3" />
      )}
    </div>
  );
}
