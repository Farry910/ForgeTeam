import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { mergeActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  const [logs, reviews] = await Promise.all([
    prisma.workLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { task: true },
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { task: true },
    }),
  ]);

  const items = mergeActivity(logs, reviews);

  return (
    <div>
      <h1>Activity</h1>
      <p className="muted">Latest work logs and reviews across all tasks.</p>

      {items.length === 0 ? (
        <p className="muted">No activity yet.</p>
      ) : (
        <div style={{ marginTop: 16 }}>
          {items.map((item) => (
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
