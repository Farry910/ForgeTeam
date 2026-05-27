# task-013 — Docs refresh / v0.1 wrap-up

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
After 12 shipped tasks the README and roadmap describe the early v0.1: the
structure tree, feature list, and seed description are stale, and the roadmap
doesn't show what actually shipped. The repo should read as a coherent v0.1.

## User story
As a newcomer reading the repo, I want the README and roadmap to match what's
actually built so that ForgeTeam reads as a real, finished v0.1 workspace.

## Approach
Docs-only change. Refresh the README (intro, structure tree, features, scripts,
a Tests note) and add a "shipped" status section to the roadmap. No app code
changes, so behaviour is unaffected; still run the full gate to be safe.

## Acceptance criteria
- [x] README structure tree matches the real tree (activity, edit pages, lib, tests, render.yaml, etc.)
- [x] README feature list reflects board+filter, CRUD, reviews, activity, tests, deploy
- [x] Seed description corrected (10 tasks across the board)
- [x] Roadmap shows shipped status (weeks 1–4 + the first-10 issues)
- [x] typecheck, lint, build, tests still pass

## Work log
- 2026-05-27 — Branch `feature/docs-refresh` created. Implementing.
- 2026-05-27 — Rewrote README (intro, structure tree, features, scripts, Tests
  section) and added a shipped-status section + checked off the first-10 issues
  in the roadmap. Verified: 16/16 tests + typecheck/lint/build pass; all
  README link targets exist. Docs-only — no behaviour change.
