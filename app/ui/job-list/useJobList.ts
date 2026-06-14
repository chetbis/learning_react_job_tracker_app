import { useState, useEffect, useRef, useCallback } from "react";
import { Job, getStats } from "../../lib/jobs";
import { fetchMoreJobsAction } from "@/app/lib/actions";

type StatsResult = Awaited<ReturnType<typeof getStats>>;
type StatsData = Extract<StatsResult, { success: true }>["data"];

interface UseJobListProps {
  initialJobs: Job[];
  pageSize: number;
  stats?: StatsData;
}

export function useJobList({ initialJobs, pageSize, stats }: UseJobListProps) {
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
  const loadMoreJobs = useCallback(async () => {
    if (!hasMore || isLoading) return;

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
  }, [hasMore, isLoading, pageSize, offset, debouncedSearchQuery, statusFilter, sortBy]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("Total");
  }, []);

  return {
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
  };
}
