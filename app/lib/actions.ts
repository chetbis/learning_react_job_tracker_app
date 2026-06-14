"use server";

import { getPaginatedJobs } from './jobs';

export async function fetchMoreJobsAction(
  take: number,
  skip: number,
  search?: string,
  status?: string,
  sortBy?: string
) {
  return getPaginatedJobs(take, skip, search, status, sortBy);
}