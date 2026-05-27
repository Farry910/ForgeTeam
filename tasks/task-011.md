# task-011 — Dashboard polish

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
The dashboard shows four stat cards and a recent-tasks table. It doesn't convey
the shape of the work — how it's distributed across statuses or agents — and
duplicates the board's task list.

## User story
As the principal engineer, I want the landing page to summarise the team's work
(by status, by agent, and what just happened) so that I get the picture at a glance.

## Approach
Replace the recent-tasks table with: a per-status breakdown, a per-agent workload
table (+ unassigned), and a recent-activity snippet reusing the pure
`mergeActivity` from task-010. Extract a pure `orderStatusCounts` into
`lib/status.ts` and unit-test it (consistent with task-009/010).

## Acceptance criteria
- [x] Per-status breakdown (lifecycle order, non-zero statuses)
- [x] Per-agent workload table with task counts + an "Unassigned" row
- [x] Recent-activity snippet (top 5) with a link to /activity
- [x] `orderStatusCounts` pure + unit-tested
- [x] typecheck, lint, build, and tests all pass

## Work log
- 2026-05-27 — Branch `feature/dashboard-polish` created. Implementing.
- 2026-05-27 — Rewrote dashboard (status chips, workload table, recent-activity
  snippet reusing mergeActivity); added orderStatusCounts (+2 tests, 16 total).
  Verified: 16/16 tests, typecheck/lint/build pass; dashboard renders 9 status
  chips, full workload table, 5 activity items, correct stats (3/10/1/2).
