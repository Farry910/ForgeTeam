We can start from zero infrastructure.

You already have enough to build the first version:

You + GPT + Claude Opus / Claude Code + GitHub Free + local computer

The first goal is not to build the full company platform. The first goal is to simulate one believable AI developer working like a human developer.

Claude Code is a good starting point because Anthropic describes it as an agentic coding tool that works in the terminal, understands a codebase, edits files, and can execute routine development tasks. Your existing plan also says each AI developer needs a “brain,” persistent work memory, identity/authorization, and sandboxed tool access, which maps well to a local Claude Code MVP.

1. Your first target

Build this:

Hybrid Workspace MVP v0.1

Human gives task
↓
AI Product Manager writes requirement
↓
AI Developer uses Claude Code locally
↓
AI Developer creates code
↓
AI Developer runs tests
↓
AI Developer opens GitHub PR
↓
AI QA reviews
↓
Human approves

At the beginning, the “AI PM,” “AI Dev,” and “AI QA” can all be simulated by prompts. Later you turn them into separate agents.

2. Zero-cost tool stack

Use this stack first:

Need	Free/Existing Tool
AI reasoning	GPT + Claude
AI coding	Claude Code
Code hosting	GitHub Free
Local sandbox	Your local machine
Project management	GitHub Issues
Documentation	Markdown files in repo
CI/CD	GitHub Actions free quota
Chat simulation	GitHub Issues comments / local markdown logs
Deployment	Localhost first, then free Render/Fly/Vercel later

GitHub Free supports unlimited public repositories and unlimited private repositories with a limited feature set, and GitHub Free organizations include GitHub Actions minutes. GitHub Actions can automate build/test workflows inside a repository.

So you do not need Slack, Jira, Kubernetes, vector DB, or paid cloud yet.

3. What you should build first

Build a small web app called:

hybrid-workspace-mvp

Its purpose is to manage AI developer work.

Initial features:

1. Create a task
2. Assign task to an AI developer profile
3. Track status: planned → coding → testing → PR opened → review → done
4. Store AI messages like a work chat
5. Store links to GitHub branch / PR
6. Show a simple dashboard

Do not build the advanced agent runtime first. Build the workflow shell first.

4. The software engineering workflow you need to learn

Every real software team roughly follows this lifecycle:

Idea
↓
Requirement
↓
Technical design
↓
Task breakdown
↓
Implementation
↓
Testing
↓
Code review
↓
Merge
↓
Deploy
↓
Monitor
↓
Improve

For your hybrid workspace, each step maps to an AI/human role:

Stage	Human company workflow	Hybrid workspace version
Idea	PM or founder explains need	Human writes request
Requirement	PM writes ticket	AI PM writes GitHub Issue
Design	Engineer writes approach	AI Dev writes technical plan
Task breakdown	Team splits work	AI PM/Dev creates subtasks
Implementation	Developer writes code	Claude Code writes code
Testing	Dev/QA runs tests	Claude Code + AI QA runs tests
Review	Senior reviews PR	Human + AI QA review
Merge	Maintainer merges	Human merges
Deploy	CI/CD deploys	GitHub Actions deploys
Monitor	Logs/metrics	Simple logs first

This is the full engineering workflow you need to model.

5. Your first repo structure

Create a GitHub repo:

hybrid-workspace-mvp/
├── docs/
│   ├── product-vision.md
│   ├── engineering-workflow.md
│   ├── agent-roles.md
│   ├── mvp-roadmap.md
│   └── prompt-library.md
│
├── agents/
│   ├── pm-agent.md
│   ├── dev-agent.md
│   ├── qa-agent.md
│   └── principal-agent.md
│
├── app/
│   └── ...
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature_request.md
│   │   └── bug_report.md
│   └── workflows/
│       └── ci.yml
│
├── tasks/
│   ├── task-001.md
│   └── task-002.md
│
└── README.md

This gives your “AI company” a memory and workflow from day one.

6. Start with documentation before code

Your first commit should not be app code. It should be the operating system of the team.

Create docs/product-vision.md:

# Hybrid Workspace MVP

## Goal

Build a local-first hybrid software workspace where AI developers behave like human teammates.

## MVP Scope

The first version supports:
- task creation
- AI developer profiles
- status tracking
- work logs
- GitHub PR links
- human approval

## Non-goals

The first version will not include:
- Slack integration
- Jira integration
- autonomous production deploy
- paid cloud infrastructure
- real multi-agent autonomy

Create docs/engineering-workflow.md:

# Engineering Workflow

Every task follows this lifecycle:

