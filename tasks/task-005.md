# task-005 — Seed the 10 starter issues across the board

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
The board (task-004) only has one seeded task, so it doesn't look like a real
team's workspace. Seed the roadmap's first 10 work items spread across statuses.

## User story
As a visitor, I want the board to show realistic in-flight work so that
ForgeTeam reads as a believable AI software team workspace (the v0.1 metric).

## Acceptance criteria
- [x] Seed the 10 starter issues from docs/mvp-roadmap.md
- [x] Statuses spread across the lifecycle (not all in one column)
- [x] Tasks assigned to Alex / Sam / Jordan
- [x] A few tasks carry work logs; at least two carry reviews
- [x] Seed stays idempotent (`npm run db:seed` re-runnable)
- [x] typecheck, lint, build all pass

## Work log
- 2026-05-27 — Branch `feature/seed-starter-issues` created. Implementing.
- 2026-05-27 — Seed now creates 10 tasks across 9 status columns, 4 work logs,
  2 reviews. Verified: typecheck/lint/build pass; board shows 10 cards; dashboard
  reads 3 agents / 10 tasks. (Fixed an implicit-any on the tasks array.)
