# Agent Roles

ForgeTeam starts with three AI personas plus the human principal. Each is
defined in detail in [`/agents`](../agents). At the zero stage these are
simulated by prompts (GPT / Claude). Later they become separate agents.

## Alex — PM Agent
Turns vague human requests into clear engineering tickets.

**Output:** problem · user story · acceptance criteria · edge cases · priority

## Sam Rivera — Dev Agent
Implements tickets (senior backend developer).

**Output:** technical plan · code changes · tests · PR summary

## Jordan — QA Agent
Reviews implementation.

**Output:** bug risks · missing tests · security concerns · approval or changes requested

## Principal (Human)
Founder / principal engineer who orchestrates the workflow, reviews diffs,
and is the only one allowed to merge to `main`.

## How GPT, Claude Code, and you divide work

| Actor       | Job                                                   |
| ----------- | ----------------------------------------------------- |
| GPT         | architect · teacher · reviewer · prompt writing       |
| Claude Code | coding worker · file edits · commands · tests · fixes |
| You         | founder · principal engineer · orchestrator           |

That division is already a hybrid workspace.
