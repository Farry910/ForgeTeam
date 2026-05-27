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

**No AI developer can merge directly to `main`.**
**All production-impacting changes require human approval.**

## Role mapping

| Stage          | Human company workflow      | ForgeTeam version            |
| -------------- | --------------------------- | ---------------------------- |
| Idea           | PM or founder explains need | Human writes request         |
| Requirement    | PM writes ticket            | AI PM writes GitHub Issue    |
| Design         | Engineer writes approach    | AI Dev writes technical plan |
| Task breakdown | Team splits work            | AI PM/Dev creates subtasks   |
| Implementation | Developer writes code       | Claude Code writes code      |
| Testing        | Dev/QA runs tests           | Claude Code + AI QA test     |
| Review         | Senior reviews PR           | Human + AI QA review         |
| Merge          | Maintainer merges           | Human merges                 |
| Deploy         | CI/CD deploys               | GitHub Actions deploys       |
| Monitor        | Logs/metrics                | Simple logs first            |

## Task status values

```
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
```

## Git workflow

Never work directly on `main`.

```bash
git checkout main
git pull
git checkout -b feature/task-dashboard

# after Claude Code edits files
git status
git diff
npm run build
git add .
git commit -m "Add task dashboard"
git push origin feature/task-dashboard
```

Then open a PR on GitHub. This mimics human developer behavior.
