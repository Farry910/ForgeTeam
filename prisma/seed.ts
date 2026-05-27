import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Idempotent reset of seed data so `npm run db:seed` can be re-run safely.
  await prisma.review.deleteMany();
  await prisma.workLog.deleteMany();
  await prisma.task.deleteMany();
  await prisma.agent.deleteMany();

  const alex = await prisma.agent.create({
    data: {
      name: "Alex",
      role: "AI Product Manager",
      specialty: "Turning vague requests into clear, testable tickets",
      communicationStyle: "Structured, asks clarifying questions",
      permissions: "create_issue, write_requirements",
    },
  });

  const sam = await prisma.agent.create({
    data: {
      name: "Sam Rivera",
      role: "AI Backend Developer",
      specialty: "Next.js, TypeScript, Prisma, APIs",
      communicationStyle: "Practical, concise, transparent",
      permissions: "create_branch, write_code, open_pr",
    },
  });

  const jordan = await prisma.agent.create({
    data: {
      name: "Jordan",
      role: "AI QA Engineer",
      specialty: "Test coverage, edge cases, security review",
      communicationStyle: "Specific, evidence-based",
      permissions: "review_pr, request_changes",
    },
  });

  // One sample task so the dashboard is not empty on first run.
  const task = await prisma.task.create({
    data: {
      title: "Scaffold the ForgeTeam dashboard",
      description:
        "Build the Next.js + Prisma + SQLite app: agents, tasks, work logs, status tracking.",
      status: "PR_OPENED",
      assignedAgentId: sam.id,
      githubPrUrl: "",
    },
  });

  await prisma.workLog.createMany({
    data: [
      {
        taskId: task.id,
        authorType: "AI",
        authorName: "Alex",
        message:
          "Requirement: a local dashboard showing agents, tasks, status, and work logs.",
      },
      {
        taskId: task.id,
        authorType: "AI",
        authorName: "Sam Rivera",
        message:
          "Technical plan: App Router + server actions, Prisma schema with 4 models, seed data.",
      },
      {
        taskId: task.id,
        authorType: "AI",
        authorName: "Sam Rivera",
        message: "Branch feature/app-skeleton created. Implementing pages.",
      },
    ],
  });

  await prisma.review.create({
    data: {
      taskId: task.id,
      reviewerName: "Jordan",
      verdict: "CHANGES_REQUESTED",
      comments: "Add README setup steps and confirm the build passes before merge.",
    },
  });

  console.log(`Seeded agents: ${[alex.name, sam.name, jordan.name].join(", ")}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
