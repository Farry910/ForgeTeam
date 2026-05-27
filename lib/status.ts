// Task lifecycle statuses — see docs/engineering-workflow.md
export const STATUSES = [
  "BACKLOG",
  "PLANNING",
  "READY_FOR_DEV",
  "CODING",
  "TESTING",
  "PR_OPENED",
  "IN_REVIEW",
  "CHANGES_REQUESTED",
  "APPROVED",
  "MERGED",
  "DEPLOYED",
] as const;

export type Status = (typeof STATUSES)[number];

export function isStatus(value: string): value is Status {
  return (STATUSES as readonly string[]).includes(value);
}

// Pair each lifecycle status with its count (0 when absent), in lifecycle order.
export function orderStatusCounts(
  counts: Record<string, number>,
): { status: Status; count: number }[] {
  return STATUSES.map((status) => ({ status, count: counts[status] ?? 0 }));
}

// Review verdicts — see agents/qa-agent.md
export const VERDICTS = ["APPROVED", "CHANGES_REQUESTED"] as const;

export type Verdict = (typeof VERDICTS)[number];

export function isVerdict(value: string): value is Verdict {
  return (VERDICTS as readonly string[]).includes(value);
}
