"use server";

import { getPaginatedJobs } from './jobs';

export async function fetchMoreJobsAction(take: number, skip: number) {
  return getPaginatedJobs(take, skip);
}