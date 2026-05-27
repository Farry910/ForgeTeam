# task-002 — Scaffold Next.js + Prisma app skeleton

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
The workflow shell needs a minimal dashboard so AI developers, tasks, status,
and work logs are visible — the v0.1 success metric.

## User story
As the principal engineer, I want a local dashboard so that I can see agents,
tasks, and their status in one place.

## Acceptance criteria
- [x] Next.js + TypeScript app runs locally (`npm run dev`)
- [x] Prisma + SQLite with `Agent`, `Task`, `WorkLog`, `Review` models
- [x] Seed data for Alex (PM), Sam (Dev), Jordan (QA)
- [x] Agent list page
- [x] Task list page + create task form
- [x] Task detail page with work log timeline and status dropdown
- [x] README setup steps; no paid services

## Work log
- 2026-05-27 — Created in backlog; blocked on task-001 merge.
- 2026-05-27 — Branch `feature/app-skeleton`. Implemented App Router pages +
  server actions, Prisma schema (4 models) + initial migration + seed.
- 2026-05-27 — Verified: `typecheck` clean, `lint` clean, `build` passes,
  all routes return 200 with seeded data. Ready for review.
