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
    "Apple",
    "Tesla",
    "Uber",
    "Lyft",
    "GitHub",
    "GitLab",
    "Slack",
    "Salesforce",
    "Adobe",
    "Figma",
    "Atlassian",
    "Zoom",
    "Spotify",
    "Pinterest",
    "Twitter",
    "LinkedIn",
    "TikTok",
    "Shopify",
    "Coinbase",
    "Robinhood",
    "Plaid",
    "Square",
    "Asana",
    "Jira",
    "Datadog",
    "Snowflake",
    "Cloudflare",
    "Fastly",
    "Twilio",
    "HubSpot",
    "Canva",
    "Notion",
    "Linear",
    "Vercel",
    "Netlify",
    "Supabase",
    "Prisma",
    "Clerk",
    "Auth0",
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
  const jobRoles = [
    "Software Engineer",
    "Senior Software Engineer",
    "Staff Software Engineer",
    "Principal Software Engineer",
    "Frontend Engineer",
    "Senior Frontend Engineer",
    "Backend Engineer",
    "Senior Backend Engineer",
    "Fullstack Developer",
    "Senior Fullstack Developer",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Product Manager",
    "Engineering Manager",
    "UI/UX Designer",
    "QA Engineer",
    "Solutions Architect",
    "Cloud Engineer",
    "Mobile Engineer (iOS)",
    "Mobile Engineer (Android)",
    "Security Engineer",
    "Database Administrator",
    "Systems Engineer"
  ];

  const jobsData: Array<{
    role: string;
    companyName: string;
    statusName: string;
    description: string;
  }> = [];

  const initialJobs = [
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

  jobsData.push(...initialJobs);

  const remainingCount = 500 - initialJobs.length;
  for (let i = 0; i < remainingCount; i++) {
    const role = jobRoles[i % jobRoles.length];
    const companyName = companies[Math.floor(i / jobRoles.length) % companies.length];
    const statusName = statuses[i % statuses.length];
    const description = `This is a simulated description for the position of ${role} at ${companyName}. Job ID: #${i + 1000}. Duties include designing, building, and maintaining reliable systems in collaboration with cross-functional teams.`;

    jobsData.push({
      role,
      companyName,
      statusName,
      description,
    });
  }

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
