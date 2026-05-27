import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { orderStatusCounts } from "@/lib/status";
import { mergeActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [agents, grouped, totalTasks, unassigned, logs, reviews] =
    await Promise.all([
      prisma.agent.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { tasks: true } } },
      }),
      prisma.task.groupBy({ by: ["status"], _count: true }),
      prisma.task.count(),
      prisma.task.count({ where: { assignedAgentId: null } }),
      prisma.workLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { task: true },
      }),
      prisma.review.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { task: true },
      }),
    ]);

  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.status] = g._count;
  const statusCounts = orderStatusCounts(counts).filter((s) => s.count > 0);

  const recent = mergeActivity(logs, reviews, 5);

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="muted">A local-first hybrid human-AI software workspace.</p>

      <div className="grid" style={{ marginTop: 20 }}>
        <div className="stat">
          <div className="num">{agents.length}</div>
          <div className="label">Agents</div>
        </div>
        <div className="stat">
          <div className="num">{totalTasks}</div>
          <div className="label">Tasks</div>
        </div>
        <div className="stat">
          <div className="num">{counts["IN_REVIEW"] ?? 0}</div>
          <div className="label">In Review</div>
        </div>
        <div className="stat">
          <div className="num">{counts["MERGED"] ?? 0}</div>
          <div className="label">Merged</div>
        </div>
      </div>

      <h2>By status</h2>
      {statusCounts.length === 0 ? (
        <p className="muted">
          No tasks yet. <Link href="/tasks/new">Create the first one.</Link>
        </p>
      ) : (
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          {statusCounts.map((s) => (
            <Link key={s.status} href={`/tasks`} className="badge">
              {s.status} · {s.count}
            </Link>
          ))}
        </div>
      )}

      <h2>Workload</h2>
      <table>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Role</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td className="muted">{a.role}</td>
              <td>{a._count.tasks}</td>
            </tr>
          ))}
          <tr>
            <td className="muted">Unassigned</td>
            <td className="muted">—</td>
            <td>{unassigned}</td>
          </tr>
        </tbody>
      </table>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Recent activity</h2>
        <Link href="/activity" style={{ alignSelf: "center" }}>
          View all →
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="muted">No activity yet.</p>
      ) : (
        <div>
          {recent.map((item) => (
            <div className="timeline-item" key={`${item.kind}-${item.id}`}>
              <div>
                <strong>{item.author}</strong>{" "}
                <span className="badge">{item.badge}</span>{" "}
                <span className="muted" style={{ fontSize: 12 }}>
                  {item.createdAt.toLocaleString()}
                </span>{" "}
                · <Link href={`/tasks/${item.taskId}`}>{item.taskTitle}</Link>
              </div>
              <div style={{ marginTop: 4 }}>{item.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
