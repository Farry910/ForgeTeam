import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createTask } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function NewTaskPage() {
  const agents = await prisma.agent.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1>New task</h1>
      <p className="muted">
        <Link href="/tasks">← Back to tasks</Link>
      </p>

      <form action={createTask} className="panel" style={{ marginTop: 16 }}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required placeholder="Add task list page" />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="What needs to happen and why."
        />

        <label htmlFor="assignedAgentId">Assign to</label>
        <select id="assignedAgentId" name="assignedAgentId">
          <option value="">— Unassigned —</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.role})
            </option>
          ))}
        </select>

        <label htmlFor="githubIssueUrl">GitHub Issue URL (optional)</label>
        <input
          id="githubIssueUrl"
          name="githubIssueUrl"
          placeholder="https://github.com/.../issues/1"
        />

        <button type="submit">Create task</button>
      </form>
    </div>
  );
}
