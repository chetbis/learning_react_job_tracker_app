import bcrypt from "bcryptjs";
import { prisma } from '../app/lib/db';

async function main() {
  console.log("Start seeding...");

  // 1. Seed Users
  const users = [
    { email: "alice@example.com", password: "password123" },
    { email: "bob@example.com", password: "password456" },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: { hashedPassword },
      create: {
        email: user.email,
        hashedPassword,
      },
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
    const company = await prisma.company.findUnique({ where: { name: job.companyName } });
    const status = await prisma.status.findUnique({ where: { name: job.statusName } });

    if (company && status) {
      const existingJob = await prisma.jobs.findFirst({
        where: {
          role: job.role,
          companyId: company.id,
          statusId: status.id,
        },
      });

      if (!existingJob) {
        await prisma.jobs.create({
          data: {
            role: job.role,
            description: job.description,
            company: {
              connect: { id: company.id },
            },
            status: {
              connect: { id: status.id },
            },
          },
        });
      }
    }
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
