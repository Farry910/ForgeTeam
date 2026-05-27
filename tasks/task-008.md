# task-008 — Filter & search on the board

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

> This ticket is also a deliberate end-to-end run of the AI-dev loop, executed as
> Sam Rivera per docs/ai-dev-behavior-standard.md.

## Problem
With 10+ tasks the board is hard to scan. There's no way to focus on one
assignee or find a task by title.

## User story
As the principal engineer, I want to filter the board by assignee and search by
title so that I can focus on the work I care about.

## Plan (Sam Rivera — before coding)

**What I understood:** add filtering to the existing board at `/tasks` without
changing the column model or the task detail flow.

**Files I'll inspect / touch:**
- `app/tasks/page.tsx` — the board (only file that needs logic changes)
- reuse existing `.board*` / `.row` styles in `app/globals.css` (no new model)

**Approach:** make the board read URL `searchParams` (`assignee`, `q`) — a
GET `<form>`, so filters are shareable/bookmarkable and need no server action.
Filter in the Prisma query: `assignedAgentId` for assignee (`unassigned` → null)
and `title contains q`. Keep all status columns visible; counts reflect the
filtered set. Show "showing N of M" and a Clear link.

**Risks:**
- Next 15 `searchParams` is a Promise — must `await` it (typecheck will catch).
- SQLite `contains` case sensitivity — acceptable for an MVP title search.
- Empty result state must not look broken — add a clear message + reset link.

**Test plan:** typecheck + lint + build; runtime smoke test hitting
`/tasks`, `/tasks?assignee=<id>`, `/tasks?q=<term>`, and an empty match, asserting
the visible card count matches expectations.

## Acceptance criteria
- [x] Filter bar on `/tasks`: assignee dropdown + title search (GET form)
- [x] Filtering is URL-driven (`?assignee=`, `?q=`) and shareable
- [x] "Unassigned" filter supported; columns still all render
- [x] "Showing N of M" count + Clear link; sensible empty state
- [x] typecheck, lint, build all pass

## PR summary (Sam Rivera — before completion)
**Changed files:** `app/tasks/page.tsx` (only). No schema/model/style changes.

**What changed:** the board reads `searchParams` (`assignee`, `q`) and filters the
Prisma query; added a GET filter bar (title search + assignee dropdown incl.
"Unassigned"), a "Showing N of M" line, a Clear link, and a "No tasks match"
empty state. All status columns still render; counts reflect the filter.

**How to verify:** `/tasks` (10), `/tasks?assignee=<sam>` (8), `/tasks?q=model` (2),
`/tasks?assignee=unassigned` (0), `/tasks?q=zzznomatch` (0 + "No tasks match").

**Checks:** typecheck ✅, lint ✅, build ✅, runtime smoke ✅ (counts above).

**Known limitations:** title search is case-sensitive (SQLite `contains`); no
status filter yet (columns already group by status); no pagination.

## Work log
- 2026-05-27 — Branch `feature/board-filter-search` created; plan written above.
- 2026-05-27 — Implemented filter+search; verified all five scenarios. The
  "Showing N of M" text renders (earlier empty grep was React comment-node text
  separators, confirmed via a looser match). Ready for review.
