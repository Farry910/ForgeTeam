# ForgeTeam

A local-first **hybrid software workspace** where AI developers behave like
human teammates. ForgeTeam is the workflow shell that moves a task from
idea → requirement → code → test → PR → review → merge, with a human in the
loop and the only one who merges to `main`.

This is **v0.1 — the foundation**. Documentation and team roles come first;
the dashboard app comes next (see [task-002](tasks/task-002.md)).

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

## Planned stack (v0.1 app)

Next.js · TypeScript · Prisma · SQLite — one repo, frontend + backend together,
zero paid services. Tracked in [task-002](tasks/task-002.md).

## Roadmap

See [docs/mvp-roadmap.md](docs/mvp-roadmap.md). Week 1 is this foundation.
