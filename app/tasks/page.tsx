import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { STATUSES } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { updatedAt: "desc" },
    include: { assignedAgent: true },
  });

  type TaskRow = (typeof tasks)[number];
  const byStatus: Record<string, TaskRow[]> = {};
  for (const s of STATUSES) byStatus[s] = [];
  for (const t of tasks) (byStatus[t.status] ??= []).push(t);

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Board</h1>
        <Link href="/tasks/new">
          <button>New task</button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="muted">
          No tasks yet. <Link href="/tasks/new">Create the first one.</Link>
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
    </div>
  );
}
