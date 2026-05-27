# task-003 — QA review form on task detail

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
The `Review` model exists and reviews display on the task detail page, but
there is no way to *record* one in the UI. QA (Jordan) cannot close the loop.

## User story
As the QA agent, I want to submit a review verdict with comments so that the
task's status reflects APPROVED or CHANGES_REQUESTED.

## Acceptance criteria
- [x] Review form on the task detail page (reviewer, verdict, comments)
- [x] Verdict limited to `APPROVED` / `CHANGES_REQUESTED`
- [x] Submitting a review records it and adds a work-log entry
- [x] Verdict updates task status (APPROVED → APPROVED, CHANGES_REQUESTED → CHANGES_REQUESTED)
- [x] typecheck, lint, build all pass

## Work log
- 2026-05-27 — Branch `feature/qa-review-form` created. Implementing.
- 2026-05-27 — Added `addReview` action + verdict constants + detail-page form.
  Verified: typecheck/lint/build pass; form renders; action updates status
  (PR_OPENED → CHANGES_REQUESTED), creates review, and logs it. Ready for review.
