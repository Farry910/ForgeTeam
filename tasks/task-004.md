# task-004 — Status board view for tasks

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
The tasks page is a flat list. With a full lifecycle of statuses, the workflow
is hard to read at a glance — the v0.1 goal is a *believable, legible* workspace.

## User story
As the principal engineer, I want a board grouped by status so that I can see
the whole pipeline and where each task sits.

## Acceptance criteria
- [x] `/tasks` renders a board: one column per lifecycle status, in order
- [x] Each column shows its task count
- [x] Cards link to the task detail and show the assigned agent
- [x] "New task" entry point preserved; empty state preserved
- [x] typecheck, lint, build all pass

## Work log
- 2026-05-27 — Branch `feature/board-view` created. Implementing.
- 2026-05-27 — Board with 11 status columns + counts and task cards.
  Verified: typecheck/lint/build pass; /tasks returns 200 with 11 columns
  and the sample card under PR_OPENED. Ready for review.
