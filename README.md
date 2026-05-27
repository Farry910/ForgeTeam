# ForgeTeam

A local-first **hybrid software workspace** where AI developers behave like
human teammates. ForgeTeam is the workflow shell that moves a task from
idea → requirement → code → test → PR → review → merge, with a human in the
loop and the only one who merges to `main`.

**v0.1 is a working app** (Next.js · TypeScript · Prisma · SQLite): a dashboard,
a status board with filter/search, full task & agent CRUD, a QA review loop, a
global activity feed, unit tests in CI, and a free-host deploy path. The repo
itself doubles as the team's "operating system" — docs, agent profiles, and a
ticket per feature in [tasks/](tasks/).

## Repository structure

```
ForgeTeam/
├── docs/                           # the team's operating system
│   ├── product-vision.md           # what we're building and why
│   ├── engineering-workflow.md     # lifecycle, status values, git workflow
│   ├── ai-dev-behavior-standard.md # how AI devs must behave
│   ├── agent-roles.md              # who's who
│   ├── mvp-roadmap.md              # plan + what shipped
│   ├── prompt-library.md           # reusable Claude Code / GPT prompts
│   └── deploy.md                   # deploy guide
├── agents/                         # Alex (PM) · Sam Rivera (Dev) · Jordan (QA) · Principal (human)
├── tasks/                          # one ticket per feature (task-001 … task-013)
├── .github/
│   ├── ISSUE_TEMPLATE/             # feature_request, bug_report
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci.yml            # type check · lint · test · build
├── app/                            # Next.js App Router (server components + server actions)
│   ├── page.tsx                    # dashboard (status breakdown · workload · activity)
│   ├── activity/                   # global activity feed
│   ├── agents/                     # list · new · [id]/edit · AgentFields
│   ├── tasks/                      # board · new · [id] detail · [id]/edit
│   └── actions.ts                  # task + agent + review server actions
├── lib/                            # prisma client + pure helpers (status, tasks, activity) + *.test.ts
├── prisma/                         # schema · migrations · seed
├── render.yaml                     # Render Blueprint (deploy)
├── vitest.config.ts
└── README.md
```

## How it works

| Actor       | Job                                              |
| ----------- | ------------------------------------------------ |
| GPT         | architect · teacher · reviewer · prompt writing  |
| Claude Code | coding worker · edits · commands · tests · fixes |
| You         | founder · principal engineer · orchestrator      |

See [docs/engineering-workflow.md](docs/engineering-workflow.md) for the full
lifecycle and [docs/agent-roles.md](docs/agent-roles.md) for the personas.

## Running the app locally

Stack: **Next.js · TypeScript · Prisma · SQLite** — one repo, frontend + backend
together, zero paid services.

```bash
npm install
npx prisma migrate dev   # creates dev.db, applies migrations, runs the seed
npm run dev              # http://localhost:3000
```

The seed creates three agents — **Alex** (PM), **Sam Rivera** (Dev),
**Jordan** (QA) — and 10 tasks spread across the board, with work logs and reviews.

Scripts: `npm run dev`, `npm run build`, `npm test`, `npm run typecheck`,
`npm run lint`, `npm run db:seed`, `npm run db:reset`, `npm run start:prod`.

## Features

- **Dashboard** — per-status breakdown, per-agent workload, and a recent-activity feed
- **Board** — tasks grouped by lifecycle status, with assignee + title filter/search
- **Tasks** — create, edit, delete; status lifecycle (auto-logged); work-log
  timeline; GitHub issue/PR links
- **Agents** — full CRUD; deleting an agent unassigns their tasks
- **QA reviews** — record a verdict (APPROVED / CHANGES_REQUESTED) that updates the task status
- **Activity feed** — work logs + reviews across all tasks, newest first

See [tasks/](tasks/) for the per-feature tickets (each with plan, criteria, and a work log).

## Tests

```bash
npm test   # Vitest — pure unit tests for the status/filter/activity logic
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs type check · lint ·
test · build on every PR and push to `main`.

## Deploy

ForgeTeam runs from source on any Node host. Production start:

```bash
npm ci && npx prisma generate && npm run build
npm run start:prod   # prisma migrate deploy && next start (honours $PORT)
```

A Render Blueprint ([render.yaml](render.yaml)) is included. Full guide,
including the SQLite-persistence caveat on free tiers, is in
[docs/deploy.md](docs/deploy.md).

## Roadmap

See [docs/mvp-roadmap.md](docs/mvp-roadmap.md) — weeks 1–4 and the first 10
issues are shipped, plus filter/search, an activity feed, tests, and deploy prep.
