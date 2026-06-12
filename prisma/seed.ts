import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

if (!process.env["DATABASE_URL"]) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const adapter = new PrismaBetterSqlite3({ url: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // 1. Seed Users
  const users = [
    { email: "alice@example.com" },
    { email: "bob@example.com" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log("Seeded users");

  // 2. Seed Statuses
  const statuses = [
    "New",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
    "Accepted",
    "Declined",
    "Withdrawn",
  ];

  for (const name of statuses) {
    await prisma.status.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Seeded statuses");

  // 3. Seed Companies
  const companies = [
    "Google",
    "Meta",
    "Amazon",
    "Netflix",
    "Microsoft",
    "OpenAI",
    "Stripe",
    "Airbnb",
  ];

  for (const name of companies) {
    await prisma.company.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Seeded companies");

  // 4. Seed Jobs
  const jobsData = [
    {
      role: "Senior Frontend Engineer",
      companyName: "Google",
      statusName: "Interviewing",
      description: "Working on Search UI using React and TypeScript.",
    },
    {
      role: "Fullstack Developer",
      companyName: "Stripe",
      statusName: "Applied",
      description: "Building payment infrastructure for the internet.",
    },
    {
      role: "Backend Engineer",
      companyName: "Amazon",
      statusName: "Offer",
      description: "Scaling AWS Lambda control plane.",
    },
    {
      role: "Software Engineer, Product",
      companyName: "Meta",
      statusName: "Rejected",
      description: "Product engineering for Instagram Reels.",
    },
    {
      role: "AI Researcher",
      companyName: "OpenAI",
      statusName: "New",
      description: "Researching next-generation transformer architectures.",
    },
    {
      role: "Software Engineer",
      companyName: "Microsoft",
      statusName: "Accepted",
      description: "Working on VS Code extensions and core features.",
    },
  ];

  for (const job of jobsData) {
    await prisma.jobs.create({
      data: {
        role: job.role,
        description: job.description,
        company: {
          connect: { name: job.companyName },
        },
        status: {
          connect: { name: job.statusName },
        },
      },
    });
  }
  console.log("Seeded jobs");

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding the database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
