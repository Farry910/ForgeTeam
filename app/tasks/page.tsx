import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { STATUSES } from "@/lib/status";
import { taskFilterWhere } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ assignee?: string; q?: string }>;
}) {
  const { assignee, q } = await searchParams;

  const [agents, total] = await Promise.all([
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
    prisma.task.count(),
  ]);

  const tasks = await prisma.task.findMany({
    where: taskFilterWhere(assignee, q),
    orderBy: { updatedAt: "desc" },
    include: { assignedAgent: true },
  });

  type TaskRow = (typeof tasks)[number];
  const byStatus: Record<string, TaskRow[]> = {};
  for (const s of STATUSES) byStatus[s] = [];
  for (const t of tasks) (byStatus[t.status] ??= []).push(t);

  const filtered = Boolean(assignee || q);

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Board</h1>
        <Link href="/tasks/new">
          <button>New task</button>
        </Link>
      </div>

      {total === 0 ? (
        <p className="muted">
          No tasks yet. <Link href="/tasks/new">Create the first one.</Link>
        </p>
      ) : (
        <>
          <form method="get" className="row" style={{ marginTop: 8 }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="q">Search title</label>
              <input id="q" name="q" defaultValue={q ?? ""} placeholder="e.g. model" />
            </div>
            <div style={{ width: 220 }}>
              <label htmlFor="assignee">Assignee</label>
              <select id="assignee" name="assignee" defaultValue={assignee ?? ""}>
                <option value="">All</option>
                <option value="unassigned">Unassigned</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Filter</button>
          </form>

          <p className="muted" style={{ marginTop: 10 }}>
            Showing {tasks.length} of {total} tasks
            {filtered && (
              <>
                {" · "}
                <Link href="/tasks">Clear filters</Link>
              </>
            )}
          </p>

          {tasks.length === 0 ? (
            <p className="muted">
              No tasks match. <Link href="/tasks">Clear filters.</Link>
            </p>
          ) : (
            <div className="board">
              {STATUSES.map((status) => {
                const column = byStatus[status] ?? [];
                return (
                  <div className="board-col" key={status}>
                    <div className="board-col-header">
                      <span>{status}</span>
                      <span className="badge">{column.length}</span>
                    </div>
                    {column.length === 0 ? (
                      <div className="board-col-empty">—</div>
                    ) : (
                      column.map((t) => (
                        <Link className="card" href={`/tasks/${t.id}`} key={t.id}>
                          <div>{t.title}</div>
                          <div
                            className="muted"
                            style={{ fontSize: 12, marginTop: 4 }}
                          >
                            {t.assignedAgent?.name ?? "Unassigned"}
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
