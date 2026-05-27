// Merge work logs and reviews into one chronological activity feed.
// Pure (plain inputs, no Prisma import) so it's trivially unit-testable.
export type ActivityItem = {
  id: string;
  kind: "log" | "review";
  createdAt: Date;
  taskId: string;
  taskTitle: string;
  author: string;
  badge: string;
  text: string;
};

type LogInput = {
  id: string;
  createdAt: Date;
  taskId: string;
  authorName: string;
  authorType: string;
  message: string;
  task: { title: string };
};

type ReviewInput = {
  id: string;
  createdAt: Date;
  taskId: string;
  reviewerName: string;
  verdict: string;
  comments: string | null;
  task: { title: string };
};

export function mergeActivity(
  logs: LogInput[],
  reviews: ReviewInput[],
  limit = 30,
): ActivityItem[] {
  const items: ActivityItem[] = [
    ...logs.map((l) => ({
      id: l.id,
      kind: "log" as const,
      createdAt: l.createdAt,
      taskId: l.taskId,
      taskTitle: l.task.title,
      author: l.authorName,
      badge: l.authorType,
      text: l.message,
    })),
    ...reviews.map((r) => ({
      id: r.id,
      kind: "review" as const,
      createdAt: r.createdAt,
      taskId: r.taskId,
      taskTitle: r.task.title,
      author: r.reviewerName,
      badge: r.verdict,
      text: r.comments ?? "(no comments)",
    })),
  ];

  items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return items.slice(0, limit);
}
