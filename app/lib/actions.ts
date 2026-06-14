"use server";

import { verifySession } from './dal';
import { getPaginatedJobs } from './jobs';

export async function fetchMoreJobsAction(
  take: number,
  skip: number,
  search?: string,
  status?: string,
  sortBy?: string
) {
  await verifySession();
  return getPaginatedJobs(take, skip, search, status, sortBy);
}