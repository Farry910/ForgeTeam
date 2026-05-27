# task-007 — Agent CRUD

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
Agents only come from the seed — the team roster can't be changed from the UI.
Tasks already have full CRUD; agents should too.

## User story
As the principal engineer, I want to add, edit, and remove AI agent profiles so
that the roster reflects the team I actually have.

## Acceptance criteria
- [x] Create agent at `/agents/new` (name, role, specialty, style, permissions)
- [x] Edit agent at `/agents/[id]/edit`, with delete
- [x] "New agent" and per-agent "Edit" entry points on `/agents`
- [x] Deleting an agent unassigns their tasks (FK SET NULL), no orphans
- [x] typecheck, lint, build all pass

## Work log
- 2026-05-27 — Branch `feature/agent-crud` created. Implementing.
- 2026-05-27 — Added create/update/delete actions + shared AgentFields, new/edit
  pages, list entry points. Verified: typecheck/lint/build pass; pages render;
  deleting Sam (8 tasks) left 0 dangling refs, all 10 tasks intact (SET NULL).
