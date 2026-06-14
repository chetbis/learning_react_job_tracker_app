"use client";

import { useEffect } from "react";
import { Job } from "../../lib/jobs";
import { JobItemPlaceholder } from "./JobItemPlaceholder";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import StatsCount from "../StatsCount";
import { getStats } from "../../lib/jobs";
import { useJobList } from "./useJobList";
import { JobFilters } from "./JobFilters";
import { EmptyJobsState } from "./EmptyJobsState";
import { JobCard } from "./JobCard";

type StatsResult = Awaited<ReturnType<typeof getStats>>;
export type JobListProps = {
  initialJobs: Job[];
  pageSize?: number;
  stats?: Extract<StatsResult, { success: true }>["data"];
};

export default function JobList({ initialJobs, pageSize = 20, stats }: JobListProps) {
  const {
    jobs,
    isLoading,
    hasMore,
    scrollMargin,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    listRef,
    loadMoreJobs,
    clearFilters,
  } = useJobList({ initialJobs, pageSize, stats });

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
    if (lastIndex !== -1 && lastIndex >= jobs.length - 3) {
      loadMoreJobs();
    }
  }, [lastIndex, jobs.length, loadMoreJobs]);

  return (
    <div className="w-full flex flex-col">
      {/* Stats funnel visualization */}
      {stats && (
        <StatsCount
          stats={stats}
          activeStatus={statusFilter}
          onStatusSelect={setStatusFilter}
        />
      )}

      {/* Filter and Sort controls */}
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Empty Filter State */}
      {!isLoading && jobs.length === 0 && (
        <EmptyJobsState
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onClearFilters={clearFilters}
        />
      )}

      {/* List Container */}
      <div className="w-full relative">
        <ul
          ref={listRef}
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
                  transform: `translateY(${
                    virtualItem.start - rowVirtualizer.options.scrollMargin
                  }px)`,
                  paddingBottom: "12px", // Simulates the gap-3 between list items
                }}
              >
                <JobCard job={job} />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Show the loading placeholder below the list container */}
      {hasMore && isLoading && <JobItemPlaceholder className="mt-3" />}
    </div>
  );
}