1. Requirement
2. Technical Plan
3. Implementation
4. Test
5. Pull Request
6. Review
7. Merge
8. Deploy

No AI developer can merge directly to main.
All production-impacting changes require human approval.

Create agents/dev-agent.md:

# Sam Rivera — AI Backend Developer

## Role

Senior backend developer.

## Responsibilities

- Read tasks
- Understand existing code
- Create implementation plan
- Write code
- Run tests
- Open pull requests
- Respond to review feedback

## Rules

- Never push directly to main
- Always create a branch
- Always explain the technical approach before coding
- Always run tests before claiming completion
- If blocked, ask for clarification

This is how you make the AI dev feel like a real teammate.

7. MVP app choice

Since you want zero cost and fast building, choose one of these:

Option A — easiest
Next.js + SQLite

Good if you want a web dashboard.

Option B — simpler backend learning
Node.js + Express + SQLite

Good if you want to understand backend clearly.

Option C — best for serious future platform
FastAPI + SQLite/PostgreSQL

Good if you want future AI orchestration.

My recommendation for you:

Next.js + SQLite + Prisma

Why?

- one repo
- frontend + backend together
- easy dashboard
- easy GitHub deployment later
- Claude Code handles it well
8. The first database model

You only need a few tables.

Agent
- id
- name
- role
- specialty
- communicationStyle
- permissions
- createdAt

Task
- id
- title
- description
- status
- assignedAgentId
- githubIssueUrl
- githubPrUrl
- createdAt
- updatedAt

WorkLog
- id
- taskId
- authorType
- authorName
- message
- createdAt

Review
- id
- taskId
- reviewerName
- verdict
- comments
- createdAt

Status values:

BACKLOG
PLANNING
READY_FOR_DEV
CODING
TESTING
PR_OPENED
IN_REVIEW
CHANGES_REQUESTED
APPROVED
MERGED
DEPLOYED

This simple model already represents a software engineering workflow.

9. First Claude Code workflow

After creating the repo and docs, open Claude Code in the repo.

Use prompts like this.

Prompt 1 — ask Claude to inspect repo
You are Sam Rivera, a senior AI backend developer working inside our hybrid workspace MVP.

First, inspect this repository.

Do not write code yet.

Return:
1. Current repo summary
2. Missing files
3. Recommended first implementation plan
4. Risks
5. Exact next steps
Prompt 2 — ask Claude to create the app
Implement the first version of the hybrid workspace MVP.

Use Next.js, TypeScript, Prisma, and SQLite.

Features:
1. Agent list page
2. Task list page
3. Create task form
4. Task detail page
5. Work log timeline
6. Status update dropdown

Rules:
- Keep UI simple
- Use local SQLite
- Add seed data for AI PM, AI Dev, AI QA
- Add README setup steps
- Do not add paid services
Prompt 3 — require tests/checks
Before claiming completion:

1. Run type check
2. Run lint if available
3. Run build
4. Fix all errors
5. Summarize changed files
6. Explain how to run locally

That is your first “AI developer works like human dev” loop.

10. The zero-cost development loop

Use this every day:

1. You create GitHub Issue
2. GPT helps refine requirement
3. Claude Code implements locally
4. Claude Code runs tests/build
5. You review git diff
6. You commit
7. You push branch
8. You open PR
9. GPT/Claude reviews PR text
10. You merge

At first, you are the orchestrator. Later, you automate the orchestrator.

11. Git workflow you should use

Never work directly on main.

Use this:

git checkout main
git pull
git checkout -b feature/task-dashboard

After Claude Code edits files:

git status
git diff
npm run build
git add .
git commit -m "Add task dashboard"
git push origin feature/task-dashboard

Then open a PR on GitHub.

This mimics human developer behavior.

12. Your first GitHub Actions CI

Create .github/workflows/ci.yml:

name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma client
        run: npx prisma generate

      - name: Type check
        run: npm run typecheck --if-present

      - name: Lint
        run: npm run lint --if-present

      - name: Build
        run: npm run build

This gives your AI developer a real “CI failed / CI passed” environment.

13. The first human-like AI dev behavior standard

Create this file:

docs/ai-dev-behavior-standard.md

Content:

# AI Developer Behavior Standard

AI developers must behave like professional human software engineers.

## Before coding

They must explain:
- what they understood
- what files/modules they will inspect
- implementation plan
- risks
- test plan

## While coding

They must:
- work on a branch
- make small commits
- avoid unrelated changes
- preserve existing style

## Before completion

They must:
- run tests
- run build
- summarize changed files
- mention known limitations

## Communication style

They should be:
- practical
- concise
- transparent
- honest when blocked

