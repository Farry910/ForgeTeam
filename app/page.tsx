import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [agentCount, tasks] = await Promise.all([
    prisma.agent.count(),
    prisma.task.findMany({
      orderBy: { updatedAt: "desc" },
      include: { assignedAgent: true },
    }),
  ]);

  const byStatus = tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="muted">A local-first hybrid human-AI software workspace.</p>

      <div className="grid" style={{ marginTop: 20 }}>
        <div className="stat">
          <div className="num">{agentCount}</div>
          <div className="label">Agents</div>
        </div>
        <div className="stat">
          <div className="num">{tasks.length}</div>
          <div className="label">Tasks</div>
        </div>
        <div className="stat">
          <div className="num">{byStatus["IN_REVIEW"] ?? 0}</div>
          <div className="label">In Review</div>
        </div>
        <div className="stat">
          <div className="num">{byStatus["MERGED"] ?? 0}</div>
          <div className="label">Merged</div>
        </div>
      </div>

      <h2>Recent tasks</h2>
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
            </tr>
          </thead>
          <tbody>
            {tasks.slice(0, 8).map((t) => (
              <tr key={t.id}>
                <td>
                  <Link href={`/tasks/${t.id}`}>{t.title}</Link>
                </td>
                <td className="muted">{t.assignedAgent?.name ?? "—"}</td>
                <td>
                  <span className="badge">{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
