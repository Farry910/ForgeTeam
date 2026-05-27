# ForgeTeam

A local-first **hybrid software workspace** where AI developers behave like
human teammates. ForgeTeam is the workflow shell that moves a task from
idea → requirement → code → test → PR → review → merge, with a human in the
loop and the only one who merges to `main`.

**v0.1** ships the foundation docs **and** a working local dashboard
(Next.js + Prisma + SQLite). See [Running the app](#running-the-app-locally) below.

## Repository structure

```
ForgeTeam/
├── docs/
│   ├── product-vision.md          # what we're building and why
│   ├── engineering-workflow.md    # lifecycle, status values, git workflow
│   ├── ai-dev-behavior-standard.md# how AI devs must behave
│   ├── agent-roles.md             # who's who
│   ├── mvp-roadmap.md             # 4-week plan + first 10 issues
│   └── prompt-library.md          # reusable Claude Code / GPT prompts
├── agents/
│   ├── pm-agent.md                # Alex — Product Manager
│   ├── dev-agent.md               # Sam Rivera — Backend Developer
│   ├── qa-agent.md                # Jordan — QA Engineer
│   └── principal-agent.md         # the human founder / principal engineer
├── tasks/
│   ├── task-001.md                # initialize docs + agent profiles
│   └── task-002.md                # scaffold the Next.js + Prisma app
├── .github/
│   ├── ISSUE_TEMPLATE/            # feature_request, bug_report
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci.yml           # type check · lint · build
├── app/                           # Next.js App Router (pages + server actions)
│   ├── page.tsx                   # dashboard
│   ├── agents/                    # agent list
│   ├── tasks/                     # task list · new · [id] detail
│   └── actions.ts                 # createTask · updateStatus · addWorkLog
├── lib/                           # prisma client + status constants
├── prisma/                        # schema · migrations · seed
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
cp .env .env.local   # optional; .env already has DATABASE_URL="file:./dev.db"
npx prisma migrate dev   # creates dev.db, applies migrations, runs the seed
npm run dev              # http://localhost:3000
```

The seed creates three agents — **Alex** (PM), **Sam Rivera** (Dev),
**Jordan** (QA) — and one sample task with a work log and a review.

Useful scripts: `npm run build`, `npm run typecheck`, `npm run lint`,
`npm run db:seed`, `npm run db:reset`.

### Features
- Dashboard with status counts and recent tasks
- Agent list
- Task list, create-task form, and task detail
- Work log timeline (add HUMAN / AI / SYSTEM entries)
- Status dropdown across the full lifecycle (logged automatically)
- GitHub Issue / PR links per task

Tracked in [task-002](tasks/task-002.md).

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

See [docs/mvp-roadmap.md](docs/mvp-roadmap.md). Week 1 is this foundation.
