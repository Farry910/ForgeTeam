import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteTask, updateTask } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [task, agents] = await Promise.all([
    prisma.task.findUnique({ where: { id } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!task) notFound();

  return (
    <div>
      <p className="muted">
        <Link href={`/tasks/${task.id}`}>← Back to task</Link>
      </p>
      <h1>Edit task</h1>

      <form action={updateTask} className="panel" style={{ marginTop: 16 }}>
        <input type="hidden" name="taskId" value={task.id} />

        <label htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={task.title} />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={task.description ?? ""}
        />

        <label htmlFor="assignedAgentId">Assign to</label>
        <select
          id="assignedAgentId"
          name="assignedAgentId"
          defaultValue={task.assignedAgentId ?? ""}
        >
          <option value="">— Unassigned —</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.role})
            </option>
          ))}
        </select>

        <label htmlFor="githubIssueUrl">GitHub Issue URL</label>
        <input
          id="githubIssueUrl"
          name="githubIssueUrl"
          defaultValue={task.githubIssueUrl ?? ""}
          placeholder="https://github.com/.../issues/1"
        />

        <button type="submit">Save changes</button>
      </form>

      <form action={deleteTask} className="panel">
        <input type="hidden" name="taskId" value={task.id} />
        <strong>Delete task</strong>
        <p className="muted" style={{ margin: "6px 0 0", fontSize: 13 }}>
          Permanently deletes this task and all of its work logs and reviews.
        </p>
        <button type="submit" className="secondary">
          Delete task
        </button>
      </form>
    </div>
  );
}
