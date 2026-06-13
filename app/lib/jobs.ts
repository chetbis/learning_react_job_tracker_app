import { Prisma } from "../generated/prisma/client";
import { prisma } from "./db";
import * as z from "zod";

import { Result } from "./types";

const jobSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  role: z.string().min(1, "Role is required"),
});

const createJobSchema = jobSchema; // For creation, all fields except description are required
const updateJobSchema = jobSchema; // For updates, all fields are optional, but if provided, they must be valid
const jobSchemaWithId = jobSchema.extend({ id: z.number() }); // For operations that require an ID, we can use this schema to validate the entire job object

export type Job = z.infer<typeof jobSchemaWithId>;

type PrismaJob = Prisma.JobsGetPayload<{
  include: { company: true; status: true };
}>;

/**
 * Shared helper to map Prisma's raw job records (including relations)
 * to the clean, domain-specific Job type.
 */
function mapJob(job: PrismaJob): Job {
  return {
    id: job.id,
    company: job.company.name,
    status: job.status.name,
    role: job.role,
    description: job.description ?? undefined,
  };
}

/**
 * Shared helper to prepare the complex Prisma 'data' object
 * for both create and update operations.
 */
function prepareJobData(data: Omit<Job, "id">) {
  return {
    description: data.description,
    role: data.role,
    company: {
      connectOrCreate: {
        where: { name: data.company },
        create: { name: data.company },
      },
    },
    status: {
      connectOrCreate: {
        where: { name: data.status },
        create: { name: data.status },
      },
    },
  };
}

const includeRelations = {
  company: true,
  status: true,
};

export async function getJobById(id: number): Promise<Result<Job | null>> {
  try {
    const result = await prisma.jobs.findUnique({
      where: { id },
      include: includeRelations,
    });

    return { success: true, data: result ? mapJob(result) : null };
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    return { success: false, error: "Database error: Could not fetch job." };
  }
}

export async function createJob(data: Omit<Job, "id">): Promise<Result<Job>> {
  const validationResult = createJobSchema.safeParse(data); // Validate input data against the schema
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    const result = await prisma.jobs.create({
      data: prepareJobData(validationResult.data),
      include: includeRelations,
    });

    return { success: true, data: mapJob(result) };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Database error: Could not create job." };
  }
}

export async function updateJob(
  id: number,
  data: Omit<Job, "id">,
): Promise<Result<Job>> {

  const validationResult = updateJobSchema.safeParse(data); // Validate input data against the schema
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    const result = await prisma.jobs.update({
      where: { id },
      data: prepareJobData(validationResult.data),
      include: includeRelations,
    });

    return { success: true, data: mapJob(result) };
  } catch (error) {
    console.error(`Error updating job with id ${id}:`, error);
    // Prisma throws P2025 if the record is not found
    return { success: false, error: "Database error: Could not update job." };
  }
}

export async function getAllJobs(): Promise<Result<Job[]>> {
  try {
    const rawJobs = await prisma.jobs.findMany({
      include: includeRelations,
    });

    return { success: true, data: rawJobs.map(mapJob) };
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    return { success: false, error: "Database error: Could not fetch jobs." };
  }
}

export async function deleteJob(id: number): Promise<Result<boolean>> {
  try {
    await prisma.jobs.delete({ where: { id } });
    return { success: true, data: true };
  } catch (error) {
    console.error(`Error deleting job with id ${id}:`, error);
    return { success: false, error: "Database error: Could not delete job." };
  }
}

export async function getStats(): Promise<
  Result<{ name: string; count: number }[]>
> {
  try {
    const result = await prisma.status.findMany({
      where: { jobs: { some: {} } },
      select: {
        name: true,
        _count: { select: { jobs: true } },
      },
    });

    return {
      success: true,
      data: result.map((status) => ({
        name: status.name,
        count: status._count.jobs,
      })),
    };
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return {
      success: false,
      error: "Database error: Could not fetch statuses.",
    };
  }
}
