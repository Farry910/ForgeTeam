// Build the Prisma `where` for the board's filter bar (assignee + title search).
// Kept pure (no Prisma import) so it is trivially unit-testable.
export type TaskFilter = {
  assignedAgentId?: string | null;
  title?: { contains: string };
};

export function taskFilterWhere(assignee?: string, q?: string): TaskFilter {
  const where: TaskFilter = {};

  if (assignee === "unassigned") {
    where.assignedAgentId = null;
  } else if (assignee) {
    where.assignedAgentId = assignee;
  }

  if (q) {
    where.title = { contains: q };
  }

  return where;
}
