# task-010 — Global activity feed

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
Work logs and reviews are only visible inside each task. There's no single
"what has the team been doing" view across all tasks.

## User story
As the principal engineer, I want one chronological activity feed so that I can
see the latest work logs and reviews across the whole board at a glance.

## Approach
New `/activity` page + nav link. Merge recent work logs and reviews into one
list. Keep the merge/sort pure in `lib/activity.ts` (`mergeActivity`) so it's
unit-tested like the task-009 helpers; the page stays a thin data + render shell.

## Acceptance criteria
- [x] `/activity` shows recent work logs + reviews, newest first, each linking to its task
- [x] "Activity" link in the nav
- [x] `mergeActivity` is pure and unit-tested (ordering, field mapping, limit)
- [x] Sensible empty state
- [x] typecheck, lint, build, and tests all pass

## Work log
- 2026-05-27 — Branch `feature/activity-feed` created. Implementing.
- 2026-05-27 — Added /activity + nav link + pure mergeActivity (5 new tests).
  Verified: 14/14 tests pass; typecheck/lint/build pass; /activity renders the
  6 seeded items (4 logs + 2 reviews) newest-first with task links.
