# task-006 — Edit and delete tasks

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
A task can be created and have its status changed, but its title, description,
and assignee can't be edited, and it can't be deleted. That's the obvious CRUD gap.

## User story
As the principal engineer, I want to edit a task's details or delete it so that
the board stays accurate.

## Acceptance criteria
- [x] Edit page at `/tasks/[id]/edit` (title, description, assignee, issue URL)
- [x] "Edit" link from the task detail page
- [x] Delete removes the task and cascades work logs + reviews
- [x] Delete redirects to the board; edit redirects back to detail
- [x] typecheck, lint, build all pass

## Work log
- 2026-05-27 — Branch `feature/task-edit-delete` created. Implementing.
- 2026-05-27 — Added updateTask/deleteTask actions + edit page + Edit link.
  Verified: typecheck/lint/build pass; edit page renders prefilled; update
  persists; delete cascades logs+reviews (0 orphans) and drops count 10→9.
