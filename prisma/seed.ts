import { PrismaClient, type Task } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Idempotent reset so `npm run db:seed` can be re-run safely.
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

  // The roadmap's first 10 issues (docs/mvp-roadmap.md), seeded as an
  // illustrative snapshot of a team mid-stream so the board fills out.
  const starters = [
    {
      title: "Create product vision document",
      description: "Write docs/product-vision.md: goal, MVP scope, non-goals.",
      status: "DEPLOYED",
      agentId: alex.id,
    },
    {
      title: "Create AI developer behavior standard",
      description: "Define how AI devs work: plan, branch, test, be honest.",
      status: "MERGED",
      agentId: alex.id,
    },
    {
      title: "Create initial Next.js app",
      description: "Scaffold the Next.js + TypeScript dashboard shell.",
      status: "MERGED",
      agentId: sam.id,
    },
    {
      title: "Add Prisma and SQLite",
      description: "Wire Prisma with a local SQLite datasource.",
      status: "APPROVED",
      agentId: sam.id,
    },
    {
      title: "Add Agent model",
      description: "Agent table: name, role, specialty, style, permissions.",
      status: "IN_REVIEW",
      agentId: sam.id,
    },
    {
      title: "Add Task model",
      description: "Task table with status, assignee, and GitHub links.",
      status: "PR_OPENED",
      agentId: sam.id,
    },
    {
      title: "Add task list page",
      description: "List tasks; later evolve into the status board.",
      status: "TESTING",
      agentId: sam.id,
    },
    {
      title: "Add create task form",
      description: "Form to create a task and assign an agent.",
      status: "CODING",
      agentId: sam.id,
    },
    {
      title: "Add task detail page with work logs",
      description: "Detail view: work-log timeline, status dropdown, reviews.",
      status: "CHANGES_REQUESTED",
      agentId: sam.id,
    },
    {
      title: "Add GitHub Actions CI",
      description: "CI workflow: type check, lint, build on PRs to main.",
      status: "BACKLOG",
      agentId: sam.id,
    },
  ];

  const tasks: Task[] = [];
  for (const spec of starters) {
    tasks.push(
      await prisma.task.create({
        data: {
          title: spec.title,
          description: spec.description,
          status: spec.status,
          assignedAgentId: spec.agentId,
        },
      }),
    );
  }

  // Activity on the in-flight items so the board reads like real work.
  const byTitle = (t: string) => tasks.find((x) => x.title.startsWith(t))!;

  await prisma.workLog.createMany({
    data: [
      {
        taskId: byTitle("Add Task model").id,
        authorType: "AI",
        authorName: "Sam Rivera",
        message: "Opened PR with the Task schema + migration. Awaiting review.",
      },
      {
        taskId: byTitle("Add task list page").id,
        authorType: "AI",
        authorName: "Sam Rivera",
        message: "Implemented the list; running build and a quick smoke test.",
      },
      {
        taskId: byTitle("Add create task form").id,
        authorType: "AI",
        authorName: "Sam Rivera",
        message: "Form wired to a server action; validating required fields.",
      },
      {
        taskId: byTitle("Add task detail page").id,
        authorType: "AI",
        authorName: "Jordan",
        message: "Review: CHANGES_REQUESTED — add timestamps to the work log.",
      },
    ],
  });

  await prisma.review.create({
    data: {
      taskId: byTitle("Add Agent model").id,
      reviewerName: "Jordan",
      verdict: "APPROVED",
      comments: "Schema is clean and matches the spec. Good to merge.",
    },
  });

  await prisma.review.create({
    data: {
      taskId: byTitle("Add task detail page").id,
      reviewerName: "Jordan",
      verdict: "CHANGES_REQUESTED",
      comments: "Work-log entries need timestamps before this can ship.",
    },
  });

  console.log(
    `Seeded ${[alex, sam, jordan].length} agents and ${tasks.length} tasks across the board.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
