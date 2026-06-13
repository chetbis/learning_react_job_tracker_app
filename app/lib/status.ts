import { prisma } from "./db";
import { Result } from "./types";

export type Status = {
  id: number;
  name: string;
};

export async function getAllStatus(): Promise<Result<Status[]>> {
  try {
    const result = await prisma.status.findMany();

    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return {
      success: false,
      error: "Database error: Could not fetch statuses.",
    };
  }
}
