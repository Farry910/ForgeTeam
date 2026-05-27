import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { STATUSES } from "@/lib/status";
import {
  addWorkLog,
  updatePrLink,
  updateTaskStatus,
} from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      assignedAgent: true,
      workLogs: { orderBy: { createdAt: "asc" } },
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!task) notFound();

  return (
    <div>
      <p className="muted">
        <Link href="/tasks">← Back to tasks</Link>
      </p>
      <h1>{task.title}</h1>
      <p className="muted">
        Assigned to {task.assignedAgent?.name ?? "—"} · created{" "}
        {task.createdAt.toLocaleDateString()}
      </p>

      {task.description && <div className="panel">{task.description}</div>}

      {/* Status */}
      <div className="panel">
        <form action={updateTaskStatus} className="row">
          <input type="hidden" name="taskId" value={task.id} />
          <div style={{ flex: 1 }}>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={task.status}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Update status</button>
        </form>
      </div>

      {/* GitHub links */}
      <div className="panel">
        <form action={updatePrLink} className="row">
          <input type="hidden" name="taskId" value={task.id} />
          <div style={{ flex: 1 }}>
            <label htmlFor="githubPrUrl">GitHub PR URL</label>
            <input
              id="githubPrUrl"
              name="githubPrUrl"
              defaultValue={task.githubPrUrl ?? ""}
              placeholder="https://github.com/.../pull/1"
            />
          </div>
          <button type="submit" className="secondary">
            Save PR link
          </button>
        </form>
        {task.githubIssueUrl && (
          <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
            Issue: <a href={task.githubIssueUrl}>{task.githubIssueUrl}</a>
          </p>
        )}
      </div>

      {/* Reviews */}
      {task.reviews.length > 0 && (
        <>
          <h2>Reviews</h2>
          {task.reviews.map((r) => (
            <div className="panel" key={r.id}>
              <strong>{r.reviewerName}</strong>{" "}
              <span className="badge">{r.verdict}</span>
              {r.comments && <p style={{ margin: "8px 0 0" }}>{r.comments}</p>}
            </div>
          ))}
        </>
      )}

      {/* Work log */}
      <h2>Work log</h2>
      {task.workLogs.length === 0 ? (
        <p className="muted">No entries yet.</p>
      ) : (
        <div>
          {task.workLogs.map((log) => (
            <div className="timeline-item" key={log.id}>
              <div>
                <strong>{log.authorName}</strong>{" "}
                <span className="badge">{log.authorType}</span>{" "}
                <span className="muted" style={{ fontSize: 12 }}>
                  {log.createdAt.toLocaleString()}
                </span>
              </div>
              <div style={{ marginTop: 4 }}>{log.message}</div>
            </div>
          ))}
        </div>
      )}

      <form action={addWorkLog} className="panel" style={{ marginTop: 16 }}>
        <input type="hidden" name="taskId" value={task.id} />
        <div className="row">
          <div style={{ flex: 1 }}>
            <label htmlFor="authorName">Author</label>
            <input id="authorName" name="authorName" placeholder="Sam Rivera" />
          </div>
          <div style={{ width: 140 }}>
            <label htmlFor="authorType">Type</label>
            <select id="authorType" name="authorType" defaultValue="HUMAN">
              <option value="HUMAN">HUMAN</option>
              <option value="AI">AI</option>
              <option value="SYSTEM">SYSTEM</option>
            </select>
          </div>
        </div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required placeholder="Add an update…" />
        <button type="submit">Add entry</button>
      </form>
    </div>
  );
}
