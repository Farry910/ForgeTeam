import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { updatedAt: "desc" },
    include: { assignedAgent: true },
  });

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Tasks</h1>
        <Link href="/tasks/new">
          <button>New task</button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="muted">
          No tasks yet. <Link href="/tasks/new">Create the first one.</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>
                  <Link href={`/tasks/${t.id}`}>{t.title}</Link>
                </td>
                <td className="muted">{t.assignedAgent?.name ?? "—"}</td>
                <td>
                  <span className="badge">{t.status}</span>
                </td>
                <td className="muted">
                  {t.updatedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
