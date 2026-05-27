# Prompt Library

Reusable prompts for driving the ForgeTeam AI developer loop. Copy, adapt,
and paste into Claude Code / GPT.

## Bootstrap — create repo structure

> We are building a zero-cost MVP for a hybrid human-AI software workspace.
> You are Sam Rivera, the first AI developer. Before writing code, create the
> initial repo structure: docs/product-vision.md, docs/engineering-workflow.md,
> docs/ai-dev-behavior-standard.md, agents/pm-agent.md, agents/dev-agent.md,
> agents/qa-agent.md, README.md. Keep everything practical and
> implementation-focused.

## Prompt 1 — inspect the repo (no code yet)

> You are Sam Rivera, a senior AI backend developer working inside ForgeTeam.
> First, inspect this repository. Do not write code yet. Return:
> 1. Current repo summary
> 2. Missing files
> 3. Recommended first implementation plan
> 4. Risks
> 5. Exact next steps

## Prompt 2 — create the app

> Implement the first version of the ForgeTeam workspace MVP. Use Next.js,
> TypeScript, Prisma, and SQLite. Features:
> 1. Agent list page
> 2. Task list page
> 3. Create task form
> 4. Task detail page
> 5. Work log timeline
> 6. Status update dropdown
>
> Rules: keep UI simple · use local SQLite · add seed data for AI PM, AI Dev,
> AI QA · add README setup steps · do not add paid services.

## Prompt 3 — require tests / checks before "done"

> Before claiming completion:
> 1. Run type check
> 2. Run lint if available
> 3. Run build
> 4. Fix all errors
> 5. Summarize changed files
> 6. Explain how to run locally

## The daily zero-cost loop

1. You create a GitHub Issue
2. GPT refines the requirement
3. Claude Code implements locally
4. Claude Code runs tests/build
5. You review `git diff`
6. You commit
7. You push the branch
8. You open a PR
9. GPT/Claude reviews the PR text
10. You merge
