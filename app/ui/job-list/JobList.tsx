"use client";

import Link from "next/link";
import { Job } from "../../lib/jobs";
import { StatusBadge } from "../StatusBadge";
import { getViewJobRoute } from "../../lib/routes";
import { useEffect, useRef, useState } from "react";
import { JobItemPlaceholder } from "./JobItemPlaceholder";
import { fetchMoreJobsAction } from "@/app/lib/actions";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import StatsCount from "../StatsCount";
import { getStats } from "../../lib/jobs";

type StatsResult = Awaited<ReturnType<typeof getStats>>;
export type JobListProps = {
  initialJobs: Job[];
  pageSize?: number;
  stats?: Extract<StatsResult, { success: true }>["data"];
};

const getCompanyGradient = (name: string) => {
  const gradients = [
    "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
    "from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700",
    "from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700",
    "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
    "from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700",
    "from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700",
    "from-violet-500 to-fuchsia-600 dark:from-violet-600 dark:to-fuchsia-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
};

export default function JobList({ initialJobs, pageSize = 20, stats }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [offset, setOffset] = useState(initialJobs.length);
  const [hasMore, setHasMore] = useState(initialJobs.length >= pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollMargin, setScrollMargin] = useState(0);

  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Total");
  const [sortBy, setSortBy] = useState("id-desc");

  const listRef = useRef<HTMLUListElement | null>(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Safely measure the offset margin after the element is painted
  useEffect(() => {
    if (!listRef.current) return;

    const updateScrollMargin = () => {
      if (listRef.current) {
        const rect = listRef.current.getBoundingClientRect();
        setScrollMargin(rect.top + window.scrollY);
      }
    };

    updateScrollMargin();

    // Listen to resize events which can shift page layout and change the offset
    window.addEventListener("resize", updateScrollMargin);
    return () => {
      window.removeEventListener("resize", updateScrollMargin);
    };
  }, [stats, jobs.length]);


  // Set up the window virtualizer
  const rowVirtualizer = useWindowVirtualizer({
    count: jobs.length,
    estimateSize: () => 88, // 76px card + 12px gap
    scrollMargin,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];
  const lastIndex = lastItem ? lastItem.index : -1;

  // Filter/Sort changed trigger
  useEffect(() => {
    let active = true;
    const fetchFilteredJobs = async () => {
      setIsLoading(true);
      const result = await fetchMoreJobsAction(
        pageSize,
        0,
        debouncedSearchQuery,
        statusFilter,
        sortBy
      );

      if (active) {
        if (result.success) {
          setJobs(result.data);
          setOffset(result.data.length);
          setHasMore(result.data.length >= pageSize);
        } else {
          console.error("Failed to fetch filtered jobs:", result.error);
        }
        setIsLoading(false);
      }
    };

    fetchFilteredJobs();

    return () => {
      active = false;
    };
  }, [debouncedSearchQuery, statusFilter, sortBy, pageSize]);

  // Infinite Scroll loading trigger
  useEffect(() => {
    if (lastIndex === -1 || !hasMore || isLoading) return;

    if (lastIndex >= jobs.length - 3) {
      const loadMore = async () => {
        setIsLoading(true);
        const result = await fetchMoreJobsAction(
          pageSize,
          offset,
          debouncedSearchQuery,
          statusFilter,
          sortBy
        );

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
  }, [
    lastIndex,
    jobs.length,
    pageSize,
    hasMore,
    isLoading,
    offset,
    debouncedSearchQuery,
    statusFilter,
    sortBy,
  ]);

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
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between animate-fade-in">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400 dark:text-zinc-500"
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
          <input
            type="text"
            placeholder="Search company, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-450 hover:text-gray-650 dark:hover:text-zinc-300 cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Sorting option */}
        <div className="flex w-full sm:w-auto items-center justify-end gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-zinc-400 font-medium">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-2xs"
            >
              <option value="id-desc">Newest Added</option>
              <option value="id-asc">Oldest Added</option>
              <option value="company-asc">Company A-Z</option>
              <option value="company-desc">Company Z-A</option>
              <option value="role-asc">Role A-Z</option>
              <option value="role-desc">Role Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty Filter State */}
      {!isLoading && jobs.length === 0 && (
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
            We couldn&apos;t find any job applications matching &quot;{searchQuery || statusFilter}&quot;{statusFilter !== "Total" && searchQuery && ` with status "${statusFilter}"`}.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("Total");
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
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
                  transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin
                    }px)`,
                  paddingBottom: "12px", // Simulates the gap-3 between list items
                }}
              >
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
                      <p className="font-semibold text-gray-900 dark:text-zinc-150 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
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