This file is very important. It becomes your “company culture” for AI devs.

14. Your first AI personas

Use only three first.

Alex — PM Agent
Role:
Turns vague human requests into clear engineering tickets.

Output:
- problem
- user story
- acceptance criteria
- edge cases
- priority
Sam — Dev Agent
Role:
Implements tickets.

Output:
- technical plan
- code changes
- tests
- PR summary
Jordan — QA Agent
Role:
Reviews implementation.

Output:
- bug risks
- missing tests
- security concerns
- approval or changes requested

You can simulate these manually with GPT/Claude before automating.

15. Important: do not build multi-agent automation yet

At zero stage, avoid this:

Slack bot
Jira integration
OAuth system
Kubernetes
Firecracker
Vector database
Autonomous deploy
Multi-agent framework
Enterprise RBAC

Those are later.

For now, your product is:

A local-first AI software team simulator

But build it in a way that can later become real.

16. MVP roadmap
Week 1 — Foundation

Goal:

Create repo, docs, agent profiles, workflow, simple app skeleton.

Deliverables:

- GitHub repo
- README
- docs/product-vision.md
- docs/engineering-workflow.md
- agents/pm-agent.md
- agents/dev-agent.md
- agents/qa-agent.md
- Next.js app running locally
Week 2 — Task system

Goal:

Track software tasks like a real engineering team.

Deliverables:

- create task
- assign agent
- update status
- add work logs
- task detail page
Week 3 — GitHub workflow

Goal:

Connect the workspace concept to real GitHub behavior.

Deliverables:

- GitHub Issue template
- PR template
- CI workflow
- manual PR links in task detail
Week 4 — AI developer simulation

Goal:

Make one Claude Code AI dev follow the workflow reliably.

Deliverables:

- prompt library
- AI dev behavior standard
- sample task completed by Claude Code
- PR summary generated by AI
- QA review generated by AI

At the end of month one, you should have a working prototype.

17. Your first 10 GitHub Issues

Create these issues:

#1 Create product vision document
#2 Create AI developer behavior standard
#3 Create initial Next.js app
#4 Add Prisma and SQLite
#5 Add Agent model
#6 Add Task model
#7 Add task list page
#8 Add create task form
#9 Add task detail page with work logs
#10 Add GitHub Actions CI

This teaches you real software workflow while building your product.

18. How GPT and Claude should work together

Use GPT for:

- product strategy
- architecture explanation
- workflow design
- prompt writing
- reviewing Claude’s plan
- helping you understand errors

Use Claude Code for:

- editing files
- creating app structure
- running commands
- fixing build errors
- refactoring code
- writing tests

Simple rule:

GPT = architect / teacher / reviewer
Claude Code = coding worker
You = founder / principal engineer

That is already a hybrid workspace.

19. Your first Claude Code command sequence

In terminal:

mkdir hybrid-workspace-mvp
cd hybrid-workspace-mvp
git init

Create initial docs manually or ask Claude Code to create them.

Then:

claude

Inside Claude Code, start with:

We are building a zero-cost MVP for a hybrid human-AI software workspace.

You are Sam Rivera, the first AI developer.

Before writing code, create the initial repo structure:
- docs/product-vision.md
- docs/engineering-workflow.md
- docs/ai-dev-behavior-standard.md
- agents/pm-agent.md
- agents/dev-agent.md
- agents/qa-agent.md
- README.md

Keep everything practical and implementation-focused.

Then commit:

git add .
git commit -m "Initialize hybrid workspace docs and agent profiles"

Then ask Claude Code:

Now create a Next.js TypeScript app in this repo for the MVP dashboard.

Use SQLite and Prisma.

The app should support:
- viewing agents
- viewing tasks
- creating tasks
- updating task status
- viewing work logs

Keep the implementation simple and local-only.
20. The correct mindset

Do not try to build “Devin competitor” immediately.

Build this first:

A visible workflow where one AI developer behaves professionally from task → code → test → PR.

Your success metric for v0.1:

Can a stranger look at your GitHub repo and believe:
"This is the beginning of an AI software team workspace"?

That is enough for the first version.

21. Your immediate next step

Do this now:

1. Create GitHub repo: hybrid-workspace-mvp
2. Add README
3. Add docs/product-vision.md
4. Add agents/dev-agent.md
5. Run Claude Code in the repo
6. Ask it to create the initial documentation and Next.js skeleton

Your first product should be very simple:

A dashboard that shows AI developers, tasks, status, and work logs.

Then we gradually add real GitHub PR automation, Slack-like chat, memory, and multi-agent review.