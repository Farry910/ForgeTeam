# task-012 — Deploy prep (free host)

- **Status:** PR_OPENED
- **Assigned:** Sam Rivera (dev-agent)
- **Reviewer:** Jordan (qa-agent)
- **GitHub Issue:** <!-- link -->
- **GitHub PR:** <!-- link -->

## Problem
ForgeTeam runs locally but has never been deployed. The roadmap's next step is
"localhost first, then free host." We need a verifiable production start path and
clear deploy docs — without shipping config we can't test.

## User story
As the principal engineer, I want a one-command production start and a deploy
guide so that I can put ForgeTeam on a free host.

## Approach
- Add `start:prod` = `prisma migrate deploy && next start` so a fresh host
  creates its schema on boot. (`next start` already honours `PORT`.)
- Add a Render Blueprint (`render.yaml`) — runs from source, no Docker needed.
- Document hosts, env vars, first-run seeding, and the SQLite-persistence caveat
  in `docs/deploy.md` + a short README section.
- Deliberately NO Dockerfile / `output: standalone` — can't build-test those
  here, and Prisma + standalone has footguns. Keep it to what we can verify.

## Acceptance criteria
- [x] `start:prod` script added; `next start` honours `PORT`
- [x] `render.yaml` Blueprint (build + migrate-on-start, free plan, DATABASE_URL)
- [x] `docs/deploy.md` + README Deploy section (env, seeding, SQLite caveat)
- [x] `prisma migrate deploy` succeeds locally; prod start serves on a custom PORT
- [x] typecheck, lint, build, tests still pass

## Work log
- 2026-05-27 — Branch `feature/deploy-prep` created. Implementing.
- 2026-05-27 — Added start:prod + render.yaml + docs/deploy.md + README section.
  Verified locally: 16/16 tests, typecheck/lint/build pass; `prisma migrate
  deploy` succeeds; `PORT=3010 npm run start:prod` migrated-on-boot and served
  / and /tasks (200) on 3010. NOT verified: an actual cloud deploy (can't from
  here) — that's the human's step.
