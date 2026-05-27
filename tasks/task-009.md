# task-009 — Real tests + CI teeth

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
Every task so far was "verified" with typecheck + lint + build + a manual smoke
test. There is no automated test suite, so the behavior standard's "run tests"
step and the CI's "tests passed" signal aren't literally true.

## User story
As the principal engineer, I want a real (if small) test suite running in CI so
that the AI-dev loop's verification is genuine.

## Approach
Add Vitest with fast, dependency-free unit tests for the core pure logic, and
wire a `test` step into CI. To give the filter logic something to test, extract
the board's where-clause builder into a pure `taskFilterWhere` in `lib/tasks.ts`.

## Acceptance criteria
- [x] Vitest installed; `npm test` runs the suite once (CI mode)
- [x] `taskFilterWhere` extracted to `lib/tasks.ts`; board uses it (no behavior change)
- [x] Unit tests for `lib/status.ts` (isStatus/isVerdict) and `lib/tasks.ts`
- [x] `test` step added to `.github/workflows/ci.yml`
- [x] typecheck, lint, build, and tests all pass

## Work log
- 2026-05-27 — Branch `feature/tests-ci` created. Implementing.
- 2026-05-27 — Added Vitest + 9 unit tests (status/verdict guards, filter
  builder); extracted taskFilterWhere; wired Test step into CI. Verified: 9/9
  tests pass, typecheck/lint/build pass, board filter unchanged (10/2/0).
  Note: dev-only npm advisories rose 2→7 (vitest's transitive deps).
