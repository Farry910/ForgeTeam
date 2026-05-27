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
